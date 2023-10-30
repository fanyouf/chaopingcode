<template>
  <div class="p1">
    <el-button class="m1" type="primary" @click="add">添加</el-button>
    <el-table border :data="state.list">
      <el-table-column prop="title" type="index" />
      <el-table-column prop="title" label="类型名称" />
      <el-table-column prop="intro" label="类型简介" />
      <el-table-column prop="order" width="90" label="显示顺序" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            size="small"
            type="success"
            :icon="Edit"
            @click="edit(row)"
          />
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            @click="del(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <PaperTypeDialog ref="refDialog" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  import { gp } from '@gp'
  import { Delete, Edit } from '@element-plus/icons-vue'

  import { getList, doDelete } from '@/api/paperType'

  import PaperTypeDialog from './paper-type-dialog'

  const refDialog = ref(null)
  const add = () => {
    refDialog.value.showDialog()
  }

  const edit = (row) => {
    refDialog.value.showDialog('修改', row)
  }

  const del = (row) => {
    gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
      await doDelete(row.id)
      gp.$baseMessage('删除成功', 'success')
      fetchData()
    })
  }
  const state = reactive({
    list: [],
    listLoading: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })
  onMounted(() => {
    fetchData()
  })

  const fetchData = async () => {
    state.listLoading = true
    const res = await getList()
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
