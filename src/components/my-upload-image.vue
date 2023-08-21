<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :show-file-list="false"
    :http-request="hUpload"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="modelValue" :src="modelValue" class="avatar" />
    <!-- <i  class="el-icon-plus "></i> -->
    <vab-icon v-else class="avatar-uploader-icon" icon="add-box-fill" />
  </el-upload>
</template>

<script setup lang="ts">
  import { upload } from '@/api/file'

  import { ElMessage } from 'element-plus'

  defineProps<{
    modelValue: string
  }>()
  const emit = defineEmits(['update:modelValue'])

  const hUpload = async (e) => {
    const file = e.file
    const data = new FormData()
    data.append('file', file)
    const res = await upload(data)
    console.log(res)
    emit('update:modelValue', res.data.url)
  }

  const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg'
    const isLt2M = file.size / 1024 / 1024 < 2

    if (!isJPG) {
      ElMessage.error('上传头像图片只能是 JPG 格式!')
    }
    if (!isLt2M) {
      ElMessage.error('上传头像图片大小不能超过 2MB!')
    }
    return isJPG && isLt2M
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
