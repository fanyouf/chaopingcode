<template>
  <div>
    <my-page
      title="作品分类"
      has-op-top
      :op-names="['del', 'edit']"
      :list="state.list"
      @add-container="hAddWorkGroup"
      @del-container="hDelWorkGroup"
      @edit-container="hEditWorkGroup"
    >
      <template #header>
        <h3>选择科目，当前科目是:{{ curCourse.title }}</h3>
        <my-subject v-model="curCourse" />
      </template>
      <template #default="{ item }">
        <div class="Work-group">
          <p>{{ item.intro }}</p>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  // import { OPObject } from '../../types/data'
  defineOptions({
    name: 'WorkIndex',
  })

  import { gp } from '@gp'
  import { getList, del as delWorkCate } from '@/api/workCate'
  import myDialog from './work-type-dialog.vue'
  import router from '~/src/router'

  const curCourse = ref({ id: -1, title: '' })
  const editRef = ref<InstanceType<typeof myDialog>>(null)
  // const hChangeCourse = () => {}
  const state = reactive({
    list: [],
    listLoading: true,
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })

  const fetchData = async () => {
    state.listLoading = true
    const res = await getList({})
    console.log(res)
    state.list = res.data.list
    state.listLoading = false
  }
  const hAddWorkGroup = () => {
    editRef.value.showDialog('作品分类', '添加', {})
  }
  const hAddWork = (WorkGroup) => {
    router.push('/work/add')
  }
  const hEditWork = (Work) => {
    editRef.value.showDialog('作品', '修改', Work)
  }

  const hDelWorkGroup = async (work: WorkCate) => {
    await delWorkCate(work.id)
    gp.$baseMessage('OK', 'success', 'vab-hey-message-success')
    fetchData()
  }

  const hEditWorkGroup = (workGroup) => {
    debugger
    editRef.value.showDialog('作品分类', '修改', workGroup)
  }
  // const hDel = (typeName, row) => {
  //   $baseConfirm('你确定要删除当前项吗', null, async () => {
  //     const { msg } = await doDelete({ ids: row.id })
  //     $baseMessage(msg, 'success', 'vab-hey-message-success')
  //     await fetchData()
  //   })
  // }

  watch(
    () => curCourse,
    () => {
      console.log('1', curCourse)
      fetchData()
    },
    { immediate: true }
  )

  // onActivated(() => {
  //   console.log('onActived')
  //   // 调用时机为首次挂载
  //   // 以及每次从缓存中被重新插入时
  //   fetchData()
  // })
</script>
<style lang="scss">
  .section {
    background: $base-color-background !important;
    padding: 0;
  }
  .Works {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .Work-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .Work-group-item {
    margin: 5px !important;
  }
  .Work-group.empty {
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
