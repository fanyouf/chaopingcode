<template>
  <section class="section">
    <vab-card class="page-header" shadow="never">
      <!-- <my-radio
            v-model="formData.subjectId"
            label="所属科目"
            :list="subjectList"
          /> -->
      <my-radio-subject v-model="formData.subject" />

      <my-radio-competition v-model="formData.subject" />

      <my-radio
        v-model="formData.courses"
        label="题目类型"
        :list="[
          { id: null, title: '全部' },
          // 'single' | 'multiple' | 'judge' | 'answer' | 'code'
          {
            id: 'single',
            title: '单选题',
          },
          {
            id: 'multiple',
            title: '多选题',
          },
          {
            id: 'judge',
            title: '判断题',
          },
          {
            id: 'answer',
            title: '简答题',
          },
          {
            id: 'code',
            title: '代码题',
          },
        ]"
      />
      <el-divider>
        <i class="el-icon-mobile-phone"></i>
        <button @click="toggle">更多</button>
      </el-divider>

      <div v-show="isShowMore">
        <div class="m1">
          <label for="">关键字:</label>
          <el-input v-model="formData.keyword" style="width: 200px" />
          &nbsp; &nbsp; 难度:
          <el-select v-model="formData.level" style="width: 100px">
            <el-option label="全部" :value="null">全部</el-option>
            <el-option label="简单" value="easy">简单</el-option>
            <el-option label="中等" value="medium">中等</el-option>
            <el-option label="困难" value="hard">困难</el-option>
            <el-option label="挑战" value="challenge">挑战</el-option>
          </el-select>
        </div>
        <my-knowledges :subject="formData.subject" />
        <my-directives :subject="formData.subject" />
      </div>
      <el-button type="success" @click="search">搜索</el-button>
    </vab-card>

    <paperCart
      :cart-list="cartList"
      :subject="formData.subject"
      @moveout="hMoveout"
    />
    <vab-card
      v-for="item in exerciseList"
      :key="item.id"
      class="section-item"
      :body-style="{ padding: '0px' }"
      shadow="never"
    >
      <div class="header flex">
        <h3>{{ item.title }}</h3>
        <label>
          <el-tag size="small" type="success">
            {{ CONST_LEVEL[item.level] }}
          </el-tag>
          <el-tag size="small" type="warning">
            {{ CONST_EX_TYPE[item.type] }}
          </el-tag>
        </label>
      </div>

      <div
        v-if="item.type === 'single' || item.type === 'multi'"
        class="section-item-body"
      >
        <div v-html="item.contentSelect.body"></div>
        <div v-for="i in item.contentSelect.optionLen" :key="i">
          {{ String.fromCharCode(64 + i) }}.
          <div
            v-html="item.contentSelect['option' + String.fromCharCode(64 + i)]"
          ></div>
        </div>
        <div>
          <label>答案</label>
          {{ getSelectOptionCode(item.contentSelect.answer) }}
        </div>
      </div>
      <div v-if="item.type === 'answer'" class="section-item-body">
        <div v-html="item.contentAnswer.body"></div>
        <el-collapse>
          <el-collapse-item title="答案" name="1">
            <div>
              {{ item.contentAnswer.ans }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div v-if="item.type === 'judge'" class="section-item-body">
        <div v-html="item.contentJudge.body"></div>
      </div>
      <div class="m1">
        <!-- <el-button icon="del" type="primary" @click="hEdit(item.id)">
          修改
        </el-button> -->
        <el-button
          size="small"
          :icon="Delete"
          type="danger"
          @click="hDel(item.id)"
        />
        <!-- <el-button type="danger" >删除</el-button> -->
        <el-button
          v-if="!item.inCart"
          size="small"
          type="primary"
          @click="hAddtoCart(item)"
        >
          加试题篮
        </el-button>
        <el-button v-else type="success" @click="hRemoveFromCart(item)">
          移出试题篮
        </el-button>
      </div>
    </vab-card>
  </section>
</template>
<script setup lang="ts">
  import { Delete } from '@element-plus/icons-vue'
  import paperCart from './components/paper-cart.vue'
  import { getSelectOptionCode } from '@/utils'
  import { CONST_EX_TYPE, CONST_LEVEL } from '~/src/constant'
  import { getList as getExerciseList, doDelete } from '@/api/exercise'
  import { gp } from '@gp'
  import MyRadio from '~/src/components/my-radio.vue'
  import MyKnowledges from '~/src/components/my-knowledges.vue'

  const formData = reactive({
    subject: { id: null, title: '' },
    productGroupID: null,
    courses: null, // 默认学科是 全部 。表示不用传过去
    level: 'medium',
    keyword: '', // 关键字
  })
  const isShowMore = ref(false)
  const toggle = () => {
    isShowMore.value = !isShowMore.value
  }
  const cartList = ref([])
  // 添加到试题篮
  const hAddtoCart = (item) => {
    item.inCart = true
    cartList.value.push(item)
  }
  const hMoveout = (it) => {
    const item = exerciseList.value.find((i) => i.id === it.id)
    item.inCart = false

    const idx = cartList.value.find((i) => i.id === it.id)
    cartList.value.splice(idx, 1)
  }
  const hRemoveFromCart = (item) => {
    item.inCart = false
    cartList.value.splice(cartList.value.indexOf(item), 1)
  }

  onMounted(() => {
    search()
  })

  const search = async () => {
    // 查询条件
    const d = {}
    const { data } = await getExerciseList(d)
    exerciseList.value = data.list
  }
  // const hDel = (id) => {
  //   gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
  //     await delWork(id)
  //     gp.$baseMessage('删除成功')
  //     search()
  //   })
  // }
  const subjectList = ref<Subject[]>([])
  const exerciseList = ref<Work[]>([])

  const hDel = (id) => {
    gp.$baseConfirm('你确定要删除当前项吗', null, async () => {
      // emit('del-container', item)
      await doDelete(id)
      gp.$baseMessage('删除成功', 'success')
      search()
    })
  }
</script>
<style lang="scss" scoped>
  .section {
    background-color: #f6f8f9;
  }
  .section-item {
    padding: 1em;
    border: none !important;
  }
  .header {
    display: flex;
    align-items: center;
  }
</style>
