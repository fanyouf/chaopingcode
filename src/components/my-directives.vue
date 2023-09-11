<template>
  <el-form-item label="相关指令" prop="directives">
    <el-cascader
      v-model="knowledgeIDs"
      popper-class="last-check"
      :options="directives"
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

  import { getList } from '@/api/directiveGroup'

  const directives = ref<Array<any>>([])
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
        value: props.subject.id,
        label: props.subject.title,
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

    directives.value = res
  }

  watch(
    () => props.subject.id,
    async (val) => {
      console.log('subject变化了', val)
      if (val) {
        buildKnowledge(val)
      } else {
        // 用户清空了选择项
        directives.value = []
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
