<template>
  <div>
    <el-upload
      ref="refUpload"
      accept=".jpg,.png,.gif,.jpeg"
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :http-request="hUpload"
      :auto-upload="false"
      :on-change="uploadChange"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="modelValue" :src="modelValue" class="avatar" />
      <vab-icon v-else class="avatar-uploader-icon" icon="add-box-fill" />
    </el-upload>
    <el-dialog v-model="showCopper" title="图片裁剪" append-to-body>
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        preview=".preview"
        :output-type="option.outputType"
        :info="option.infoTrue"
        :full="option.full"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :fixed="option.fixed"
        :fixed-number="option.fixedNumber"
        :center-box="option.centerBox"
        :info-true="option.infoTrue"
        :fixed-box="option.fixedBox"
      />
      <template #footer>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { upload } from '@/api/file'
  import VueCropper from 'vue-cropperjs'
  import 'cropperjs/dist/cropper.css'

  import { ElMessage } from 'element-plus'

  defineProps<{
    modelValue: string
  }>()
  const option = {
    info: true, // 裁剪框的大小信息
    outputSize: 0.8, // 裁剪生成图片的质量
    outputType: 'jpeg', // 裁剪生成图片的格式
    canScale: false, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    // autoCropWidth: 300, // 默认生成截图框宽度
    // autoCropHeight: 200, // 默认生成截图框高度
    fixedBox: false, // 固定截图框大小 不允许改变
    fixed: true, // 是否开启截图框宽高固定比例
    fixedNumber: [1, 1.5], // 截图框的宽高比例
    full: true, // 是否输出原图比例的截图
    canMoveBox: true, // 截图框能否拖动
    original: false, // 上传图片按照原始比例渲染
    centerBox: true, // 截图框是否被限制在图片里面
    infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
    canMove: true,
  }
  const emit = defineEmits(['update:modelValue'])
  const showCopper = ref(false)
  const cropper = ref(null)
  const imgSrc = ref<string | ArrayBuffer>('')
  const refUpload = ref(null)
  const uploadFile = ref('')

  const uploadChange = (file) => {
    if (file.status !== 'ready') return
    console.log('uploadChange....', file)
    const url = file.raw
    const reader = new FileReader()
    reader.onload = (event) => {
      imgSrc.value = event.target.result
      cropper.value.replace(event.target.result)
    }
    reader.readAsDataURL(url)
    showCopper.value = true
  }
  const confirmFn = () => {
    console.log('confirmFn....')

    cropper.value.getCroppedCanvas().toBlob((blob) => {
      uploadFile.value = blob
      refUpload.value.submit()
      showCopper.value = false
    })
  }

  const hUpload = async (e) => {
    console.log('hUpload....')

    // const { filename } = e

    // const formData = new FormData()

    // const file = e.file
    const data = new FormData()
    data.append('file', uploadFile.value)
    // data.append('file', file)
    const res = await upload(data)
    console.log(res)
    emit('update:modelValue', res.data.url)
  }

  const beforeAvatarUpload = (file) => {
    const type = file.name.split('.').pop()

    const isLt2M = file.size / 1024 / 1024 < 2

    if (!['png', 'jpg', 'jpeg', 'gif'].includes(type)) {
      ElMessage.error('上传头像图片只能是 JPG PNG JPEG 格式!')
      return false
    }
    if (!isLt2M) {
      ElMessage.error('上传头像图片大小不能超过 2MB!')
      return false
    }
    return true
  }
</script>
<style scoped>
  .avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader >>> .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 32px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>
