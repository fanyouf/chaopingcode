<template>
  <el-form-item label="相关作品" prop="works">
    <el-cascader
      v-model="knowledgeIDs"
      popper-class="last-check"
      :options="works"
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

  import { getList as getWork } from '@/api/workCate'
  // /productGroup?subjectID=3&withProduct=true

  const works = ref<Array<any>>([])
  const knowledgeIDs = ref<Array<any>>([])

  const buildWork = async (subjectID: number | string) => {
    // 获取对应的作品
    const { data } = await getWork({
      subjectID,
      withProduct: true,
    })

    const res = [
      {
        value: props.subject.id,
        label: props.subject.title,
        children: data.list.map((item) => {
          return {
            value: item.id,
            label: item.title,
            children: item.products.map((item) => {
              return {
                value: item.id,
                label: item.title,
              }
            }),
          }
        }),
      },
    ]

    console.log(res)

    works.value = res
  }

  watch(
    () => props.subject.id,
    async (val) => {
      console.log('subject变化了', val)
      if (val) {
        buildWork(val)
      } else {
        // 用户清空了选择项
        works.value = []
      }
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
