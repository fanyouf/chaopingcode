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
        <div>一、单选题（共5题，共50分）</div>
        <ul class="items">
          <li class="item">1</li>
          <li class="item">2</li>
          <li class="item">3</li>
          <li class="item">3</li>
          <li class="item">3</li>
          <li class="item">3</li>
          <li class="item">3</li>
        </ul>
      </div>
      <div class="main">
        <div class="subject">
          <div class="sub-title">题目说明</div>
          <div class="sub-title">题干</div>
          <div>选项</div>
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
