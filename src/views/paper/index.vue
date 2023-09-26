<template>
  <my-page
    :list="paperList"
    title="添加试卷"
    :op-names="['del', 'update', 'view']"
    @view-container="hViewCompetition"
    @del-container="hDelCompetition"
    @add-container="hAddCompetition"
  >
    <template #header>
      <my-radio-subject v-model="formData.subject" />

      <my-radio-competition v-model="formData.subject" />

      <div class="m1">
        <label>难度</label>
        <el-select v-model="formData.level" style="width: 100px">
          <el-option label="全部" :value="null">全部</el-option>
          <el-option label="简单" value="easy">简单</el-option>
          <el-option label="中等" value="medium">中等</el-option>
          <el-option label="困难" value="hard">困难</el-option>
          <el-option label="挑战" value="challenge">挑战</el-option>
        </el-select>
        &nbsp;&nbsp;

        <label>类型</label>
        <el-select v-model="formData.level" style="width: 100px">
          <el-option label="全部" :value="null">全部</el-option>
          <el-option label="简单" value="easy">简单</el-option>
          <el-option label="中等" value="medium">中等</el-option>
          <el-option label="困难" value="hard">困难</el-option>
          <el-option label="挑战" value="challenge">挑战</el-option>
        </el-select>
        &nbsp;&nbsp;

        <label for="">关键字:</label>
        <el-input v-model="formData.keyword" style="width: 200px" />
        &nbsp;&nbsp;
        <el-button type="success" @click="search">查询</el-button>
      </div>
    </template>

    <template #default="{ item }">
      <div class="paper p1">
        <img :src="item.cover || defaultImage" class="paper-image" />
        <h3 class="paper-title">{{ item.title }}</h3>
        <p class="paper-info">{{ item.intro }}</p>
        <div class="course-ops">
          <el-button size="small" type="primary" @click="hEdit(item)">
            编辑
          </el-button>
          <el-button size="small" type="primary" @click="hDetail(item)">
            查看详情
          </el-button>
          <el-button size="small" type="primary" @click="hDel(item)">
            删除
          </el-button>
        </div>
      </div>
    </template>
  </my-page>
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
