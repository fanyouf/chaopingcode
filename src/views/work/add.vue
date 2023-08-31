<template>
  <section class="competition-add-container">
    <h3>添加作品</h3>
    <el-form ref="formRef" label-width="80px" :model="data" :rules="rules">
      <el-form-item label="作品名称" prop="title">
        <el-input
          v-model="data.title"
          style="width: 500px"
          aria-placeholder="请输入作品名称"
        />
      </el-form-item>
      <el-form-item label="作品编号" prop="code">
        <el-input
          v-model="data.no"
          style="width: 500px"
          aria-placeholder="请输入作品统一编号"
        />
      </el-form-item>

      <el-form-item label="科目与分类" prop="productGroupIDs">
        <el-cascader
          v-model="data.productGroupIDs"
          :options="courseAndWorkgroup"
          :props="{ multiple: true, checkStrictly: true }"
          clearable
          style="width: 500px"
        />
      </el-form-item>

      <el-form-item label="作品简介" prop="intro">
        <el-input
          v-model="data.intro"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入作品简介"
        />
      </el-form-item>
      <el-form-item label="作品亮点" prop="highlight">
        <el-input
          v-model="data.highlight"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入作品亮点"
        />
      </el-form-item>
      <el-form-item label="作品图片" prop="intro">
        <my-upload-image v-model="data.cover" />
      </el-form-item>

      <el-form-item label="基础代码" prop="codeBaseUrl">
        <my-upload-file v-model="data.codeBasic" />
      </el-form-item>
      <el-form-item label="参考代码" prop="codeFinishedUrl">
        <my-upload-file v-model="data.codeReference" />
      </el-form-item>

      <el-form-item label="代码行数" prop="codeRowNum">
        <el-input
          v-model.number="data.codeLineNum"
          style="width: 100px"
          type="number"
        />
      </el-form-item>

      <el-form-item label="效果演示" prop="netpage">
        <el-input
          v-model="data.demoAddress"
          placeholder="请效果演示的地址"
          style="width: 500px"
        >
          <template #prepend>Http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="相关知识点" prop="knowledges">
        <my-input-dialog
          v-model="data.knowledgeIDs"
          name="知识"
          getapiname="name"
          :getapi="getKnowledge"
          :columns="[
            { label: '知识点名称', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
      </el-form-item>

      <el-form-item label="相关指令" prop="directives">
        <my-input-dialog
          v-model="data.directiveIDs"
          name="指令"
          getapiname="name"
          :getapi="getDirective"
          :columns="[
            { label: '指令名称', prop: 'name', width: 120 },
            { label: 'title', prop: 'title' },
          ]"
        />
      </el-form-item>

      <el-form-item label="涉及学科" prop="subject">
        <el-checkbox-group v-model="data.courses">
          <el-checkbox
            v-for="item in SUBJECT"
            :key="item.value"
            :label="item.value"
            name="type"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="习题难度" prop="diff">
        <el-radio-group v-model="data.level">
          <el-radio label="easy">简单</el-radio>
          <el-radio label="medium">中等</el-radio>
          <el-radio label="hard">困难</el-radio>
          <el-radio label="challenge">挑战</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="注意事项" prop="subjectContent">
        <ExercisesInput v-model="data.note" />
      </el-form-item>

      <el-form-item label="作品备注" prop="remark">
        <el-input
          v-model="data.remark"
          type="textarea"
          style="width: 500px"
          aria-placeholder="请输入作品备注"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确 定</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup lang="ts">
  import ExercisesInput from './components/exercises-input.vue'
  import ExercisesKnowledges from './components/exercises-knowledges.vue'
  import { add as doAddWork } from '@/api/work'
  const $baseMessage = inject('$baseMessage')
  import { getList } from '@/api/workCate'
  import { getList as getKnowledge } from '@/api/knowledge'
  import { getList as getDirective } from '@/api/directive'
  import { getList as getCourseAndWorkgroup } from '@/api/course'
  import { SUBJECT } from '@/constant'

  const courseAndWorkgroup = ref([])

  onMounted(async () => {
    const { data } = await getCourseAndWorkgroup({ withProductGroup: true })
    console.log('xxxx', data.list)

    courseAndWorkgroup.value = data.list.map((item) => {
      return {
        value: item.id,
        label: item.title,
        children: item.productGroups.map((item) => {
          return {
            value: item.id,
            label: item.title,
          }
        }),
      }
    })
  })

  const emit = defineEmits(['fetch-data'])

  onMounted(async () => {
    const res = await getList({ withProduct: true })
    console.log(res)
  })

  // const options = [
  //   {
  //     value: 'zhinan',
  //     label: '指南',
  //     children: [
  //       {
  //         value: 'shejiyuanze',
  //         label: '设计原则',
  //         children: [
  //           {
  //             value: 'yizhi',
  //             label: '一致',
  //           },
  //           {
  //             value: 'fankui',
  //             label: '反馈',
  //           },
  //           {
  //             value: 'xiaolv',
  //             label: '效率',
  //           },
  //           {
  //             value: 'kekong',
  //             label: '可控',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'daohang',
  //         label: '导航',
  //         children: [
  //           {
  //             value: 'cexiangdaohang',
  //             label: '侧向导航',
  //           },
  //           {
  //             value: 'dingbudaohang',
  //             label: '顶部导航',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'zujian',
  //     label: '组件',
  //     children: [
  //       {
  //         value: 'basic',
  //         label: 'Basic',
  //         children: [
  //           {
  //             value: 'layout',
  //             label: 'Layout 布局',
  //           },
  //           {
  //             value: 'color',
  //             label: 'Color 色彩',
  //           },
  //           {
  //             value: 'typography',
  //             label: 'Typography 字体',
  //           },
  //           {
  //             value: 'icon',
  //             label: 'Icon 图标',
  //           },
  //           {
  //             value: 'button',
  //             label: 'Button 按钮',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'form',
  //         label: 'Form',
  //         children: [
  //           {
  //             value: 'radio',
  //             label: 'Radio 单选框',
  //           },
  //           {
  //             value: 'checkbox',
  //             label: 'Checkbox 多选框',
  //           },
  //           {
  //             value: 'input',
  //             label: 'Input 输入框',
  //           },
  //           {
  //             value: 'input-number',
  //             label: 'InputNumber 计数器',
  //           },
  //           {
  //             value: 'select',
  //             label: 'Select 选择器',
  //           },
  //           {
  //             value: 'cascader',
  //             label: 'Cascader 级联选择器',
  //           },
  //           {
  //             value: 'switch',
  //             label: 'Switch 开关',
  //           },
  //           {
  //             value: 'slider',
  //             label: 'Slider 滑块',
  //           },
  //           {
  //             value: 'time-picker',
  //             label: 'TimePicker 时间选择器',
  //           },
  //           {
  //             value: 'date-picker',
  //             label: 'DatePicker 日期选择器',
  //           },
  //           {
  //             value: 'datetime-picker',
  //             label: 'DateTimePicker 日期时间选择器',
  //           },
  //           {
  //             value: 'upload',
  //             label: 'Upload 上传',
  //           },
  //           {
  //             value: 'rate',
  //             label: 'Rate 评分',
  //           },
  //           {
  //             value: 'form',
  //             label: 'Form 表单',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'data',
  //         label: 'Data',
  //         children: [
  //           {
  //             value: 'table',
  //             label: 'Table 表格',
  //           },
  //           {
  //             value: 'tag',
  //             label: 'Tag 标签',
  //           },
  //           {
  //             value: 'progress',
  //             label: 'Progress 进度条',
  //           },
  //           {
  //             value: 'tree',
  //             label: 'Tree 树形控件',
  //           },
  //           {
  //             value: 'pagination',
  //             label: 'Pagination 分页',
  //           },
  //           {
  //             value: 'badge',
  //             label: 'Badge 标记',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'notice',
  //         label: 'Notice',
  //         children: [
  //           {
  //             value: 'alert',
  //             label: 'Alert 警告',
  //           },
  //           {
  //             value: 'loading',
  //             label: 'Loading 加载',
  //           },
  //           {
  //             value: 'message',
  //             label: 'Message 消息提示',
  //           },
  //           {
  //             value: 'message-box',
  //             label: 'MessageBox 弹框',
  //           },
  //           {
  //             value: 'notification',
  //             label: 'Notification 通知',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'navigation',
  //         label: 'Navigation',
  //         children: [
  //           {
  //             value: 'menu',
  //             label: 'NavMenu 导航菜单',
  //           },
  //           {
  //             value: 'tabs',
  //             label: 'Tabs 标签页',
  //           },
  //           {
  //             value: 'breadcrumb',
  //             label: 'Breadcrumb 面包屑',
  //           },
  //           {
  //             value: 'dropdown',
  //             label: 'Dropdown 下拉菜单',
  //           },
  //           {
  //             value: 'steps',
  //             label: 'Steps 步骤条',
  //           },
  //         ],
  //       },
  //       {
  //         value: 'others',
  //         label: 'Others',
  //         children: [
  //           {
  //             value: 'dialog',
  //             label: 'Dialog 对话框',
  //           },
  //           {
  //             value: 'tooltip',
  //             label: 'Tooltip 文字提示',
  //           },
  //           {
  //             value: 'popover',
  //             label: 'Popover 弹出框',
  //           },
  //           {
  //             value: 'card',
  //             label: 'Card 卡片',
  //           },
  //           {
  //             value: 'carousel',
  //             label: 'Carousel 走马灯',
  //           },
  //           {
  //             value: 'collapse',
  //             label: 'Collapse 折叠面板',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'ziyuan',
  //     label: '资源',
  //     children: [
  //       {
  //         value: 'axure',
  //         label: 'Axure Components',
  //       },
  //       {
  //         value: 'sketch',
  //         label: 'Sketch Templates',
  //       },
  //       {
  //         value: 'jiaohu',
  //         label: '组件交互文档',
  //       },
  //     ],
  //   },
  // ]

  const data = reactive({
    // id: '',
    title: '飞机大战', // 标题
    no: 'xz001', // 作品编号
    intro: '用100个积木块实现一个飞机大战的游戏', // 作品介绍
    highlight: '游戏非常的好玩~~', // 作品亮点
    cate: '1', // 作品分类
    cover: '', // 作品图片
    codeBasic: '1', // 作品基础代码
    codeReference: '1', // 作品完成代码
    codeLineNum: 10, // 代码行数
    demoAddress: 'www.baidu.com', // 效果演示地址
    productGroupIDs: [],
    knowledgeIDs: [], // 知识点
    subjectIDs: [], // 科目
    directiveIDs: [], // 相关指令
    courses: ['mathematics'], // 学科
    order: 1,
    level: 'medium', // 难度
    note: '1', // 注意事项
    remark: '备注', // 备注
  })

  const rules = {
    title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  }
  const formRef = ref(null)
  const visible = ref(false)
  const state = reactive<{ opName: OPType; objectName: OPObject }>({
    opName: '添加', // 操作方式的名字： 编辑 or 添加
    objectName: '赛事', // 操作对象的类型: 目录 or 知识点
  })
  const cTitle = computed(() => {
    return `${state.objectName}-${state.opName}`
  })
  const showDialog = (
    objectName: OPObject = '目录',
    opName: OPType = '添加',
    row = null
  ) => {
    state.objectName = objectName
    state.opName = opName
    if (row) {
      // data.id = row.id
      data.order = row.order || 1
      data.title = row.title
    }

    if (opName === '添加') {
      data.title = ''
    }

    visible.value = true
  }
  const close = () => {
    formRef.value.resetFields()
    visible.value = false
  }
  const doSave = async () => {
    const d = {
      ...data,
      courses: data.courses.join(','),
      productGroupIDs: data.productGroupIDs.map((it) => it.pop()),
      directiveIDs: data.directiveIDs.map((it) => it.id),
      knowledgeIDs: data.knowledgeIDs.map((it) => it.id),
    }
    console.log(d)
    debugger

    await doAddWork(d)
    $baseMessage('添加成功', 'success', 'vab-hey-message-success')
    emit('fetch-data')
  }
  const save = () => {
    formRef.value.validate(async (valid) => {
      if (valid) {
        await doSave()
        // $baseMessage(msg, 'success', 'vab-hey-message-success')
        // emit('fetch-data')
        close()
      }
    })
  }

  defineExpose({ showDialog })
</script>

<style lang="scss" scoped>
  footer {
    // padding-left: 66px;
  }
  .competition-add-container {
    padding: 1em 0;
  }
</style>
