<template>
  <div class="section">
    <my-page
      :list="state.list"
      item-type="知识点"
      :op-names="['add', 'del', 'edit']"
      @add-container="hAddKnowledgeGroup"
      @del-item="hDelKnowledgeGroup"
      @add-item="hAddKnowledge"
      @view-item="hEditKnowledgeGroup"
    >
      <template #header>
        <h3>选择科目，当前科目是:{{ curSubject.title }}</h3>
        <my-subject v-model="curSubject" />
      </template>
      <template #default="{ item }">
        <div class="knowledge-group">
          <el-tag
            v-for="it in item.knowledge"
            :key="it.id"
            class="knowledge-group-item"
            closable
            @close="hDelKnowledge(it)"
          >
            <span
              title="点击查看"
              style="cursor: pointer"
              @click="hEditKnowledge(it)"
            >
              {{ it.title }}
            </span>
          </el-tag>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />

    <div class="m1">
      <my-pagination v-model="cond" :fetch-data="fetchData" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'KnowledgeIndex',
  })

  import { getList, del as delKnowledgeGroup } from '@/api/knowledgeGroup'
  import { del as delKnowledge } from '@/api/knowledge'
  import MyDialog from '@/components/my-dialog.vue'

  const cond = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  })

  const curSubject = ref<Subject>({} as Subject)
  const $baseConfirm = inject('$baseConfirm')
  // const $baseMessage = inject('$baseMessage')
  const editRef = ref<InstanceType<typeof MyDialog>>(null)
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
      ...cond.value,
      subjectID: curSubject.value.id,
      withKnowledge: true,
    })
    cond.value.total = res.data.total
    state.list = res.data.list
    state.listLoading = false
  }
  const hAddKnowledgeGroup = () => {
    editRef.value.showDialog('目录', '添加', curSubject.value)
  }
  const hAddKnowledge = (knowledgeGroup) => {
    editRef.value.showDialog('知识点', '添加', knowledgeGroup)
  }
  const hEditKnowledge = (knowledge) => {
    editRef.value.showDialog('知识点', '修改', knowledge)
  }
  const hDelKnowledge = (knowledge) => {
    $baseConfirm('你确定要删除当前项吗', null, async () => {
      console.log(knowledge)
      await delKnowledge(knowledge.id)
      fetchData()
    })
  }
  const hDelKnowledgeGroup = async (obj) => {
    console.log('knowledgeGroup', obj)
    await delKnowledgeGroup(obj.id)
    fetchData()
  }

  const hEditKnowledgeGroup = (knowledgeGroup) => {
    console.log(knowledgeGroup)
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
    curSubject,
    () => {
      console.log('1', curSubject)
      fetchData()
    }
    // { immediate: true }
  )
</script>
<style lang="scss">
  .section {
    background: $base-color-background !important;
    padding: 20px 0;
  }
  .knowledges {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .knowledge-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .knowledge-group-item {
    margin: 5px !important;
  }
  .knowledge-group.empty {
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
