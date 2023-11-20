<template>
  <div class="body" :style="height">
    <vab-icon
      class="btn"
      style=""
      :title="isExpend ? '收起' : '展开'"
      :icon="isExpend ? 'align-top' : 'align-bottom'"
      @click="isExpend = !isExpend"
    />
    <!-- <vab-icon icon="align-bottom" /> -->
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  const isExpend = ref(false)
  const height = computed(() => {
    return isExpend.value
      ? { height: 'auto' }
      : { height: '90px', overflow: 'hidden' }
  })
</script>
<style scoped lang="scss">
  .body {
    height: 90px;
    padding-left: 20px;
    position: relative;
  }
  .body:hover {
    .btn {
      display: block;
    }
  }
  .btn {
    cursor: pointer;
    display: none;
    position: absolute;
    left: 50%;
    font-size: 50px;
    top: 50%;
  }
</style>
