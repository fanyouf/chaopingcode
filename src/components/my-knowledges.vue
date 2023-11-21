<template>
  <el-form-item label="核心知识点:" prop="knowledges">
    <el-cascader
      v-model="knowledgeIDs"
      popper-class="last-check"
      :options="knowledges"
      clearable
      style="width: 500px"
      :show-all-levels="false"
      :props="{ emitPath: false, multiple: true }"
    />
  </el-form-item>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: (number | string)[]
    subject: {
      id: number | string
      title: string
    }
  }>()
  const emit = defineEmits(['update:modelValue'])

  import { getList as getKnowledge } from '@/api/knowledgeGroup'

  const knowledges = ref<Array<any>>([])
  const knowledgeIDs = ref<Array<any>>([])

  const buildKnowledge = async (subjectID: number | string) => {
    // 获取对应的知识点
    const { data } = await getKnowledge({
      subjectID,
      withKnowledge: true,
    })

    const res = data.list.map((item) => {
      return {
        value: item.id,
        label: item.title,
        children: item.knowledge.map((item) => {
          return {
            value: item.id,
            label: item.title,
          }
        }),
      }
    })

    console.log(res)

    knowledges.value = res
  }

  watch(
    () => props.subject.id,
    async (val) => {
      console.log('subject变化了', val)
      if (val) {
        buildKnowledge(val)
      } else {
        // 用户清空了选择项
        knowledges.value = []
      }
    }
  )
  watch(
    () => props.modelValue,
    () => {
      knowledgeIDs.value = props.modelValue
    }
  )
  watch(knowledgeIDs, () => {
    emit('update:modelValue', knowledgeIDs.value)
  })
</script>

<style lang="scss">
  .last-check {
    li[aria-haspopup='true'] {
      .el-checkbox {
        display: none;
      }
    }
  }
</style>
