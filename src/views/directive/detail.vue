<template>
  <div>
    <myPage
      :list="state.list"
      title="添加指令"
      item-type="指令"
      has-op
      @view-container="hViewDirectiveGroup"
      @add-container="hAddDirectiveGroup"
      @add-item="hAddDirective"
      @edit-container="hEditDirectiveGroup"
    >
      <template #header>
        <h3>当前的科目是 Scratch , 分类是 {{ $route.params.id }}</h3>
      </template>
    </myPage>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  // import { OPObject } from '../../types/data'
  defineOptions({
    name: 'DirectiveDetail',
  })
  import myPage from '~/src/components/my-page.vue'
  import myCourse from '~/src/components/my-course.vue'
  // import { onActivated, onDeactivated } from 'vue'
  // import { Plus } from '@element-plus/icons-vue'

  import { getList } from '@/api/knowledge'
  import myDialog from '@/components/my-dialog.vue'
  const router = useRouter()
  const curCourse = ref('Python')
  // const $baseConfirm = inject('$baseConfirm')
  // const $baseMessage = inject('$baseMessage')
  const subject = ref('c++')
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
  const hAddDirectiveGroup = () => {
    editRef.value.showDialog('目录', '添加', null)
  }
  const hAddDirective = (knowledgeGroup) => {
    editRef.value.showDialog('知识点', '添加', knowledgeGroup)
  }

  const hViewDirectiveGroup = (directiveGroup) => {
    router.push(`/directive/${directiveGroup.id}`)
  }
  const hEditDirective = (knowledge) => {
    editRef.value.showDialog('知识点', '修改', knowledge)
  }

  const hDelDirective = (knowledge) => {
    alert(1)
    console.log('knowledge')
  }

  const hEditDirectiveGroup = (knowledgeGroup) => {
    editRef.value.showDialog('目录', '修改', knowledgeGroup)
  }
  // const hDel = (typeName, row) => {
  //   $baseConfirm('你确定要删除当前项吗', null, async () => {
  //     const { msg } = await doDelete({ ids: row.id })
  //     $baseMessage(msg, 'success', 'vab-hey-message-success')
  //     await fetchData()
  //   })
  // }

  watch(
    subject,
    () => {
      console.log('1', subject)
      fetchData()
    },
    { immediate: true }
  )
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
