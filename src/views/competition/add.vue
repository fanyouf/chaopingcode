<template>
  <section class="competition-add-container">
    <h3>{{ cTitle }}</h3>
    <el-form ref="formRef" label-width="66px" :model="data" :rules="rules">
      <el-form-item :label="state.objectName + '名称'" prop="name">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入"
        />
      </el-form-item>
      <el-form-item :label="state.objectName + '描述'" prop="intro">
        <el-input
          v-model="data.intro"
          style="width: 500px"
          aria-placeholder="请输入"
        />
      </el-form-item>
      <el-form-item :label="state.objectName + '图片'" prop="name">
        <my-upload-image v-model="data.logo" />
      </el-form-item>
      <el-form-item label="官网地址" prop="site">
        <el-input
          v-model="data.site"
          placeholder="官网地址"
          style="width: 500px"
        >
          <template #prepend>http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="显示排序" prop="order">
        <el-input-number v-model="data.order" :step="1" />
      </el-form-item>
      <el-form-item label="详细介绍" prop="remark">
        <my-wang-editor v-model="data.remark" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import CompetitionProps from './components/competition-props.vue'
  import {
    add as doAddCompetition,
    put as doEditCompetition,
    getList,
  } from '@/api/competition'
  import { gp } from '@gp'
  const route = useRoute()

  const bus = useEventBus<string>('news')

  const data = ref({
    // id: '',
    title: '测试标题', // 标题
    intro: '', // 介绍
    logo: '', //
    remark: '备注', // 备注
    type: '',
    order: 1,
    site: 'www.baidu.com',
    state: true, // boolean

    // summary: string
  })
  const cTitle = computed(() => {
    return route.params.id ? '修改赛事' : '添加赛事'
  })

  const init = async () => {
    // 判断是否有参数
    if (route.params.id) {
      // 当加载页面的时候就要获取参数的值了
      const res = await getList({ id: route.params.id })
      console.log(res)
      data.value = res.data
    }
  }
  onMounted(() => {
    init()
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)

  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })

  const doSave = async (data) => {
    await doAddCompetition(data)
    gp.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
    bus.emit()
  }
  const doEdit = async (data) => {
    await doEditCompetition(data)
    gp.$baseMessage('添加成功', 'success', 'vab-hey-message-success')
    bus.emit()
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        if (route.params.id) {
          await doEdit(data.value)
        } else {
          await doSave(data.value)
        }
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
        close()
      }
    })
  }
</script>

<style lang="scss" scoped>
  .competition-add-container {
    padding: 1em 0;
  }
</style>
