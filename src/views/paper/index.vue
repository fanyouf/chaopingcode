<template>
  <section class="section">
    <my-page
      :list="paperList"
      title="添加试卷"
      :op-names="['del', 'edit']"
      @add-container="hAddWork"
      @del-item="hDel"
      @edit-item="hViewDetail"
    >
      <template #header>
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
      </template>
    </my-page>
  </section>
</template>
<script setup lang="ts">
  import { getList, doDelete } from '@/api/paper'
  import { gp } from '@gp'

  const formData = reactive({
    subject: { id: null, title: '' },
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })

  onMounted(() => {
    search()
  })

  const search = async () => {
    // 查询条件
    const d = {}
    const { data } = await getList(d)
    paperList.value = data.list
  }

  const paperList = ref([])

  const hDel = async ({ id }) => {
    await doDelete(id)
    gp.$baseMessage('删除成功', 'success')
    search()
  }

  const hViewDetail = ({ id }) => {
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
