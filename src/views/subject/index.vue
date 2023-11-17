<template>
  <div>
    <my-page
      :list="list"
      title="添加科目"
      :op-names="['del', 'edit']"
      @del-item="hDel"
      @add-container="hAddSubject"
      @edit-item="hEditSubject"
    >
      <template #header>
        <h3>科目列表</h3>
        <p>当前一共有{{ list.length }}个科目</p>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  import useSubject from '@/hooks/useSubject'
  import { doDelete, getList } from '@/api/course'
  import { gp } from '@gp'
  defineOptions({
    name: 'SubjectIndex',
  })

  const editRef = ref<InstanceType<typeof MyDialog>>(null)
  const hAddSubject = () => {
    editRef.value.showDialog('科目', '添加', null)
  }
  // const hDetail = (item: Subject) => {
  //   router.push(`/course/${item.id}`)
  // }
  const hEditSubject = (item: Subject) => {
    editRef.value.showDialog('科目', '修改', item)
  }

  // 删除科目
  const hDel = async (row) => {
    await doDelete(row.id)
    gp.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
    fetchData()
  }

  const { list, isLoading } = useSubject({
    sortField: 'order',
    sortOrder: 'asc',
  })

  const fetchData = async () => {
    isLoading.value = true
    const { data } = await getList({ sortField: 'order', sortOrder: 'asc' })
    list.value = data.list
    isLoading.value = false
  }
</script>
<style scoped lang="scss">
  .section {
    background: $base-color-background !important;
    padding: 0;
  }
  .courses {
    padding: 10px 5px;
    background: $base-color-background !important;
  }
  .course {
    position: relative;
    background-color: #fff;
    border-radius: 5px;
    .logo {
      width: 100px;
      left: 0;
      position: absolute;
    }
    padding: 20px;
    padding-left: 120px;
  }
  .course.empty {
    padding: 0;
    display: flex;
    > div {
      margin: auto;
    }
  }
  .icon-button {
    margin: 0 5px;
    // color: red;
    &:hover {
      cursor: pointer;
    }
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    &::after {
      content: '';
      margin-right: auto;
    }
  }

  .card-container .el-card {
    width: 30%;
    margin: 10px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    span {
      margin-right: auto;
    }
  }
</style>
~/src/api/knowledege ~/src/api/knowledge
