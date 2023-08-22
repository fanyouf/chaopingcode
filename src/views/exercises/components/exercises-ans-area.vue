<template>
  <div class="exerises-ans-area">
    <el-collapse @change="handleChange">
      <el-collapse-item
        v-for="(item, idx) in ansList"
        :key="item.code"
        :name="item.code"
      >
        <template #title>
          {{ String.fromCharCode(65 + idx) }}
          <el-button style="margin-left: auto" @click="hDel(idx)">
            del
          </el-button>
        </template>
        <my-wang-editor v-model="item.content" />
      </el-collapse-item>
    </el-collapse>

    <el-button type="success" @click="hAdd">新增选项</el-button>
  </div>
</template>

<script setup lang="ts">
  const handleChange = (val) => {
    console.log(val)
  }
  const ansList = ref([
    {
      code: 'A',
      content: '123',
    },
    {
      code: 'B',
      content: '123',
    },
    {
      code: 'C',
      content: '123',
    },
    {
      code: 'D',
      content: '123',
    },
  ])

  const hAdd = () => {
    ansList.value.push({
      code: String.fromCharCode(65 + ansList.value.length),
      content: '',
    })
  }
  const hDel = (idx) => {
    ansList.value.splice(idx, 1)
  }
</script>

<style scoped>
  .exerises-ans-area >>> .el-collapse-item__arrow {
    order: -1;
    margin: 0;
  }
</style>
