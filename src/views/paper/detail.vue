<template>
  <section v-if="data">
    <div class="logo">超平的编程课{{ $route.query.id }}</div>
    <header>
      <h3 class="name">{{ data.title }}</h3>
      <ul class="brief">
        <li>考试时间:{{ data.duration }}</li>
        <li>总分:{{ 100 }}分</li>
        <li>考试时长: {{ data.duration }}分钟</li>
        <li>考试类型: {{ data.paperType.title }}</li>
      </ul>
      <div>{{ data.intro }}</div>
    </header>
    <div class="container">
      <div class="sidebar">
        <h4>试题分布</h4>
        <div v-for="(item, idx) in birefInfo" :key="idx" class="m1">
          <div>
            {{ idx + 1 }}、{{ item.title }}（共{{ item.num }}题，共{{
              item.score
            }}分）
          </div>
          <ul class="items">
            <li v-for="i in item.num" :key="i" class="item">{{ i }}</li>
          </ul>
        </div>
      </div>
      <div v-if="data.paperQuestionGroups" class="main">
        <div
          v-for="(item, idx) in data.paperQuestionGroups"
          :key="idx"
          class="subjects"
        >
          <div
            v-for="it in item.paperQuestions"
            :key="it.questionID"
            class="subject"
          >
            <div v-if="it.question.type === 'single' || 'multi'">
              <div class="sub-title">
                {{ it.no }} {{ it.question.intro }}-{{ it.question.title }}
              </div>
              <div v-html="it.question.contentSelect.body"></div>
              <div class="options">
                A.
                <div v-html="it.question.contentSelect.optionA"></div>
                B.
                <div v-html="it.question.contentSelect.optionB"></div>
                C.
                <div v-html="it.question.contentSelect.optionC"></div>
                D.
                <div v-html="it.question.contentSelect.optionD"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { getList } from '@/api/paper'
  const route = useRoute()

  const data = ref(null)
  const birefInfo = computed(() => {
    if (data.value) {
      return Object.values(data.value.paperQuestionGroups).map((it) => {
        const arr = it.paperQuestions
        return {
          title: it.title,
          num: arr.length,
          score: arr.reduce((acc, cur) => {
            return acc + cur.score
          }, 0),
        }
      })
    }
    return []
  })

  onMounted(async () => {
    const res = await getList({ id: route.query.id })
    console.log(res.data)
    data.value = res.data
  })
</script>

<style scoped>
  section {
    width: 90%;
    margin: auto;
  }
  .logo {
    line-height: 50px;
    height: 50px;
    padding-left: 2em;
    background-color: #fff;
    margin-bottom: 1em;
  }
  header {
    padding: 1em 4em;
    background-color: #fff;
    margin-bottom: 1em;

    .name {
      text-align: center;
    }
    .brief {
      display: flex;
      justify-content: space-around;
    }
  }
  .container {
    display: flex;
    .sidebar {
      width: 230px;
      padding: 1em;

      background-color: #fff;
      margin-right: 1em;

      .items {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #ccc;
          margin-right: 10px;
          margin-top: 1em;
        }
      }
    }
    .main {
      flex: 1;
      padding: 1em;
      background-color: #fff;
    }
  }
</style>
