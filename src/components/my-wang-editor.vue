<template>
  <div class="wang-editor-container">
    <Toolbar
      :default-config="toolbarConfig"
      :editor="editorRef"
      style="border-bottom: 1px solid #e8e8e8"
    />
    <Editor
      :model-value="modelValue"
      class="wang-editor-content"
      :default-config="editorConfig"
      style="height: 300px"
      @on-created="handleCreated"
      @on-change="hChange"
      @on-blur="hBlur"
    />
  </div>
</template>

<script setup lang="ts">
  import '@wangeditor/editor/dist/css/style.css'
  import { IDomEditor, DomEditor, IToolbarConfig } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { fi } from 'element-plus/es/locale'

  const props = defineProps<{
    modelValue: string
  }>()

  const emit = defineEmits(['update:modelValue', 'blur'])

  defineOptions({
    name: 'WangEditor',
  })
  const $baseMessage: any = inject('$baseMessage')
  const $baseAlert: any = inject('$baseAlert')
  const editorRef = shallowRef<IDomEditor | undefined>(undefined)

  const html = ref('')

  // onMounted(() => {
  //   setTimeout(() => {
  //     html.value = props.modelValue
  //     setTimeout(() => {
  //       editorRef.value.insertText('')
  //     })
  //     // console.log('初始值', editorRef.value, props.modelValue, html.value)
  //   }, 100)
  // })

  const toolbarConfig = {
    // toolbarKeys: [
    //   // // 菜单 key
    //   // 'headerSelect',
    //   // // 分割线
    //   // '|',
    //   // // 菜单 key
    //   // 'bold',
    //   // ,
    //   // // 菜单组，包含多个菜单
    //   // {
    //   //   key: 'group-more-style', // 必填，要以 group 开头
    //   //   title: '更多样式', // 必填
    //   //   iconSvg: '<svg>....</svg>', // 可选
    //   //   menuKeys: ['through', 'code', 'clearStyle'], // 下级菜单 key ，必填
    //   // },
    //   // // 继续配置其他菜单...
    // ],
    excludeKeys: [
      'fontFamily',
      'italic',
      'group-more-style',
      /* 隐藏哪些菜单 */
    ],
  }

  const editorConfig = ref({
    mode: 'simple',
    placeholder: '请输入内容...',

    MENU_CONF: {
      uploadImage: {
        server: 'http://8.142.32.7:8888/file/upload-image', // 你的服务器地址，注意：当前接口格式特殊与其他vab接口不同，请查看vip文档
        fieldName: 'file',
        allowedFileTypes: ['image/*'],
        headers: {}, // 如需传递token请写到在这里
        customInsert(res, insertFn) {
          // TS 语法
          // customInsert(res, insertFn) {                  // JS 语法
          // res 即服务端的返回结果
          console.log(res)
          if (res.code === 0) {
            insertFn(res.data.url, 'alt', res.data.url)
          }

          // 从 res 中找到 url alt href ，然后插入图片
        },
      },
    },
  })

  const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor
    // setTimeout(() => {
    // const toolbar = DomEditor.getToolbar(editor)
    // console.log(editor, toolbar.getConfig())
    // })
  }
  onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
  })

  // const onSubmit = () => {
  //   $baseAlert(html.value)
  //   $baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
  // }

  const hChange = (editor: IDomEditor) => {
    emit('update:modelValue', editor.getHtml())
  }
  const hBlur = () => {
    emit('blur')
  }
</script>

<style scoped lang="scss">
  .wang-editor-container {
    padding: 0 !important;
    overflow: hidden !important;
    background: $base-color-background !important;
    border: 1px solid #ccc;

    &.w-e-full-screen-container {
      z-index: 9999 !important;
    }

    [classname='w-e-toolbar-init'] {
      border-bottom: 1px solid #e8e8e8 !important;
    }

    .wang-editor-content {
      height: 300px !important;

      background-color: #fff;
      border: 0;
    }

    .wang-editor-footer {
      width: 70%;
      margin: auto;
    }

    @media (width <= 576px) {
      .wang-editor-title,
      .wang-editor-content,
      .wang-editor-footer {
        width: 90%;
      }
    }
  }
</style>
