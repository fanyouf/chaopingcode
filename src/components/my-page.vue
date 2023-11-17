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
              <h3 class="section-item-title">
                {{ item.title }}
                <el-badge
                  class="badge"
                  :value="item.children ? item.children.length : ''"
                />
              </h3>
            </div>
          </template>
          <div class="section-item-body">
            <slot :item="item">
              <img
                v-if="item.logo"
                style="width: 100%; height: 186px"
                :src="item.logo"
              />
              <img
                v-else-if="item.cover"
                style="width: 100%; height: 186px"
                :src="item.cover"
              />
              <img
                v-else-if="item.image"
                style="width: 100%; height: 186px"
                :src="item.image"
              />
              <img
                v-else
                style="width: 100%; height: 186px"
                src="http://8.142.32.7:8888/assets/d1/57/d1576663f29233e326553db584e5520c.jpg"
              />
              <div class="section-item-body-intro">{{ item.intro }}</div>
            </slot>

            <div v-if="opNames.length > 0" class="header-ops">
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
                @click="emit('edit-item', item)"
              />
              <vab-icon
                v-if="opNames.includes('view')"
                class="icon"
                icon="eye-fill"
                style="color: rgb(251, 212, 55)"
                @click="emit('view-item', item)"
              />
              <vab-icon
                v-if="opNames.includes('del')"
                icon="delete-bin-5-line"
                style="color: rgb(24, 144, 255)"
                class="icon"
                @click="hDel(item)"
              />
            </div>
          </div>
          <slot name="extro" :item="item"></slot>
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
    opNames: {
      type: Array,
      default: () => ['add', 'del', 'edit', 'view'],
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
    'add-container',
    'add-item',
    'edit-item',
    'del-item',
    'view-item',
  ])

  const hDel = (item) => {
    if (
      item.children?.length ||
      item.directives?.length ||
      item.knowledge?.length
    ) {
      $baseMessage('还有子项，不能删除', 'error', 'vab-hey-message-error')
      return
    }

    $baseConfirm('你确定要删除当前项吗', null, () => {
      emit('del-item', item)
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
      height: 4em;
      line-height: 1.5;
      // overflow: hidden;
      padding: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
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
