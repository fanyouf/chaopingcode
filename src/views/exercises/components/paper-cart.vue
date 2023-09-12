<template>
  <el-drawer v-model="isShow" title="试题篮" destroy-on-close>
    <div>
      <label>科目： {{ subject.title }}</label>
    </div>
    <p>共计{{ cartList.length }}个资源，当前总分:{{ totalMark }} 分</p>

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
          共{{ [list[item.id].list.length] }}题, 共{{ 30 }} 分
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
  </el-drawer>

  <el-button
    type="primary"
    style="
      position: absolute;
      top: 100px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    "
    @click="hOpen"
  >
    打开试题篮
  </el-button>
</template>
<script setup>
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

  const emit = defineEmits(['moveout'])

  const isShow = ref(false)
  const totalMark = ref(0)

  const listDetail = computed(() => {
    const res = []
    const t = ['single', 'multi', 'judge', 'answer', 'code']
    t.forEach((it) => {
      if (list.value[it].list.length > 0) {
        res.push({
          id: it,
          title: `${CONST_EX_TYPE[it]}(${list.value[it].list.length})`,
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
