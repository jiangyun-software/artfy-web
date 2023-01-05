<template>
  <div class="footer" v-show="router.currentRoute.value.meta.footer">
    <div class="line1">
      <div class="contact">
        <div class="logo"><img :src="logo_full_white" alt="" /></div>
        <div class="qr">
          <div>
            <img :src="officialAccountQR" alt="" />
            <div class="qr-title">微信公众号</div>
          </div>
          <div>
            <img :src="officialAccountQR2" alt="" />
            <div class="qr-title">微信扫一扫</div>
          </div>
        </div>
      </div>
      <div class="product">
        <div class="group">
          <div class="title">抠图</div>
          <div class="items">
            <router-link to="/product/cutout/universalCutout"><div class="product-group-item">通用抠图</div></router-link>
            <router-link to="/product/cutout/portraitCutout"><div class="product-group-item">人像抠图</div></router-link>
            <!-- <div>头部抠图</div> -->
            <router-link to="/product/cutout/commodityCutout"><div class="product-group-item">物体抠图</div></router-link>
          </div>
        </div>
        <div class="group">
          <div class="title">AI图像处理</div>
          <div class="items">
            <router-link to="/product/imageProcessing/repairEdit"><div class="product-group-item">修复/去水印</div></router-link>
            <router-link to="/product/imageProcessing/colorize"><div class="product-group-item">照片上色</div></router-link>
            <router-link to="/product/imageProcessing/superResolution"><div class="product-group-item">无损放大</div></router-link>
            <router-link to="/product/imageProcessing/faceBeauty"><div class="product-group-item">智能美颜</div></router-link>
          </div>
        </div>
        <div class="group">
          <div class="title">AI视频处理</div>
          <div class="items">
            <div>去马赛克</div>
            <div>人像打码</div>
            <div>风格迁移</div>
            <div>抠图</div>
            <router-link to="/product/videoProcessing/videoTranslation"><div class="product-group-item">视频翻译</div></router-link>
          </div>
        </div>
        <div class="group">
          <div class="title">艺术生成</div>
          <div class="items">
            <div>关键词生成画作</div>
            <router-link to="/product/artGeneration/anime"><div class="product-group-item">人像卡通化</div></router-link>
            <div>图片卡通化</div>
            <div>图片风格迁移</div>
            <div>照片变活</div>
          </div>
        </div>
        <div class="group">
          <div class="title">行业案例</div>
          <div class="items">
            <div>图片设计</div>
            <div>电子商务</div>
            <div>定制打印</div>
            <div>开发者</div>
            <div>视频XR</div>
          </div>
        </div>
        <div class="group">
          <div class="title">其他</div>
          <div class="items">
            <div>API</div>
            <div>关于我们</div>
            <div>帮助与支持</div>
          </div>
        </div>
      </div>
    </div>
    <div class="filing"><a href="https://beian.miit.gov.cn">粤ICP备2022016758号-3</a></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import logo_full_white from '/@/assets/images/logo_full_white.png';
  import officialAccountQR from '/@/assets/images/officialAccountQR.png';
  import officialAccountQR2 from '/@/assets/images/officialAccountQR2.png';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'Footer',
    setup() {
      const router = useRouter();
      return {
        logo_full_white,
        officialAccountQR,
        officialAccountQR2,
        router,
      };
    },
  });
</script>
<style lang="less" scoped>
  .footer {
    background-color: black;
    color: white;
    padding-top: 100px;
  }

  .line1 {
    display: flex;
    justify-content: center;

    .contact {
      text-align: center;

      .logo {
        height: 48px;
      }

      .qr {
        margin-top: 50px;
        width: 210px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .qr-title {
          font-size: 16px;
          font-weight: 400;
          margin-top: 12px;
        }
      }

      img {
        display: inline;
      }
    }

    .product {
      display: flex;
      margin-left: 100px;

      .group {
        text-align: center;

        .title {
          font-size: 16px;
          font-weight: 400;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding-bottom: 16px;
        }

        .items {
          padding: 8px 30px;
          display: flex;
          flex-direction: column;
          font-size: 14px;
          opacity: 0.4;

          > div {
            margin: 8px 0px;
            cursor: pointer;
          }
        }
      }
    }
  }

  .filing {
    height: 72px;
    line-height: 72px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    a {
      color: white;
    }
  }
  .product-group-item {
    padding: 8px 0px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: white;
  }
</style>
