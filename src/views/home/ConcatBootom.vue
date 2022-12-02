<template>
  <div class="concatBottom">
    <div class="title">联系我们</div>
    <div class="desc">您对匠韵智能有任何疑问，请随时联系我们为您提供服务</div>
    <div class="concat-method">
      <div class="concat-item">客服热线<Divider class="divider" type="vertical" />135 4306 0130</div>
      <div class="concat-item">帮助支持<Divider class="divider" type="vertical" />jiangyun@aicv.club</div>
    </div>
    <img class="img-left" :src="left" alt="" />
    <img class="img-right" :src="right" alt="" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Divider } from 'ant-design-vue';
  import left from '/@/assets/images/home-concatBottom-left.png';
  import right from '/@/assets/images/home-concatBottom-right.png';

  export default defineComponent({
    name: 'ConcatBootom',
    components: { Divider },
    setup() {
      return {
        left,
        right,
      };
    },
  });
</script>
<style lang="less" scoped>
  .concatBottom {
    background-color: #0035f0;
    padding: 80px 0px;
    position: relative;

    .title {
      font-weight: 400;
      font-size: 36px;
      text-align: center;
      color: white;
    }

    .desc {
      font-weight: 400;
      font-size: 16px;
      color: rgba(255 255 255 / 70%);
      margin-top: 12px;
      text-align: center;
    }

    .concat-method {
      margin-top: 60px;
      display: flex;
      justify-content: center;

      .concat-item {
        font-weight: 400;
        font-size: 14px;
        padding: 16px 48px;
        color: white;
        background: linear-gradient(126.54deg, #ffffff -106.22%, rgba(255, 255, 255, 0) 107.5%);
        border-radius: 8px;
        margin: 0px 20px;
        width: 368px;
        line-height: 28px;

        .divider {
          margin: 0px 12px;
          border-color: rgba(255 255 255 / 20%);
          height: 28px;
        }
      }
    }

    .img-left {
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
    .img-right {
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
  }
</style>
