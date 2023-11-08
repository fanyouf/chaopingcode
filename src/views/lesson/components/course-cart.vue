<template>
  <el-drawer v-model="isShow" size="50%" title="单元篮" destroy-on-close>
    <div>
      <label>科目： {{ subject.title }}</label>
    </div>
    <p>共计{{ cartList.length }}个教学单元</p>

    <!-- 具体的教学单元-->

    <div v-for="(item, idx) in list" :key="item.id" class="subject-container">
      <div class="subject-item">
        <img class="subject-img" :src="item.cover" fit="cover" />
        <div class="subject-info">
          <h3>
            {{ item.title }}
          </h3>
          <p>{{ item.intro }}</p>
          <div>
            <el-button
              size="small"
              :disabled="idx === 0"
              @click="hMove(item, -1)"
            >
              上
            </el-button>
            <el-button
              size="small"
              :disabled="idx === list.length - 1"
              @click="hMove(item, 1)"
            >
              下
            </el-button>
            <el-button size="small">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <el-button @click="showDialog">保存为课程</el-button>
    </div>
  </el-drawer>

  <course-dialog
    ref="refDialog"
    :lesson-group-id="lessonGroupId"
    :list-detail="list"
    @add-paper-ok="hAddPaperOK"
  />

  <el-button
    type="primary"
    style="
      position: fixed;
      top: 250px;
      right: 100px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    "
    @click="hOpen"
  >
    单元篮{{ cartList.length }}
  </el-button>
</template>

<script setup lang="ts">
  import CourseDialog from './course-dialog.vue'
  import { CONST_EX_TYPE } from '@/constant'
  const props = defineProps({
    subject: {
      type: Object,
      required: true,
    },
    lessonGroupId: {
      type: String || Number,
      required: true,
    },
    cartList: {
      type: Array,
      required: true,
    },
  })

  const refDialog = ref<InstanceType<typeof CourseDialog>>(null)

  const showDialog = () => {
    refDialog.value.showDialog()
  }
  const emit = defineEmits(['moveout', 'moveoutall'])

  const isShow = ref(false)

  // 添加试卷成功
  const hAddPaperOK = () => {
    isShow.value = false
    emit('moveoutall')
  }

  const list = ref([])
  const hOpen = () => {
    isShow.value = true
    buildList()
  }

  const buildList = () => {
    list.value = []
    props.cartList.forEach((item) => {
      list.value.push(item)
    })
  }
  const hMove = (item, idx) => {
    const curIndx = list.value.findIndex((it) => it === item)

    const newIndx = curIndx + idx

    const t = list.value[curIndx]
    list.value[curIndx] = list.value[newIndx]
    list.value[newIndx] = t
  }

  const hDel = (item, idx) => {
    const templist = list.value[item.type].list
    templist.splice(idx, 1)
    emit('moveout', item)
  }

  // defineExpose({ buildList })
</script>

<style lang="scss" scoped>
  .header {
    margin: 1em 0;
  }
  .subject-item {
    .subject-img {
      border-radius: 5px;
      height: 80px;
    }
    .subject-info {
      display: flex;
      flex-direction: column;
    }
    display: flex;
    margin-bottom: 2em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
