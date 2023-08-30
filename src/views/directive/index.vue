<template>
  <div>
    <my-page
      :list="state.list"
      title="添加指令分类"
      item-type="指令"
      :has-op="false"
      has-op-top
      @view-container="hViewDirectiveGroup"
      @add-container="hAddDirectiveGroup"
      @del-container="hDelDirectiveGroup"
      @add-item="hAddDirective"
      @edit-container="hEditDirectiveGroup"
    >
      <template #header>
        <h3>选择科目，当前科目是:{{ curSubject.title }}</h3>
        <my-subject v-model="curSubject" />
      </template>

      <template #default="{ item }">
        <!-- {{ item }} -->
        <div style="padding: 10px">
          <img
            v-if="item.type === 'image'"
            :src="item.image"
            style="display: block; margin: 5px auto"
          />
          <p>{{ item.intro }}</p>
          <p>
            指令数量： {{ item.directives?.length }} 个
            <el-button type="text" @click="hViewDirectiveGroup(item)">
              查看
            </el-button>
          </p>
        </div>
      </template>
    </my-page>
    <my-dialog
      ref="editRef"
      :subject-id="curSubject.id"
      @fetch-data="fetchData"
      @view-directives="hViewDirectiveGroup"
    />
  </div>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  defineOptions({
    name: 'DirectiveIndex',
  })

  import { getList, del as delDirectiveGroup } from '@/api/directiveGroup'
  import { gp } from '@gp'
  import myDialog from './directive-dialog.vue'

  const router = useRouter()
  const curSubject = ref({ id: -1, title: '' })
  const bus = useEventBus<string>('directive')
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
    const res = await getList({
      subjectID: curSubject.value.id,
      withDirective: true,
    })
    state.list = res.data.list
    state.listLoading = false
  }
  // 监听来自
  bus.on(() => fetchData())

  const hAddDirectiveGroup = () => {
    editRef.value.showDialog('指令分类', '添加', {
      subjectID: curSubject.value.id,
      subjectTitle: curSubject.value.title,
    })
  }
  const hAddDirective = (directiveGroup) => {
    editRef.value.showDialog('指令', '添加', directiveGroup)
  }

  const hViewDirectiveGroup = (directiveGroup) => {
    router.push(
      `/directive/group/${directiveGroup.id}?subjectTitle=${curSubject.value.title}&groupTitle=${directiveGroup.title}`
    )
  }
  // const hEditDirective = (knowledge) => {
  //   editRef.value.showDialog('指令', '修改', curSubject.value.id, knowledge)
  // }

  const hDelDirectiveGroup = async (directiveGroup) => {
    if (directiveGroup.directives.length > 0) {
      gp.$baseMessage('不能删除有指令的分组', 'error')
      return
    }
    await delDirectiveGroup(directiveGroup.id)
    gp.$baseMessage('删除指令分类成功', 'success')
    fetchData()
  }

  const hEditDirectiveGroup = (directiveGroup) => {
    editRef.value.showDialog('指令分类', '修改', {
      ...directiveGroup,
      subjectTitle: curSubject.value.title,
    })
  }
  // const hDel = (typeName, row) => {
  //   $baseConfirm('你确定要删除当前项吗', null, async () => {
  //     const { msg } = await doDelete({ ids: row.id })
  //     $baseMessage(msg, 'success', 'vab-hey-message-success')
  //     await fetchData()
  //   })
  // }

  watch(curSubject, () => {
    console.log('1', curSubject)
    fetchData()
  })
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
