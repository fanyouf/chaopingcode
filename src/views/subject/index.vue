<template>
  <div>
    <my-page
      :list="list"
      title="添加科目"
      :op-names="['del', 'edit']"
      @del-container="hDel"
      @add-container="hAddSubject"
      @edit-container="hEditSubject"
    >
      <template #header>
        <h3>科目列表</h3>
        <p>当前一共有{{ list.length }}个科目</p>
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
    <my-dialog ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script setup lang="ts">
  import useSubject from '@/hooks/useSubject'
  import { doDelete, getList } from '@/api/course'
  import { gp } from '@gp'
  defineOptions({
    name: 'SubjectIndex',
  })

  const editRef = ref<InstanceType<typeof MyDialog>>(null)
  const hAddSubject = () => {
    editRef.value.showDialog('科目', '添加', null)
  }
  // const hDetail = (item: Subject) => {
  //   router.push(`/course/${item.id}`)
  // }
  const hEditSubject = (item: Subject) => {
    editRef.value.showDialog('科目', '修改', item)
  }

  // 删除科目
  const hDel = async (row) => {
    await doDelete(row.id)
    gp.$baseMessage('删除成功', 'success', 'vab-hey-message-success')
    fetchData()
  }

  const { list, isLoading } = useSubject()

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
