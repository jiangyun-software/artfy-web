<template>
  <div class="content">
    <div class="tabs-wrap">
      <div class="tabs">
        <router-link to="/aiPainting/painting"><div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath == '/aiPainting/painting' }">AI作画</div></router-link>
        <router-link to="/aiPainting/img2img/collection"><div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath.startsWith('/aiPainting/img2img') }">图生图</div></router-link>
        <router-link to="/aiPainting/dreambooth/artisticGeneration"><div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath.startsWith('/aiPainting/dreambooth') }">梦想生成器</div></router-link>
      </div>
    </div>
    <RouterView />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'AIPainting',
    setup() {
      const router = useRouter();
      return {
        router,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    max-width: 1920px;
    min-width: 1200px;
    margin: 0px auto;
    background-color: black;

    .tabs-wrap {
      .tabs {
        display: inline-flex;
        height: 48px;

        .tabs-item {
          width: 168px;
          text-align: center;
          height: 100%;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
          font-weight: 400;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active {
          color: #8aff00;
          border-top: 4px solid #8aff00;
          background: rgba(255, 255, 255, 0.16);
        }
      }
    }
  }
</style>
