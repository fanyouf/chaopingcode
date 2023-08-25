<template>
  <section class="section">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="page-header" shadow="never">
          <slot name="header">默认标题</slot>
        </vab-card>
      </el-col>

      <el-col
        v-for="item in list"
        :key="item.id"
        :lg="6"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <vab-card
          class="section-item"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <template #header>
            <div>
              <div v-if="hasOpTop" style="float: right" class="header-ops">
                <vab-icon
                  v-if="opNames.includes('add')"
                  class="icon"
                  icon="add-box-fill"
                  style="color: rgb(54, 203, 203)"
                  @click="emit('add-item', item)"
                />
                <vab-icon
                  v-if="opNames.includes('edit')"
                  class="icon"
                  icon="edit-box-fill"
                  style="color: rgb(151, 95, 229)"
                  @click="emit('edit-container', item)"
                />
                <vab-icon
                  v-if="opNames.includes('view')"
                  class="icon"
                  icon="eye-fill"
                  style="color: rgb(251, 212, 55)"
                  @click="emit('view-container', item)"
                />
                <vab-icon
                  v-if="opNames.includes('del')"
                  icon="delete-bin-5-line"
                  style="color: rgb(24, 144, 255)"
                  class="icon"
                  @click="hDel(item)"
                />
              </div>
              <h3 class="section-item-title">
                {{ item.title }}
                <el-badge
                  class="badge"
                  :value="item.children ? item.children.length : ''"
                />
              </h3>
            </div>
          </template>
          <slot :item="item">
            <div class="section-item-body">
              <img
                v-if="item.logo"
                style="width: 100%; height: 186px"
                :src="item.logo"
              />
              <img
                v-if="item.image"
                style="width: 100%; height: 186px"
                :src="item.image"
              />
              <p class="section-item-body-intro">{{ item.intro }}</p>

              <div v-if="hasOp" class="header-ops">
                <vab-icon
                  class="icon"
                  icon="add-box-fill"
                  style="color: rgb(54, 203, 203)"
                  @click="emit('add-item', item)"
                />
                <vab-icon
                  class="icon"
                  icon="edit-box-fill"
                  style="color: rgb(151, 95, 229)"
                  @click="emit('edit-container', item)"
                />
                <vab-icon
                  class="icon"
                  icon="eye-fill"
                  style="color: rgb(251, 212, 55)"
                  @click="emit('view-container', item)"
                />
                <vab-icon
                  icon="delete-bin-5-line"
                  style="color: rgb(24, 144, 255)"
                  class="icon"
                  @click="hDel(item)"
                />
              </div>
            </div>
          </slot>
        </vab-card>
      </el-col>

      <el-col :lg="6" :md="8" :sm="8" :xl="6" :xs="24">
        <vab-card
          class="section-item"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div class="emptybox">
            <div class="empty" @click="emit('add-container')">
              <!-- <el-button type="primary" @click="hAdd()">+</el-button> -->
              <vab-icon
                style="width: 45px; height: 45px"
                is-custom-svg
                icon="big-add"
              />
              <p>{{ title }}</p>
            </div>
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </section>
</template>
<script setup>
  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  defineProps({
    hasOpTop: {
      type: Boolean,
      default: false,
    },
    opNames: {
      type: Array,
      default: () => ['add', 'del', 'update', 'view'],
    },
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
    if (item.children?.length || item.directives?.length) {
      $baseMessage('还有子项，不能删除', 'error', 'vab-hey-message-error')
      return
    }

    $baseConfirm('你确定要删除当前项吗', null, () => {
      emit('del-container', item)
    })
  }
</script>
<style lang="scss" scoped>
  .emptybox {
    min-height: 100px;
    display: flex;
    cursor: pointer;
    margin-top: 62px;
  }
  .empty {
    margin: auto;
    text-align: center;
  }
  .section {
    background: $base-color-background !important;
    padding: 0;

    .section-item {
      // height: 200px;
    }
    .section-item-title {
      margin: 0;
    }
    .section-item-body {
      // padding: 20px;
    }
    .section-item-body-intro {
      height: 3em;
      overflow: hidden;
      padding: 10px;
    }
  }
  .header-ops {
    padding: 0 10px 10px;
    text-align: right;
    .icon {
      // color: #ccc;
      font-size: 24px;
      margin-left: 3px;
      cursor: pointer;
      &:hover {
        // color: #000;
      }
    }
  }
  .badge {
    top: 5px;
  }
</style>
