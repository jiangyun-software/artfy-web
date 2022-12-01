<template>
  <div class="menu">
    <router-link to="/account/my"><div class="menu-item" :class="{ active: route == '/account/my' }">我的账号</div></router-link>
    <router-link to="/account/apiKey"><div class="menu-item" :class="{ active: route == '/account/apiKey' }">API密钥</div></router-link>
    <router-link to="/account/invitationCode"><div class="menu-item" :class="{ active: route == '/account/invitationCode' }">邀请码</div></router-link>
    <router-link to="/account/setting"><div class="menu-item" :class="{ active: route == '/account/setting' }">账号设置</div></router-link>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'Menu',
    setup() {
      const route = computed(() => useRouter().currentRoute.value.fullPath);

      return {
        route,
      };
    },
  });
</script>
<style lang="less" scoped>
  .menu {
    width: 360px;
    min-height: 100vh;
    background-color: white;

    .menu-item {
      padding: 24px 48px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.85);
    }

    .active {
      color: white;
      background-color: #0035f0;
    }

    .menu-item:hover {
      // color: white;
      // background-color: #0035f0;
    }
  }
</style>
