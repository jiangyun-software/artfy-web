<template>
  <div class="comtent">
    <img class="fade-in-1" :src="before" alt="" />
    <img class="fade-out-1" :src="after" alt="" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  export default defineComponent({
    name: 'ImageCompareFade',
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
      return {};
    },
  });
</script>
<style lang="less" scoped>
  .comtent {
    position: relative;

    img {
      position: absolute;
    }
  }
  .fade-in-1 {
    animation: 2s fadeIn1 ease-in-out infinite normal;
  }

  .fade-out-1 {
    animation: 2s fadeOut1 ease-in-out infinite normal;
  }

  @keyframes fadeIn1 {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    50% {
      opacity: 1;
    }

    60% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes fadeOut1 {
    0% {
      opacity: 1;
    }

    10% {
      opacity: 0;
    }

    50% {
      opacity: 0;
    }

    60% {
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }
</style>
