<template>
  <section class="section">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="page-header" shadow="never">
          <my-radio-subject v-model="formData.subject" />

          <my-radio-competition v-model="formData.subject" />

          <div class="m1">
            <label class="mr5">难度:</label>
            <el-select v-model="formData.level" style="width: 100px">
              <el-option label="全部" :value="null">全部</el-option>
              <el-option label="简单" value="easy">简单</el-option>
              <el-option label="中等" value="medium">中等</el-option>
              <el-option label="困难" value="hard">困难</el-option>
              <el-option label="挑战" value="challenge">挑战</el-option>
            </el-select>
            &nbsp;&nbsp;

            <label class="mr5">类型:</label>
            <my-select-papertype />
            &nbsp;&nbsp;
            <label class="mr5" for="">关键字:</label>
            <el-input v-model="formData.keyword" style="width: 200px" />
            &nbsp;&nbsp;
            <el-button type="success" @click="search">查询</el-button>
          </div>
        </vab-card>
      </el-col>
      <el-col
        v-for="item in paperList"
        :key="item.id"
        :lg="6"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <vab-card
          class="section-item"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="section-item-body">
            <img
              style="width: 100%; height: 186px"
              :src="item.cover || defaultImage"
            />
            <h3>{{ item.title }}</h3>

            <p class="section-item-body-intro">{{ item.intro }}</p>
            <p>
              <el-button type="danger" @click="hDel(item.id)">删除</el-button>
              <el-button type="primary" @click="hViewDetail(item.id)">
                详情
              </el-button>
            </p>
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </section>
</template>
<script setup lang="ts">
  import { Delete } from '@element-plus/icons-vue'
  import paperCart from './components/paper-cart.vue'
  import { getSelectOptionCode } from '@/utils'
  import { CONST_EX_TYPE, CONST_LEVEL } from '~/src/constant'
  import { getList, doDelete } from '@/api/paper'
  import { gp } from '@gp'
  import MyRadio from '~/src/components/my-radio.vue'
  import MyKnowledges from '~/src/components/my-knowledges.vue'

  const formData = reactive({
    subject: { id: null, title: '' },
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })
  const defaultImage =
    'http://8.142.32.7:8888/assets/d1/57/d1576663f29233e326553db584e5520c.jpg'

  onMounted(() => {
    search()
  })

  const search = async () => {
    // 查询条件
    const d = {}
    const { data } = await getList(d)
    paperList.value = data.list
  }
  // const hDel = (id) => {
  //   gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
  //     await delWork(id)
  //     gp.$baseMessage('删除成功')
  //     search()
  //   })
  // }
  const paperList = ref([])

  const hDel = (id) => {
    gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
      // emit('del-container', item)
      await doDelete(id)
      gp.$baseMessage('删除成功', 'success')
      search()
    })
  }

  const hViewDetail = (id) => {
    window.open(`/#/paper/detail?id=${id}`)
  }
</script>
<style lang="scss" scoped>
  .section {
    background-color: #f6f8f9;
  }
  .section-item {
    padding: 1em;
    border: none !important;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .paper-image {
    width: 100%;
  }
</style>
