<template>
  <div class="menu">
    <Menu class="menus" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="inline">
      <SubMenu v-for="item1 in menus" :key="item1.name">
        <template #title>{{ item1.name }}</template>
        <MenuItem v-for="item2 in item1.subMenu" :key="item2.path" @click="handleClick(item2.path)">{{ item2.name }}</MenuItem>
      </SubMenu>
    </Menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { Menu, SubMenu, MenuItem } from 'ant-design-vue';

  export default defineComponent({
    name: 'ApiMenu',
    components: { Menu, SubMenu, MenuItem },
    setup() {
      const router = useRouter();
      const routerPath = router.currentRoute.value.fullPath;

      const handleClick = (path) => {
        router.push(path);
      };

      const titleClick = () => {
        console.log(1);
      };

      const menus = ref([
        {
          name: 'AI智能抠图',
          subMenu: [{ name: '通用抠图', path: '/apiDoc/cutout/universalCutoutApi' }],
        },
        {
          name: 'AI图像处理',
          subMenu: [{ name: '修复/去水印', path: '/apiDoc/imageProcessing/repairApi' }],
        },
        {
          name: 'AI图像生成',
          subMenu: [{ name: '图生图', path: '/apiDoc/ai/img2img' }],
        },
      ]);

      const selectedKeys = ref<string[]>([routerPath]);
      const openKeys = ref<string[]>([menus.value.find((item) => item.subMenu.find((item2) => item2.path == routerPath) != undefined).name]);

      return {
        router,
        menus,
        selectedKeys,
        openKeys,
        handleClick,
        titleClick,
      };
    },
  });
</script>
<style lang="less" scoped>
  .menu {
    width: 358px;
  }

  .menus {
    width: 358px;
    min-height: 100%;
  }

  :deep(.ant-menu-submenu-title) {
    height: 72px !important;
  }

  :deep(.ant-menu-inline > .ant-menu-item) {
    height: 48px !important;
  }

  :deep(.ant-menu-item:hover) {
    color: #0035f0;
  }
  :deep(.ant-menu-submenu-title .ant-menu-title-content) {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
  }

  :deep(.ant-menu-item .ant-menu-title-content) {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }

  :deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
    background: #0035f0;
    color: white;
  }
</style>
