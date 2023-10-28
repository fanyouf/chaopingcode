<template>
  <div>
    <el-upload
      :accept="accept"
      action="#"
      :show-file-list="true"
      :file-list="fileList"
      :multiple="false"
      :http-request="hUpload"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload"
      :before-remove="beforeRemove"
    >
      <el-button :disabled="!!fileList.length" size="small" type="primary">
        点击上传{{ fileList.length }}
      </el-button>

      <template #tip>
        <div class="el-upload__tip">
          {{ tip }}
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
  import { uploadFile as upload } from '@/api/file'

  import { ElMessage } from 'element-plus'

  defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    accept: {
      type: String,
      default: '.py,.sb3,.cpp',
    },
    tip: {
      type: String,
      default: '只能上传 .sb3, .cpp, .py 文件，且不超过 2M',
    },
  })

  const emit = defineEmits(['update:modelValue'])

  const handleChange = (file, fl) => {
    fileList.value = fl
  }

  const beforeRemove = (file, fl) => {
    fileList.value = fl
    emit('update:modelValue', '')
    return true
  }

  const fileList = ref([])
  const hUpload = async (e) => {
    console.log('hUpload....')

    const file = e.file
    const data = new FormData()
    data.append('file', file)
    const res = await upload(data)
    emit('update:modelValue', res.data.url)
  }

  const beforeAvatarUpload = (file) => {
    // const isJPG = file.type === 'image/jpeg'
    const issb3 = file.name.endsWith('.sb3')
    const ispy = file.name.endsWith('.py')
    const iscpp = file.name.endsWith('.cpp')

    const isLt2M = file.size / 1024 / 1024 < 2

    if (!issb3 && !ispy && !iscpp) {
      ElMessage.error('上传文件只能是.py, .sb3, .cpp 格式!')
      return
    }
    if (!isLt2M) {
      ElMessage.error('上传文件大小不能超过 2MB!')
    }
    return (issb3 || iscpp || ispy) && isLt2M
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
