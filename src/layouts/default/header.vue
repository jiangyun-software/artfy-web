<template>
  <div id="header" class="header">
    <router-link to="/index">
      <div class="logo">
        <img class="logo-defualt" :src="logo_full" alt="" />
        <img class="logo-white" :src="logo_full_white" alt="" />
      </div>
    </router-link>
    <div class="menu">
      <div class="menu-item">
        <div class="menu-text">
          <span>产品</span>
          <span class="caret caret-down"><CaretDownFilled /></span>
          <span class="caret caret-up"><CaretUpFilled /></span>
        </div>
        <div class="menu-child product menu-hide-product">
          <div class="product-group">
            <div class="product-group-title"><img :src="product_cutout" alt="" />抠图</div>
            <div class="product-group-items">
              <router-link to="/product/cutout/universalCutout"><div class="product-group-item">通用抠图</div></router-link>
              <router-link to="/product/cutout/portraitCutout"><div class="product-group-item">人像抠图</div></router-link>
              <!-- <router-link to="/product/cutout/headCutout"><div class="product-group-item">头部抠图</div></router-link> -->
              <router-link to="/product/cutout/commodityCutout"><div class="product-group-item">物体抠图</div></router-link>
            </div>
          </div>
          <div class="product-group">
            <div class="product-group-title"><img :src="product_image" alt="" />AI图像处理</div>
            <div class="product-group-items">
              <router-link to="/product/imageProcessing/repairEdit"><div class="product-group-item">修复/去水印</div></router-link>
              <router-link to="/product/imageProcessing/colorize"><div class="product-group-item">照片上色</div></router-link>
              <router-link to="/product/imageProcessing/superResolution"><div class="product-group-item">无损放大</div></router-link>
              <router-link to="/product/imageProcessing/faceBeauty"><div class="product-group-item">智能美颜</div></router-link>
            </div>
          </div>
          <div class="product-group">
            <div class="product-group-title"><img :src="product_video" alt="" />AI视频处理</div>
            <div class="product-group-items">
              <div class="product-group-item">去字幕/去水印</div>
              <div class="product-group-item">人像打码</div>
              <div class="product-group-item">风格迁移</div>
              <div class="product-group-item">视频抠图</div>
              <router-link to="/product/videoProcessing/videoTranslation"><div class="product-group-item">视频翻译</div></router-link>
            </div>
          </div>
          <div class="product-group">
            <div class="product-group-title"><img :src="product_art" alt="" />AI艺术生成</div>
            <div class="product-group-items">
              <div class="product-group-item">关键词生成画作</div>
              <router-link to="/product/artGeneration/anime"><div class="product-group-item">人像卡通化</div></router-link>
              <div class="product-group-item">图片卡通化</div>
              <div class="product-group-item">图片风格迁移</div>
              <div class="product-group-item">照片变活</div>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-item">
        <div class="menu-text">
          <span>行业案例</span>
          <span class="caret caret-down"><CaretDownFilled /></span>
          <span class="caret caret-up"><CaretUpFilled /></span>
        </div>
        <div class="menu-child product menu-hide-case">
          <div class="product-group">
            <div class="product-group-items">
              <router-link to="/case/graphicDesign"><div class="product-group-item">图像设计</div></router-link>
              <router-link to="/case/eCommerceDesign"><div class="product-group-item">电商设计</div></router-link>
              <router-link to="/case/artGeneration"><div class="product-group-item">艺术生成</div></router-link>
              <router-link to="/case/videoXR"><div class="product-group-item">视频处理</div></router-link>
            </div>
          </div>
        </div>
      </div>
      <router-link to="/apiDoc/cutout/universalCutoutApi" :append="false"><div class="menu-item menu-text">API</div></router-link>
      <router-link to="/price" :append="false"><div class="menu-item menu-text">价格</div></router-link>
    </div>
    <div class="login">
      <div v-if="userInfo && userInfo.phonenumber" style="line-height: normal">
        <Popover>
          <template #content>
            <div class="account-content">
              <router-link to="/account/my"><div class="account-item">我的账户</div></router-link>
              <div class="account-item" @click="logout">安全退出</div>
            </div>
          </template>
          <div style="cursor: pointer" class="userInfo">
            <img :src="userIcon" alt="" />
            <span>{{ userInfo?.phonenumber }}</span>
          </div>
        </Popover>
      </div>
      <a-button v-else class="btn-black" @click="showLoginPanel">登录</a-button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { useUserStore } from '/@/store/modules/user';
  import logo_full from '/@/assets/images/logo_full.png';
  import logo_full_white from '/@/assets/images/logo_full_white.png';
  import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons-vue';
  import { Popover } from 'ant-design-vue';
  import product_art from '/@/assets/images/product_art.png';
  import product_cutout from '/@/assets/images/product_cutout.png';
  import product_image from '/@/assets/images/product_image.png';
  import product_video from '/@/assets/images/product_video.png';
  import { useRouter } from 'vue-router';
  import userIcon from '/@/assets/svg/user.svg';

  export default defineComponent({
    name: 'Header',
    components: { CaretDownFilled, CaretUpFilled, Popover },
    setup() {
      const router = useRouter();

      const appStore = useAppStore();

      const userStore = useUserStore();
      const userInfo = computed(() => userStore.getUserInfo);

      const showLoginPanel = () => {
        appStore.setLoginingAction(true);
      };

      const logout = () => {
        userStore.logout();
      };

      return {
        logo_full,
        logo_full_white,
        product_art,
        product_cutout,
        product_image,
        product_video,
        router,
        showLoginPanel,
        userInfo,
        logout,
        userIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  .header {
    position: fixed;
    width: 100%;
    height: 100px;
    display: flex;
    background-color: white;
    // margin-bottom: 2px;
    box-shadow: 0 2px 2px rgb(0 0 0 / 6%);
    z-index: 100;

    .logo {
      width: 284px;
      text-align: right;
      line-height: 100px;

      img {
        display: inline;
      }

      .logo-white {
        display: none;
      }
    }

    .menu {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .menu-child {
        display: none;
        cursor: default;
      }

      .menu-hide-product {
        left: calc(50% - 384px);
      }

      .menu-hide-case {
        left: calc(50% - 108px);
      }

      .menu-item {
        font-size: 16px;
        font-weight: 400;
        padding: 0px 30px;
        cursor: pointer;
      }

      .menu-item:hover .menu-child {
        display: flex;
      }

      .menu-item:hover .caret-down {
        display: none;
      }

      .menu-item:hover .caret-up {
        display: inline-block;
      }

      .menu-text {
        line-height: 100px;
        opacity: 0.6;

        .caret {
          font-size: 14px;
          margin-left: 4px;
        }

        .caret-up {
          display: none;
        }
      }
    }

    .login {
      width: 200px;
      line-height: 100px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #caret {
      font-size: 12px;
    }

    .product {
      position: absolute;
      background-color: white;
      padding: 16px;
      z-index: 100;
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06);
      border-radius: 4px;

      .product-group {
        background-color: #f8f8f8;
        margin: 0px 8px;
        width: 168px;

        .product-group-title {
          height: 62px;
          font-size: 16px;
          color: black;
          font-weight: 400;
          padding: 20px 24px;

          img {
            margin-right: 8px;
            display: inline;
            margin-top: -4px;
          }
        }

        .product-group-items {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.7);
          padding: 7px 24px;
          border-top: 1px solid white;
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          .product-group-item {
            padding: 12px 0px 2px 0px;
            cursor: not-allowed;
            display: inline-block;
            border-bottom: 1px solid #f8f8f8;
            color: rgba(0, 0, 0, 0.3);
          }

          .product-group-item:hover {
          }

          a .product-group-item {
            padding: 12px 0px 2px 0px;
            cursor: pointer;
            display: inline-block;
            border-bottom: 1px solid #f8f8f8;
            color: rgba(0, 0, 0, 0.7);
          }

          a .product-group-item:hover {
            border-bottom: 1px solid #0035f0;
            color: #0035f0;
          }
        }
      }
    }

    .btn-black {
      color: #fff;
      border-color: #000000;
      background: #000000;
      border-radius: 8px;
      width: 104px;
      height: 48px;
      font-size: 16px;
    }

    .btn-black:hover {
      color: #fff;
      background-color: #313131;
      border-color: #000000;
    }

    .btn-black[disabled],
    .btn-black[disabled]:hover,
    .btn-black[disabled]:focus,
    .btn-black[disabled]:active {
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }

  .account-content {
    margin: 0px -16px;
  }

  .account-item {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    color: #606266;
    padding: 0px 16px;
  }

  .account-item:hover {
    background-color: rgb(0 0 0 / 6%);
    color: black;
  }

  a {
    color: unset;
  }

  span.anticon:not(.app-iconify),
  .anticon {
    vertical-align: middle !important;
  }

  .userInfo {
    img {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
</style>
<!-- <style lang="less">
  .home-header {
    background-color: rgba(0, 0, 0, 0) !important;

    .menu-text {
      color: white !important;
      opacity: 0.8 !important;
    }

    .menu-text:hover {
      color: white !important;
      opacity: 1 !important;
    }

    .btn-black {
      background-color: white !important;
      color: black !important;
      border-color: white !important;
    }

    .logo {
      .logo-defualt {
        display: none !important;
      }

      .logo-white {
        display: inline-block !important;
      }
    }

    .phonenumber {
      // color: rgba(0, 0, 0, 0.85) !important;
      color: white !important;
    }
  }
</style> -->
