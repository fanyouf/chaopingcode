<template>
  <section class="section">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="page-header" shadow="never">
          <my-radio-subject v-model="formData.subject" />

          <my-radio
            v-model="formData.productGroupID"
            label="所属分类"
            :list="cateList"
          />

          <my-radio
            v-model="formData.courses"
            label="涉及学科"
            :list="subjects"
          />

          <hr />
          <div class="items-container">
            <label for="">关键字:</label>
            <el-input v-model="formData.keyword" style="width: 200px" />
            &nbsp; &nbsp;
            <label for="">难度:</label>
            <el-select v-model="formData.level">
              <el-option label="全部" :value="null">全部</el-option>
              <el-option label="简单" value="easy">简单</el-option>
              <el-option label="中等" value="medium">中等</el-option>
              <el-option label="困难" value="hard">困难</el-option>
              <el-option label="挑战" value="challenge">挑战</el-option>
            </el-select>
            &nbsp; &nbsp;
            <el-button type="success" @click="search">搜索</el-button>
          </div>
        </vab-card>
      </el-col>

      <el-col
        v-for="item in workList"
        :key="item.id"
        :lg="6"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <vab-card
          class="section-item"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="section-item-body">
            <img
              v-if="item.cover"
              style="width: 100%; height: 186px"
              :src="item.cover"
            />
            <h3>{{ item.title }}</h3>

            <p class="section-item-body-intro">{{ item.intro }}</p>
            <p>
              <el-button size="small" type="danger" @click="hDel(item.id)">
                删除
              </el-button>

              <el-button
                v-if="!item.inCart"
                size="small"
                type="primary"
                :icon="Plus"
                @click="hAddtoCart(item)"
              />
              <el-button
                v-else
                size="small"
                type="success"
                :icon="RemoveFilled"
                title="移出试题篮"
                @click="hRemoveFromCart(item)"
              />
            </p>
          </div>
        </vab-card>
      </el-col>
    </el-row>
    <CourseCart
      :cart-list="cartList"
      :subject="formData.subject"
      @moveout="hMoveout"
      @moveoutall="hMoveoutAll"
    />
  </section>
</template>
<script setup lang="ts">
  import { RemoveFilled, Edit, Plus } from '@element-plus/icons-vue'

  import CourseCart from './components/course-cart.vue'

  import { getList } from '@/api/course'
  import { SUBJECT } from '@/constant'
  import { getList as getWorks, del as delWork } from '@/api/lesson'
  import { gp } from '@gp'
  import MyRadio from '~/src/components/my-radio.vue'

  const cartList = ref([])
  // 添加到试题篮
  const hAddtoCart = (item) => {
    item.inCart = true
    cartList.value.push(item)
  }
  const hRemoveFromCart = (item) => {
    item.inCart = false
    cartList.value.splice(cartList.value.indexOf(item), 1)
  }
  // const hMoveoutAll = () => {
  //   cartList.value.forEach((it, idx) => {
  //     const item = exerciseList.value.find((i) => i.id === it.id)
  //     item.inCart = false
  //   })
  //   cartList.value = []
  // }
  // const hMoveoutAll = () => {
  //   cartList.value.forEach((it, idx) => {
  //     const item = exerciseList.value.find((i) => i.id === it.id)
  //     item.inCart = false
  //   })
  //   cartList.value = []
  // }
  // const hMoveout = (it) => {
  //   const item = exerciseList.value.find((i) => i.id === it.id)
  //   item.inCart = false

  //   const idx = cartList.value.find((i) => i.id === it.id)
  //   cartList.value.splice(idx, 1)
  // }

  const subjects = SUBJECT.map((it) => ({
    id: it.value,
    title: it.label,
  }))

  subjects.unshift({ id: null, title: '全部' })

  const formData = reactive({
    subject: { id: null, title: '' },
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })
  const search = async () => {
    const d = {
      withKnowledge: true,
      withProductGroup: true,
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
  }
  const hDel = (id) => {
    gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
      await delWork(id)
      gp.$baseMessage('删除成功')
      search()
    })
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
