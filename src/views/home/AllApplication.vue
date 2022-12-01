<template>
  <div class="allapplication-wrap">
    <div class="allapplication">
      <div class="title">全部应用</div>
      <div class="description">基于强大的人工智能算法及成熟图像语义分割技术，自动识别需要保留的主体并去除背景，一键上传即可快速抠图！</div>
      <div class="group-list">
        <div class="group-item">
          <div class="group-title">AI智能抠图</div>
          <Divider class="group-divider" />
          <div class="group-content">
            <div class="group-content-item">
              <router-link to="/product/cutout/universalCutout"><div class="group-content-item-text active">通用抠图</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to="/product/cutout/portraitCutout"><div class="group-content-item-text active">人像抠图</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to="/product/cutout/commodityCutout"><div class="group-content-item-text active">物体抠图</div></router-link>
            </div>
          </div>
          <img class="group-icon1" :src="application1" alt="" />
        </div>
        <div class="group-item">
          <div class="group-title">AI图像处理</div>
          <Divider class="group-divider" />
          <div class="group-content">
            <div class="group-content-item">
              <router-link to="/product/imageProcessing/repairEdit"><div class="group-content-item-text active">修复/去水印</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to="/product/imageProcessing/colorize"><div class="group-content-item-text active">照片上色</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to="/product/imageProcessing/superResolution"><div class="group-content-item-text active">无损放大</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to="/product/imageProcessing/faceBeauty"><div class="group-content-item-text active">智能美颜</div></router-link>
            </div>
          </div>
          <img class="group-icon2" :src="application2" alt="" />
        </div>
        <div class="group-item">
          <div class="group-title">AI视频处理</div>
          <Divider class="group-divider" />
          <div class="group-content">
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">去字幕/去水印</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">人像打码</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">风格迁移</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">视频处理</div></router-link>
            </div>
          </div>
          <img class="group-icon3" :src="application3" alt="" />
        </div>
        <div class="group-item">
          <div class="group-title">AI艺术生成</div>
          <Divider class="group-divider" />
          <div class="group-content">
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">人像卡通化</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">图片卡通化</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">图片风格迁移</div></router-link>
            </div>
            <div class="group-content-item">
              <router-link to=""><div class="group-content-item-text">照片变活</div></router-link>
            </div>
          </div>
          <img class="group-icon4" :src="application4" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Divider } from 'ant-design-vue';
  import application1 from '/@/assets/images/home-application1.png';
  import application2 from '/@/assets/images/home-application2.png';
  import application3 from '/@/assets/images/home-application3.png';
  import application4 from '/@/assets/images/home-application4.png';

  export default defineComponent({
    name: 'AllApplication',
    components: { Divider },
    setup() {
      return {
        application1,
        application2,
        application3,
        application4,
      };
    },
  });
</script>
<style lang="less" scoped>
  .allapplication-wrap {
    padding: 120px 0px;
    background-color: #f8f8f8;
    .allapplication {
      width: 1200px;
      margin: 0px auto;
      .title {
        font-size: 48px;
        font-weight: 400;
        color: #000000;
      }
      .description {
        margin-top: 12px;
        font-weight: 400;
        font-size: 16px;
        color: rgba(0 0 0 / 70%);
      }

      .group-list {
        margin-top: 60px;
        display: flex;
        justify-content: space-between;

        .group-item {
          width: 280px;
          height: 368px;
          padding: 40px 46px;
          background: white;
          box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          position: relative;
          overflow: hidden;

          .group-title {
            font-weight: 500;
            font-size: 24px;
            color: black;
          }

          .group-content {
            .group-content-item {
              margin-top: 12px;
              .group-content-item-text {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.3);
                line-height: 32px;
                border-bottom: 1px solid white;
              }
              .group-content-item-text.active {
                color: black;
              }

              .group-content-item-text.active:hover {
                color: @blue;
                border-bottom: 1px solid @blue;
                display: inline-block;
              }
            }
          }

          .group-icon1,
          .group-icon2,
          .group-icon3,
          .group-icon4 {
            position: absolute;
            right: 0px;
            bottom: 0px;
          }
        }
      }
    }
  }
</style>
