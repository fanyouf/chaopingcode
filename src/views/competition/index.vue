<template>
  <div>
    <my-page
      :list="state.list"
      title="添加赛事"
      :op-names="['del', 'edit']"
      @edit-item="hEditCompetition"
      @del-item="hDelCompetition"
      @add-container="hAddCompetition"
    >
      <template #header>
        <h3>赛事列表</h3>
        <p>当前一共有{{ state.list.length }}个赛事</p>
      </template>

      <!-- <template #default="{ item }">
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
      </template> -->
    </my-page>
  </div>
</template>
<script setup lang="ts">
  import { del as delCompetition, getList } from '@/api/competition'
  import { useRouter } from 'vue-router'
  import { gp } from '@gp'

  import { useEventBus } from '@vueuse/core'

  const fetchData = async () => {
    state.isLoading = true
    const { data } = await getList({})
    state.list = data.list
    state.isLoading = false
  }

  const bus = useEventBus<string>('news')

  const unsubscribe = bus.on(fetchData)

  onUnmounted(() => {
    unsubscribe()
  })

  defineOptions({
    name: 'CompetitionIndex',
  })

  const router = useRouter()

  const hAddCompetition = () => {
    router.push('/competition/add')
  }
  const hEditCompetition = (obj) => {
    router.push(`/competition/edit/${obj.id}`)
  }
  const hDetail = (item: Competition) => {
    router.push(`/course/${item.id}`)
  }
  const hEdit = (item: Competition) => {
    console.log(item)
  }

  const state = reactive({
    list: [] as Competition[],
    isLoading: ref(false),
    layout: 'total, sizes, prev, pager, next, jumper',
    total: 0,
    selectRows: '',
  })

  // const hShowDialog = (typeName, opName, row = null) => {
  //   editRef.value.showDialog(typeName, opName, row)
  // }
  const hDelCompetition = async (row: Competition) => {
    await delCompetition(row.id)
    gp.$baseMessage('OK', 'success', 'vab-hey-message-success')
    fetchData()
  }

  onMounted(() => {
    fetchData()
  })
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
