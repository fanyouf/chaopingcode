<template>
  <div>
    <my-page
      :list="list"
      title="添加课程"
      :op-names="['del', 'edit']"
      @add-container="hAddCourse"
      @del-item="hDel"
      @edit-item="hViewDetail"
    >
      <template #header>
        <h3>课程列表</h3>
        <p>当前一共有{{ list.length }}个课程</p>
      </template>
    </my-page>
  </div>
</template>

<script setup lang="ts">
  import { del, getList } from '@/api/lessonGroup'
  import MyDialog from '~/src/components/my-dialog.vue'

  defineOptions({
    name: 'CourseIndex',
  })
  const defaultImage =
    'http://8.142.32.7:8888/assets/d1/57/d1576663f29233e326553db584e5520c.jpg'
  const router = useRouter()

  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  const editRef = ref<InstanceType<typeof MyDialog>>(null)
  const hAddCourse = () => {
    alert('回到教学单元')
    // editRef.value.showDialog('科目', '添加', null)
  }
  const hDetail = (item: Subject) => {
    router.push(`/course/${item.id}`)
  }
  const hEdit = (item: Subject) => {
    console.log(item)
  }

  const state = reactive({
    list: [
      // {
      //   title: 'Scratch图形化',
      //   intro: '在咋必成大器谢谢大地方方法学才',
      //   logo: './xxx',
      //   remark: ',',
      //   order: 1,
      //   type: 'string',
      //   id: 1,
      //   create_at: 1,
      //   update_at: 23,
      //   deleted_at: 3,
      // },
      // {
      //   title: 'Scratch图形化',
      //   intro: '在咋必成大器谢谢大地方方法学才',
      //   logo: './xxx',
      //   remark: ',',
      //   order: 1,
      //   type: 'string',
      //   id: 2,
      //   create_at: 1,
      //   update_at: 23,
      //   deleted_at: 3,
      // },
      // {
      //   title: 'Scratch图形化',
      //   intro: '在咋必成大器谢谢大地方方法学才',
      //   logo: './xxx',
      //   remark: ',',
      //   order: 1,
      //   type: 'string',
      //   id: 3,
      //   create_at: 1,
      //   update_at: 23,
      //   deleted_at: 3,
      // },
      // {
      //   title: 'Scratch图形化',
      //   intro: '在咋必成大器谢谢大地方方法学才',
      //   logo: './xxx',
      //   remark: ',',
      //   order: 1,
      //   type: 'string',
      //   id: 4,
      //   create_at: 1,
      //   update_at: 23,
      //   deleted_at: 3,
      // },
      // {
      //   title: 'Scratch图形化',
      //   intro: '在咋必成大器谢谢大地方方法学才',
      //   logo: './xxx',
      //   remark: ',',
      //   order: 1,
      //   type: 'string',
      //   id: 5,
      //   create_at: 1,
      //   update_at: 23,
      //   deleted_at: 3,
      // },
    ] as Subject[],
    isLoading: ref(false),
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })

  // const hShowDialog = (typeName, opName, row = null) => {
  //   editRef.value.showDialog(typeName, opName, row)
  // }
  const hDel = async (row) => {
    await del(row.id)
    $baseMessage('OK', 'success', 'vab-hey-message-success')
    fetchData()
  }
  const isLoading = ref(false)
  const list = ref([])
  onMounted(() => {
    fetchData()
  })

  const fetchData = async () => {
    isLoading.value = true
    const { data } = await getList({ withLessons: true })
    list.value = data.list
    isLoading.value = false
  }

  const hViewDetail = ({ id }) => {
    window.open(`/#/course/detail?id=${id}`)
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
