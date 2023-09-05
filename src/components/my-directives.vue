<template>
  <el-form-item label="相关指令" prop="knowledges">
    <el-cascader
      v-model="knowledgeIDs"
      popper-class="last-check"
      :options="knowledges"
      clearable
      style="width: 500px"
      :show-all-levels="false"
      :props="{ emitPath: false, multiple: true, checkStrictly: true }"
    />
  </el-form-item>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: (number | string)[]
    subject: {
      value: number | string
      label: string
    }
  }>()
  const emit = defineEmits(['update:modelValue'])

  import { getList } from '@/api/directiveGroup'

  const knowledges = ref<Array<any>>([])
  const knowledgeIDs = ref<Array<any>>([])

  // watch(
  //   () => data.productGroupIDs,
  //   async (val) => {
  //     console.log('subjectID', val[0])
  //     const { data } = await getDirective({
  //       subjectID: val[0],
  //       withDirective: true,
  //     })
  //     directives.value = data.list.map((item) => {
  //       return {
  //         value: item.id,
  //         label: item.title,
  //         children: item.directives.map((item) => {
  //           return {
  //             value: item.id,
  //             label: item.title,
  //           }
  //         }),
  //       }
  //     })
  //   }
  // )

  const buildKnowledge = async (subjectID: number | string) => {
    // 获取对应的知识点
    const { data } = await getList({
      subjectID,
      withDirective: true,
    })

    const res = [
      {
        value: props.subject.value,
        label: props.subject.label,
        children: data.list.map((item) => {
          return {
            value: item.id,
            label: item.title,
            children: item.directives.map((item) => {
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

    knowledges.value = res
  }

  watch(
    () => props.subject.value,
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
