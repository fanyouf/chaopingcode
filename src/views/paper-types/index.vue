<template>
  <div>
    <h3>试卷类型</h3>
    <el-button type="primary" @click="add">添加</el-button>
    <el-table>
      <el-table-column prop="name" label="类型名称" />
      <el-table-column prop="intro" label="类型简介" />
      <el-table-column prop="order" label="显示顺序" />
      <el-table-column prop="remark" label="备注" />
    </el-table>
    <PaperTypeDialog ref="refDialog" />
  </div>
</template>

<script setup lang="ts">
  import PaperTypeDialog from './paper-type-dialog'

  const refDialog = ref(null)
  const add = () => {
    refDialog.value.showDialog()
  }

  const state = reactive({
    list: [],
    listLoading: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })

  const fetchData = async () => {
    state.listLoading = true
    const res = await getList({
      subjectID: curSubject.value.id,
      withDirective: true,
    })
    state.list = res.data.list
    state.listLoading = false
  }
</script>
<style lang="scss">
  .section {
    background: $base-color-background !important;
    padding: 0;
  }
  .knowledges {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .directive-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .directive-group-item {
    margin: 5px !important;
  }
  .directive-group.empty {
    cursor: pointer;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .icon-button {
    margin: 0 5px;
    // color: red;
    &:hover {
      cursor: pointer;
    }
  }
</style>
