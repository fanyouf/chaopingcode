<template>
  <el-drawer v-model="isShow" size="50%" title="试题篮" destroy-on-close>
    <div>
      <label>科目： {{ subject.title }}</label>
    </div>
    <p>
      共计{{ cartList.length }}个资源，当前总分:{{
        listDetail.reduce((a, b) => a + b.total, 0)
      }}
      分
    </p>

    <!-- 统计区域 -->
    <div>
      <el-button v-for="item in listDetail" :key="item.id" type="primary">
        {{ item.title }}
      </el-button>
    </div>

    <!-- 具体的题目区域 -->

    <div v-for="item in listDetail" :key="item.id" class="subject-container">
      <el-divider />
      <div class="flex header">
        <label>
          <b>{{ CONST_EX_TYPE[item.id] }}</b>
          共 {{ [list[item.id].list.length] }}题, 共{{ item.total }} 分
        </label>
        <div>
          每题
          <el-input-number
            v-model="list[item.id].mark"
            size="small"
            style="width: 80px"
            :step="1"
          />
          分
        </div>
      </div>
      <div class="m1">
        <el-input v-model="list[item.id].desc" type="textarea" />
      </div>

      <div class="subject-list">
        <div
          v-for="(i, idx) in list[item.id].list"
          :key="i.id"
          class="subject-item"
        >
          <div class="subject-item-title" v-html="i.title"></div>
          <footer class="right">
            本题
            <el-input-number
              v-model="i.mark"
              style="width: 80px"
              size="small"
              :step="1"
            />
            分
            <button :disabled="idx === 0" @click="hMove(i, -1)">上</button>
            <button
              :disabled="idx === list[item.id].list.length - 1"
              @click="hMove(i, 1)"
            >
              下
            </button>
            <button @click="hDel(i, idx)">删</button>
          </footer>
        </div>
      </div>
    </div>

    <div>
      <el-button @click="showDialog">保存为试卷</el-button>
    </div>
  </el-drawer>

  <paper-dialog
    ref="refDialog"
    :list="list"
    :list-detail="listDetail"
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
    试题篮{{ cartList.length }}
  </el-button>
</template>
<script setup lang="ts">
  import PaperDialog from './paper-dialog.vue'
  import { CONST_EX_TYPE } from '@/constant'
  const props = defineProps({
    subject: {
      type: Object,
      required: true,
    },
    cartList: {
      type: Array,
      required: true,
    },
  })
  const refDialog = ref<InstanceType<typeof PaperDialog>>(null)

  const showDialog = () => {
    refDialog.value.showDialog()
  }
  const emit = defineEmits(['moveout', 'moveoutall'])

  const isShow = ref(false)
  const totalMark = ref(0)

  // 添加试卷成功
  const hAddPaperOK = () => {
    isShow.value = false
    emit('moveoutall')
  }

  const listDetail = computed(() => {
    const res = []
    const t = ['single', 'multi', 'judge', 'answer', 'code']
    t.forEach((it) => {
      if (list.value[it].list.length > 0) {
        res.push({
          id: it,
          tit: `${CONST_EX_TYPE[it]}`,
          title: `${CONST_EX_TYPE[it]}(${list.value[it].list.length})`,
          total: list.value[it].list.reduce((a, b) => a + b.mark, 0),
        })
      }
    })
    return res
  })

  const list = ref({
    single: {
      list: [],
      mark: 2,
      desc: '题目描述',
    },
    multi: {
      list: [],
      mark: 3,
      desc: '题目描述',
    },
    judge: {
      list: [],
      mark: 5,
      desc: '题目描述',
    },
    answer: {
      list: [],
      mark: 6,
      desc: '题目描述',
    },
    code: {
      list: [],
      mark: 10,
      desc: '题目描述',
    },
  })
  const resetList = () => {
    Object.keys(list.value).forEach((it) => {
      list.value[it].list = []
    })
  }

  const buildList = () => {
    resetList()
    props.cartList.forEach((item) => {
      list.value[item.type].list.push({
        ...item,
        mark: list.value[item.type].mark,
      })
    })
  }
  const hOpen = () => {
    isShow.value = true
    buildList()
  }

  const hMove = (item, idx) => {
    const templist = list.value[item.type].list

    const curIndx = templist.findIndex((it) => it === item)

    const newIndx = curIndx + idx

    templist[curIndx] = templist[newIndx]
    templist[newIndx] = item

    list.value[item.type].list = templist
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
    margin-bottom: 2em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
