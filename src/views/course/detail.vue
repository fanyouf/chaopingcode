<template>
  <div class="container">
    课程详情 {{ $route.query.id }}
    <p>
      <label for="">课程名称：</label>
      {{ data.title }}
    </p>
    <p>
      课程介绍：
      {{ data.intro }}
    </p>
    <p>教学单元：</p>
    <ol>
      <li v-for="(item, idx) in data.lessons" :key="item.id">
        {{ idx + 1 }}. {{ item.title }}
      </li>
    </ol>
  </div>
</template>

<script setup>
  import { getList } from '@/api/lessonGroup'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const data = ref({})
  defineOptions({
    name: 'CourseDetail',
  })
  onMounted(async () => {
    const res = await getList({ id: route.query.id, withLessons: true })
    console.log(res.data)
    data.value = res.data
  })
</script>
<style scoped>
  .container {
    padding: 1em;
  }
</style>
