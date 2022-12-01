<template>
  <div ref="contentRef" class="banner" @mousemove="resize">
    <div class="before" :style="{ background: 'url(' + before + ')' }"></div>
    <div class="after-wrap" :style="{ width: afterWidth + '%' }"><div class="after" :style="{ background: 'url(' + after + ')' }"></div></div>
    <img class="resize" :style="{ left: afterWidth + '%' }" :src="imgDivider" alt="" @mousedown="start" @mouseup="end" draggable="false" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import imgDivider from '/@/assets/images/img-divider.png';
  export default defineComponent({
    name: 'ImageCompare',
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
      let resizeing = false;
      const contentRef = ref();
      const afterWidth = ref<any>(50);
      const start = () => {
        resizeing = true;
      };
      const resize = (e) => {
        if (resizeing) {
          const contentRect = contentRef.value.getBoundingClientRect();
          let width = ((e.pageX - contentRect.left) / contentRect.width) * 100;

          if (width <= 0) {
            width = 0;
          } else if (width <= 0 || width >= 100) {
            width = 100;
          }
          afterWidth.value = width;
        }
      };
      const end = () => {
        resizeing = false;
      };

      return {
        contentRef,
        afterWidth,
        start,
        resize,
        end,
        imgDivider,
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

    .resize {
      position: absolute;
      height: 100%;
      object-fit: contain;
      top: 0px;
      right: 0px;
      transform: translateX(-50%);
      cursor: col-resize;
      object-fit: contain;
    }
  }
</style>
