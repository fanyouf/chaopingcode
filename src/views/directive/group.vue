<template>
  <div>
    <my-page
      :op-names="['edit', 'del']"
      :list="state.list"
      title="添加指令"
      item-type="指令"
      :has-op="false"
      has-op-top
      @add-container="hAddDirective"
      @del-container="hDelDirective"
      @edit-container="hEditDirective"
    >
      <template #header>
        <h3>
          当前的科目是 {{ $route.query.subjectTitle }} , 分类是
          {{ $route.query.groupTitle }}
        </h3>
      </template>
      <template #default="{ item }">
        <div style="padding: 10px">
          <img
            style="display: block; margin: 5px auto"
            :src="item.logo"
            alt=""
          />
          <p>
            {{ item.intro }}
          </p>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Group',
  })

  import { getList } from '@/api/directiveGroup'
  import { del as delDirective } from '@/api/directive'
  import myDialog from './directive-dialog.vue'

  import { gp } from '@gp'

  const router = useRouter()
  const route = useRoute()

  const $baseMessage = inject('$baseMessage')

  const editRef = ref<InstanceType<typeof myDialog>>(null)
  // const hChangeCourse = () => {}
  const state = reactive({
    id: -1,
    title: '',
    list: [],
    listLoading: true,
    type: 'text',
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })
  const title = ref('')
  onMounted(() => {
    fetchData()
  })

  const fetchData = async () => {
    state.listLoading = true
    const res = await getList({
      id: route.params.id,
      withDirective: true,
    })
    console.log(res)
    state.id = res.data.id
    state.title = res.data.title
    state.type = res.data.type
    state.list = res.data.directives
    state.listLoading = false
  }
  const hAddDirective = () => {
    editRef.value.showDialog('指令', '添加', {
      id: state.id,
      type: state.type,
      title: state.title,
    })
  }

  const hViewDirectiveGroup = (directiveGroup) => {
    router.push(`/directive/${directiveGroup.id}`)
  }
  const hEditDirective = (directive) => {
    console.log(directive)
    editRef.value.showDialog('指令', '修改', { ...directive, type: state.type })
  }
  const bus = useEventBus<string>('directive')

  const hDelDirective = async (item) => {
    await delDirective(item.id)
    gp.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
    await fetchData()
    bus.emit()
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
