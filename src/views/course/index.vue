<template>
  <div>
    <my-page
      :list="list"
      title="添加科目"
      :has-op="false"
      @add-container="hAddCourse"
    >
      <template #header>
        <h3>科目列表</h3>
        <p>当前一共有{{ list.length }}个科目</p>
      </template>

      <template #default="{ item }">
        <div class="course">
          <img :src="item.logo || defaultImage" class="logo" />
          <h3 class="course-title">{{ item.title }}</h3>
          <p class="course-info">{{ item.intro }}</p>
          <div class="course-ops">
            <el-button size="small" type="primary" @click="hEdit(item)">
              编辑
            </el-button>
            <el-button size="small" type="primary" @click="hDetail(item)">
              查看详情
            </el-button>
            <el-button size="small" type="primary" @click="hDel(item)">
              删除
            </el-button>
          </div>
        </div>
      </template>
    </my-page>
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  import { stat } from 'fs'
  import useCourse from '@/hooks/useCourse'
  import { doDelete, getList } from '@/api/course'
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
    editRef.value.showDialog('科目', '添加', null)
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
  const hDel = (row) => {
    $baseConfirm('你确定要删除当前项吗', null, async () => {
      await doDelete(row.id)
      $baseMessage('OK', 'success', 'vab-hey-message-success')
      fetchData()
    })
  }

  const { list, isLoading } = useCourse()

  const fetchData = async () => {
    isLoading.value = true
    const { data } = await getList()
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
