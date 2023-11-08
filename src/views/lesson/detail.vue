<template>
  <div>
    课程详情 {{ $route.params.id }}
    !todo
  </div>
</template>

<script setup>
  import { getList } from '@/api/lessonGroup'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  defineOptions({
    name: 'CourseDetail',
  })
  onMounted(async () => {
    const res = await getList({ id: route.query.id })
    console.log(res.data)
    data.value = res.data
  })
</script>
