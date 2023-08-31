<template>
  <section class="section">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="page-header" shadow="never">
          <div class="items-container">
            <label for="">所属科目:</label>
            <div class="items">
              <div
                v-for="item in subjectList"
                :key="item.id"
                :class="{ selected: formData.subjectId === item.id }"
                class="item"
                @click="formData.subjectId = item.id"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="items-container">
            <label for="">所属分类:</label>
            <div class="items">
              <div
                v-for="item in cateList"
                :key="item.id"
                :class="{ selected: formData.productGroupID === item.id }"
                class="item"
                @click="formData.productGroupID = item.id"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
          <div class="items-container">
            <label for="">涉及学科:</label>
            <el-checkbox-group v-model="formData.courses">
              <el-checkbox
                v-for="item in SUBJECT"
                :key="item.value"
                :label="item.value"
                name="type"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>

            <!-- <div class="items">
              <div
                v-for="item in SUBJECT"
                :key="item.value"
                :class="{ selected: formData.courseId === item.value }"
                class="item"
                @click="formData.courseId = item.value"
              >
                {{ item.label }}
              </div>
            </div> -->
          </div>
          <hr />
          <div class="items-container">
            <label for="">关键字:</label>
            <el-input v-model="formData.keyword" style="width: 200px" />
            <label for="">难度:</label>
            <el-radio-group v-model="formData.level">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="easy">简单</el-radio>
              <el-radio label="medium">中等</el-radio>
              <el-radio label="hard">困难</el-radio>
              <el-radio label="challenge">挑战</el-radio>
            </el-radio-group>

            <el-button type="primary" @click="search">搜索</el-button>
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
              <el-button type="danger" @click="hDel(item.id)">删除</el-button>
            </p>

            <!-- <div v-if="hasOp" class="header-ops">
              <vab-icon
                v-if="opNames.includes('add')"
                class="icon"
                icon="add-box-fill"
                style="color: rgb(54, 203, 203)"
                @click="emit('add-item', item)"
              />
              <vab-icon
                v-if="opNames.includes('edit')"
                class="icon"
                icon="edit-box-fill"
                style="color: rgb(151, 95, 229)"
                @click="emit('edit-container', item)"
              />
              <vab-icon
                v-if="opNames.includes('view')"
                class="icon"
                icon="eye-fill"
                style="color: rgb(251, 212, 55)"
                @click="emit('view-container', item)"
              />
              <vab-icon
                v-if="opNames.includes('del')"
                icon="delete-bin-5-line"
                style="color: rgb(24, 144, 255)"
                class="icon"
                @click="hDel(item)"
              />
            </div> -->
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </section>
</template>
<script setup lang="ts">
  import { getList } from '@/api/course'
  import { SUBJECT } from '@/constant'
  import { getList as getWorks, del as delWork } from '@/api/work'
  import { gp } from '@gp'

  const formData = reactive({
    subjectId: null,
    productGroupID: null,
    courses: [],
    level: 'medium',
    keyword: '', // 关键字
  })
  const search = async () => {
    const { data } = await getWorks(formData)
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
    const res = [{ title: '全部', id: null }]
    if (t && t.productGroups) {
      res.push(...t.productGroups)
    }
    return res
  })

  console.log('list', subjectList)

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
  .items-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    label {
      margin-right: 5px;
    }
    .items {
      display: flex;
      .item {
        padding: 3px;
        cursor: pointer;
        margin: 5px;
      }
    }

    .selected {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
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
      // padding: 20px;
    }
    .section-item-body-intro {
      height: 3em;
      overflow: hidden;
      padding: 10px;
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
