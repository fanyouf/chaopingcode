<template>
  <div class="step-form-container">
    <el-row :gutter="20">
      <el-col>
        <el-steps :active="active" align-center class="steps">
          <el-step description="填写试卷基本信息" title="第1步" />
          <el-step description="添加题目" title="第2步" />
          <el-step description="完成" title="第3步" />
        </el-steps>
        <step1 v-if="active === 0" @change-step="handleSetStep" />
        <step2
          v-if="active === 1"
          :info-data="form"
          @change-step="handleSetStep"
        />
        <step3
          v-if="active === 2"
          :info-data="form"
          @change-step="handleSetStep"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Step1 from './components/step1.vue'
  import Step2 from './components/step2.vue'
  import Step3 from './components/step3.vue'

  export default defineComponent({
    name: 'StepForm',
    components: { Step1, Step2, Step3 },
    setup() {
      const state = reactive({
        active: 0,
        form: {},
      })

      const handleSetStep = (active, form) => {
        state.active = active
        if (form) state.form = Object.assign(state.form, form)
      }

      return {
        ...toRefs(state),
        handleSetStep,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .step-form-container {
    :deep() {
      .el-steps {
        margin: $base-margin auto $base-margin * 2 auto;

        .el-step__title.is-process {
          color: var(--el-color-primary);
        }

        .el-step__description.is-process {
          color: var(--el-color-primary);
        }

        .el-step__head {
          &.is-process {
            color: var(--el-color-primary);
            border-color: var(--el-color-primary);

            .el-step__icon.is-text {
              color: var(--el-color-primary);
              background: var(--el-color-primary-light-9);
              border: 1px solid;
            }

            .el-step__line {
              height: 1px;
            }
          }

          &.is-wait {
            .el-step__icon.is-text {
              border: 1px solid;
            }

            .el-step__line {
              height: 1px;
            }
          }

          &.is-finish {
            .el-step__icon.is-text {
              color: var(--el-color-white);
              background: var(--el-color-primary);
            }

            .el-step__line {
              height: 1px;
              background: var(--el-color-primary);
            }
          }
        }
      }
    }
  }
</style>
