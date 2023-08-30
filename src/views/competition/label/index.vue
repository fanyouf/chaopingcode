<template>
  <div>
    <my-page
      :list="state.list"
      item-type="属性"
      title="添加属性"
      has-op-top
      @add-container="hAddLabel"
      @del-container="hDelLabel"
      @add-item="hAddLabelValue"
      @edit-container="hEditLabel"
    >
      <template #header>
        <h3>选择赛事，当前赛事是:{{ curCompetition.title }}</h3>
        <my-competition v-model="curCompetition" />
      </template>
      <template #default="{ item }">
        <div class="Label-group">
          <el-tag
            v-for="it in item.labelValues"
            :key="it.id"
            class="Label-group-item"
            closable
            @close="hDelLabelValue(it)"
          >
            <span
              title="点击查看"
              style="cursor: pointer"
              @click="hEditLabel(it)"
            >
              {{ it.val }}
            </span>
          </el-tag>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
    <my-dialog-value ref="editValueRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'LabelIndex',
  })
  import {
    getList,
    del as delLabel,
    delValue as delLabelValue,
  } from '@/api/label'
  import MyDialog from './label-dialog.vue'
  import MyDialogValue from './value-dialog.vue'

  const $baseConfirm = inject('$baseConfirm')
  // const $baseMessage = inject('$baseMessage')
  const editRef = ref<InstanceType<typeof MyDialog>>(null)
  const editValueRef = ref<InstanceType<typeof MyDialogValue>>(null)

  const curCompetition = ref<Competition>({} as Competition)

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
      entityID: curCompetition.value.id,
      withLabelValue: true,
      entityType: 'competition',
    })
    console.log(res)
    state.list = res.data.list
    state.listLoading = false
  }
  const hAddLabel = (label) => {
    editRef.value.showDialog('属性', '添加', { id: curCompetition.value.id })
  }

  const hAddLabelValue = (label) => {
    console.log(label)
    editValueRef.value.showDialog('属性值', '添加', { labelID: label.id })
  }

  const hEditLabel = (label) => {
    editRef.value.showDialog('知识点', '修改', label)
  }
  // 删除属性
  const hDelLabel = async (Label) => {
    await delLabel(Label.id)
    fetchData()
  }

  // 删除属性值
  const hDelLabelValue = (labelValue: LabelValue) => {
    $baseConfirm('你确定要删除当前项吗', null, async () => {
      await delLabelValue(labelValue.id)
      fetchData()
    })
  }
  onMounted(() => {
    fetchData()
  })
  watch(curCompetition, () => {
    fetchData()
  })
</script>

<style lang="scss">
  .section {
    background: $base-color-background !important;
    padding: 0;
  }
  .Labels {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .Label-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .Label-group-item {
    margin: 5px !important;
  }
  .Label-group.empty {
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
