<template>
  <div>
    <my-page
      :list="state.list"
      title="添加习题库"
      @add-container="hAddExerciseGroup"
      @add-item="hAddExercise"
      @edit-container="hEditExerciseGroup"
    >
      <template #header>
        <h3>选择科目，当前科目是{{ curSubject.title }}</h3>
        <my-subject v-model="curSubject" />
      </template>
      <template #default="{ item }">
        <div class="exercise-group">
          <el-tag
            v-for="it in item.children"
            :key="it.id"
            class="exercise-group-item"
            closable
            @close="hDelExercise(it)"
          >
            <span
              title="点击查看"
              style="cursor: pointer"
              @click="hEditExercise(it)"
            >
              {{ it.title }}
            </span>
          </el-tag>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  // import { OPObject } from '../../types/data'
  defineOptions({
    name: 'ExerciseIndex',
  })
  // import myPage from '~/src/components/my-page.vue'
  // import myCourse from '~/src/components/my-course.vue'
  // import { onActivated, onDeactivated } from 'vue'
  // import { Plus } from '@element-plus/icons-vue'

  import { getList } from '@/api/exercise'
  import MyDialog from '@/components/my-dialog.vue'

  const curSubject = ref<Subject>({} as Subject)
  // const $baseConfirm = inject('$baseConfirm')
  // const $baseMessage = inject('$baseMessage')
  const subject = ref('c++')
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
    const res = await getList({})
    console.log(res)
    state.list = res.data.list
    state.listLoading = false
  }
  const hAddExerciseGroup = () => {
    editRef.value.showDialog('目录', '添加', null)
  }
  const hAddExercise = (exerciseGroup) => {
    editRef.value.showDialog('知识点', '添加', exerciseGroup)
  }
  const hEditExercise = (exercise) => {
    editRef.value.showDialog('知识点', '修改', exercise)
  }

  const hDelExercise = (exercise) => {
    alert(1)
    console.log('exercise')
  }

  const hEditExerciseGroup = (exerciseGroup) => {
    editRef.value.showDialog('目录', '修改', exerciseGroup)
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
  .exercises {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .exercise-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .exercise-group-item {
    margin: 5px !important;
  }
  .exercise-group.empty {
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
