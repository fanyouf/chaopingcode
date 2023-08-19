<template>
  <section class="section">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="page-header" shadow="never">
          <slot name="header">默认标题</slot>
        </vab-card>
      </el-col>

      <el-col :lg="8" :md="8" :sm="8" :xl="6" :xs="24">
        <vab-card :body-style="{ padding: '0px' }" shadow="never">
          <div class="emptybox">
            <div class="empty" @click="emit('add-container')">
              <!-- <el-button type="primary" @click="hAdd()">+</el-button> -->
              <vab-icon icon="add-circle-line" />
              <p>{{ title }}</p>
            </div>
          </div>
        </vab-card>
      </el-col>
      <el-col
        v-for="item in list"
        :key="item.id"
        :lg="8"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <vab-card :body-style="{ padding: '0px' }" shadow="never">
          <template #header>
            <div v-if="hasOp" class="header-ops">
              <vab-icon
                class="icon"
                icon="add-box-line"
                @click="emit('add-item', item)"
              />
              <vab-icon
                class="icon"
                icon="edit-box-line"
                @click="emit('edit-container')"
              />
              <vab-icon
                class="icon"
                icon="delete-bin-line"
                @click="hDel(item)"
              />
            </div>
            <span>
              {{ item.title }}
              <el-badge
                class="badge"
                :value="item.children ? item.children.length : ''"
              />
            </span>
          </template>
          <slot :item="item">默认内容</slot>
        </vab-card>
      </el-col>
    </el-row>
  </section>
</template>
<script setup>
  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  defineProps({
    hasOp: {
      type: Boolean,
      default: true,
    },
    itemType: {
      type: String,
      default: '知识点',
    },
    title: {
      type: String,
      default: '添加知识点目录',
    },
    list: {
      type: Array,
      default: () => [],
    },
  })
  const emit = defineEmits([
    'add-container', // 外层 card-header表示的内容
    'del-container', //
    'add-item', // 外层 card-body表示的内容
    'edit-item',
    'del-item',
    'view',
  ])

  const hDel = (item) => {
    if (item.children.length) {
      $baseMessage('还有子项，不能删除', 'error', 'vab-hey-message-error')
      return
    }

    $baseConfirm('你确定要删除当前项吗', null, () => {
      emit('del-container')
    })
  }
</script>
<style lang="scss" scoped>
  .emptybox {
    min-height: 100px;
    display: flex;
    cursor: pointer;
  }
  .empty {
    margin: auto;
    text-align: center;
  }
  .section {
    background: $base-color-background !important;
    padding: 0;
  }
  .header-ops {
    float: right;
    .icon {
      color: #ccc;
      font-size: 20px;
      margin-left: 3px;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  .badge {
    top: 5px;
  }
</style>
