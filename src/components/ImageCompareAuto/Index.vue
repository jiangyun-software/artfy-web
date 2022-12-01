<template>
  <div ref="contentRef" class="banner">
    <div class="before" :style="{ background: 'url(' + before + ')' }"></div>
    <div class="after-wrap scrolling"><div class="after" :style="{ background: 'url(' + after + ')' }"></div></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  export default defineComponent({
    name: 'ImageCompareAuto',
    props: {
      before: {
        type: String as PropType<string>,
        default: '',
      },
      after: {
        type: String as PropType<string>,
        default: '',
      },
    },
    setup() {
      const afterWidth = ref(100);
      return {
        afterWidth,
      };
    },
  });
</script>
<style lang="less" scoped>
  .banner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 8px;

    .before,
    .after-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      overflow: hidden;
    }

    .after-wrap {
      border-right: 1px solid white;
      background-image: url('/@/assets/images/mask-background.jpg');

      .after {
        width: 100%;
        height: 100%;
      }
    }
  }

  .scrolling {
    animation: scroll 4s ease-in-out 0s infinite normal none running;
  }

  @keyframes scroll {
    0% {
      width: 0%;
    }

    25% {
      width: 100%;
    }
  }
</style>
