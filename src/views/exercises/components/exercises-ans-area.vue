<template>
  <div class="exerises-ans-area">
    <el-collapse @change="handleChange">
      <el-collapse-item
        v-for="(item, idx) in cAnsList"
        :key="item.code"
        :name="item.code"
      >
        <template #title>
          {{ String.fromCharCode(65 + idx) }}. {{ item.content }}
          <el-button
            v-if="multi"
            link
            style="margin-left: auto"
            type="danger"
            @click="hDel(idx)"
          >
            删除
          </el-button>
        </template>
        <my-wang-editor v-model="item.content" />
      </el-collapse-item>
    </el-collapse>

    <el-button v-if="multi" type="success" @click="hAdd">+</el-button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    multi: {
      type: Boolean,
      default: false,
    },
  })
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

  const cAnsList = computed(() => {
    if (props.multi) {
      return ansList.value
    } else {
      return ansList.value.slice(0, 4)
    }
  })

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
  .exerises-ans-area {
    width: 90%;
  }
  .exerises-ans-area >>> .el-collapse-item__arrow {
    order: -1;
    margin: 0;
  }
</style>
