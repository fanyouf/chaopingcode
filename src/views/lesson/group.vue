<template>
  <div>
    <my-page
      :list="state.list"
      :op-names="['add', 'del', 'edit']"
      title="教学单元分类"
      @add-container="hAddLessonGroup"
      @add-item="hAddLesson"
      @edit-container="hEditLessonGroup"
    >
      <template #header>
        <h3>选择科目，当前科目是{{ curCourse.title }}</h3>
        <my-subject v-model="curCourse" />
      </template>
      <!-- <template #default="{ item }">
        <div class="lesson-group">
          <el-tag
            v-for="it in item.children"
            :key="it.id"
            class="lesson-group-item"
            closable
            @close="hDelLesson(it)"
          >
            <span
              title="点击查看"
              style="cursor: pointer"
              @click="hEditLesson(it)"
            >
              {{ it.title }}
            </span>
          </el-tag>
        </div>
      </template> -->
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  // import { OPObject } from '../../types/data'
  defineOptions({
    name: 'LessonIndex',
  })
  // import myPage from '~/src/components/my-page.vue'
  // import myCourse from '~/src/components/my-course.vue'
  // import { onActivated, onDeactivated } from 'vue'
  // import { Plus } from '@element-plus/icons-vue'

  import { getList } from '@/api/knowledge'
  import MyDialog from './lesson-dialog.vue'
  import router from '~/src/router'

  const curCourse = ref({})
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
  const hAddLessonGroup = () => {
    editRef.value.showDialog('单元分类', '添加', {
      subjectID: curCourse.value.id,
      subjectTitle: curCourse.value.title,
    })
  }
  const hAddLesson = (lessonGroup) => {
    router.push('/lesson/add')
  }

  const hDelLesson = (lesson) => {
    alert(1)
    console.log('lesson')
  }

  const hEditLessonGroup = (lessonGroup) => {
    editRef.value.showDialog('教学单元', '修改', lessonGroup)
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
  .lessons {
    padding: 10px 5px;
    background-color: $base-color-background;
  }
  .lesson-group {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .lesson-group-item {
    margin: 5px !important;
  }
  .lesson-group.empty {
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
