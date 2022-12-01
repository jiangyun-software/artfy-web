<template>
  <div class="top-wrap">
    <div class="top">
      <div class="left">
        <div class="title-line1">AI智能</div>
        <div class="title-line2">免费在线抠图</div>
        <div class="upload-btn">
          <router-link to="/product/cutout/universalCutout"><Button class="jy-btn-blue upload">上传照片</Button></router-link>
        </div>
        <div class="try-title">试试一下图片看看效果</div>
        <div class="try-list">
          <img class="try-item" :src="example1" alt="" />
          <img class="try-item" :src="example2" alt="" />
          <img class="try-item" :src="example3" alt="" />
          <img class="try-item" :src="example4" alt="" />
        </div>
      </div>
      <div class="right">
        <ImageCompare style="width: 666px; height: 680px" :before="bannerBefore" :after="bannerAfter" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Button } from 'ant-design-vue';
  import verticalLine from '/@/assets/images/verticalLine.png';
  import uploadIcon from '/@/assets/images/uploadIcon.png';
  import tryIcon from '/@/assets/images/try.png';
  import example1 from '/@/assets/images/home-top-example1.png';
  import example2 from '/@/assets/images/home-top-example2.png';
  import example3 from '/@/assets/images/home-top-example3.png';
  import example4 from '/@/assets/images/home-top-example4.png';
  import starImg from '/@/assets/images/home-top-star.png';
  import ImageCompare from '/@/components/ImageCompare/Index.vue';
  import bannerBefore from '/@/assets/images/home-top-banner-before.png';
  import bannerAfter from '/@/assets/images/home-top-banner-after.png';

  export default defineComponent({
    name: 'Top',
    components: { Button, ImageCompare },
    setup() {
      return {
        verticalLine,
        uploadIcon,
        tryIcon,
        example1,
        example2,
        example3,
        example4,
        starImg,
        bannerBefore,
        bannerAfter,
      };
    },
  });
</script>
<style lang="less" scoped>
  .top-wrap {
    background-color: white;

    .top {
      width: 1200px;
      margin: 0px auto;
      display: flex;

      .left {
        flex: 1;
        position: relative;

        .star {
          position: absolute;
          left: -200px;
          top: 60px;
        }

        .title-line1 {
          margin-top: 80px;
          font-size: 70px;
          font-family: 'OPPOSans';
          font-style: normal;
          font-weight: 600;
          background: linear-gradient(78.61deg, #9189ff 0%, #6b8eff 22.49%, #4a93ff 49.53%, #61b4ff 80.34%, #82e3ff 100.39%), #0035f0;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .title-line2 {
          font-size: 70px;
          font-family: 'OPPOSans';
          font-style: normal;
          font-weight: 600;
          color: #000000;
        }

        .upload-btn {
          margin-top: 38px;

          .upload {
            width: 340px;
            padding: 30px 0px !important;
            font-size: 20px !important;
            color: rgba(255, 255, 255, 0.9) !important;
            background: #000000 !important;
            box-shadow: 0px 42px 42px -20px rgba(0, 0, 0, 0.3);
            line-height: unset !important;
          }

          .upload:hover,
          .upload:focus {
            border-color: black;
          }
        }

        .try-title {
          margin-top: 116px;
          font-size: 14px;
        }

        .try-list {
          display: flex;
          width: 320px;
          justify-content: space-between;
          margin-top: 14px;

          .try-item {
            width: 62px;
            height: 62px;
            border: 1px solid black;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }

      .right {
        width: 666px;
        height: 680px;
      }
    }
  }
</style>
