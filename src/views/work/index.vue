<template>
  <div>
    <my-page
      :list="workList"
      title="添加作品"
      :op-names="['del', 'edit']"
      @add-container="hAddWork"
      @del-item="hDel"
      @edit-item="hViewDetail"
    >
      <template #header>
        <my-radio
          v-model="formData.subjectId"
          label="所属科目"
          prop-name="title"
          :list="subjectList"
        />

        <my-radio
          v-model="formData.productGroupID"
          label="所属分类"
          prop-name="title"
          :list="cateList"
        />

        <my-radio
          v-model="formData.courses"
          label="涉及学科"
          prop-name="title"
          :list="subjects"
        />
        <my-radio-level v-model="formData.level" all />
        <div class="items-container">
          <label for="">关键字:</label>
          &nbsp;&nbsp;
          <el-input v-model="formData.keyword" style="width: 200px" />
          &nbsp;&nbsp;
          <el-button type="success" @click="search">搜索</el-button>
        </div>
      </template>
    </my-page>
    <div class="m1">
      <my-pagination v-model="cond" :fetch-data="search" />
    </div>
  </div>
</template>
<script setup lang="ts">
  import { getList } from '@/api/course'
  import { SUBJECT } from '@/constant'
  import { getList as getWorks, del as delWork } from '@/api/work'
  import { gp } from '@gp'
  import { useRouter } from 'vue-router'
  import MyRadio from '~/src/components/my-radio.vue'

  const router = useRouter()

  const subjects = SUBJECT.map((it) => ({
    id: it.value,
    title: it.label,
  }))
  const cond = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  })

  subjects.unshift({ id: 'all', title: '全部' })

  const formData = reactive({
    subjectId: null,
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })
  const search = async () => {
    const d = {
      ...cond.value,
      level: formData.level === 'ALL' ? null : formData.level,
      withKnowledge: true,
      withProductGroup: true,
      withDirective: true,
      course: formData.courses,
      // formData.courses === '-1'
      // ? subjects.filter((it) => it.id !== '-1').map((it) => it.id)
      // : formData.courses,
      productGroupID:
        formData.productGroupID === -1
          ? cateList.value.filter((it) => it.id !== -1).map((it) => it.id)
          : formData.productGroupID,
    }
    const { data } = await getWorks(d)
    console.log('查询结果', data)
    workList.value = data.list
    cond.value.total = data.total
  }
  const hAddWork = () => {
    router.push('/work/add')
  }
  const hViewDetail = ({ id }) => {
    router.push(`/work/edit/${id}`)
  }
  const hDel = async ({ id }) => {
    await delWork(id)
    gp.$baseMessage('删除成功')
    search()
  }
  const subjectList = ref<Subject[]>([])
  const workList = ref<Work[]>([])
  onMounted(async () => {
    const { data } = await getList({ withProductGroup: true })
    console.log(data)
    if (data.list.length) {
      subjectList.value = data.list
      formData.subjectId = data.list[0].id
      search()
    }
  })

  const cateList = computed(() => {
    const t = subjectList.value.find((item) => {
      console.log(item.id, formData.subjectId)
      return item.id === formData.subjectId
    })
    const res = [{ title: '全部', id: -1 }]
    if (t && t.productGroups) {
      res.push(...t.productGroups)
    }
    return res
  })

  // const hDel = (item) => {
  //   if (
  //     item.children?.length ||
  //     item.directives?.length ||
  //     item.knowledge?.length
  //   ) {
  //     $baseMessage('还有子项，不能删除', 'error', 'vab-hey-message-error')
  //     return
  //   }

  //   $baseConfirm('你确定要删除当前项吗', null, () => {
  //     emit('del-container', item)
  //   })
  // }
</script>
<style lang="scss" scoped>
  .emptybox {
    min-height: 100px;
    display: flex;
    cursor: pointer;
    margin-top: 62px;
  }
  .empty {
    margin: auto;
    text-align: center;
  }
  .section {
    background: $base-color-background !important;
    padding: 0;

    .section-item {
      // height: 200px;
    }
    .section-item-title {
      margin: 0;
    }
    .section-item-body {
      padding: 10px;
    }
    .section-item-body-intro {
      height: 3em;
      overflow: hidden;
    }
  }
  .header-ops {
    padding: 0 10px 10px;
    text-align: right;
    .icon {
      // color: #ccc;
      font-size: 24px;
      margin-left: 3px;
      cursor: pointer;
      &:hover {
        // color: #000;
      }
    }
  }
  .badge {
    top: 5px;
  }
</style>
