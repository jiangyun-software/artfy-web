<template>
  <div class="dreambooth">
    <div class="tabs-wrap">
      <div class="tabs">
        <div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath == '/aiPainting/dreambooth/modelRepository' }"><router-link to="/aiPainting/dreambooth/modelRepository">模型库</router-link></div>
        <div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath == '/aiPainting/dreambooth/artisticGeneration' }"><router-link to="/aiPainting/dreambooth/artisticGeneration">艺术生成</router-link></div>
      </div>
    </div>
    <div>
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    name: 'Dreambooth',
    setup() {
      const router = useRouter();

      return {
        router,
      };
    },
  });
</script>
<style lang="less" scoped>
  .dreambooth {
    .tabs-wrap {
      background: rgba(255, 255, 255, 0.16);
      padding: 0px 24px;

      .tabs {
        height: 52px;
        border-bottom: 1px solid #4d4d4d;
        display: flex;
        gap: 36px;

        .tabs-item {
          height: 52px;
          display: flex;
          align-items: center;

          a {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        .tabs-item.active {
          border-bottom: 1px solid #8aff00;
          a {
            color: #8aff00;
          }
        }
      }
    }
  }
</style>
