<template>
  <div id="header" class="header">
    <router-link to="/index">
      <div class="logo">
        <!--        <img class="logo-defualt" :src="logo_full" alt="" />-->
        <!--        <img class="logo-white" :src="logo_full_white" alt="" />-->
        <svg width="123" height="32" viewBox="0 0 123 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-defualt-svg">
          <path d="M19.3875 4.43578C19.3875 4.3309 19.4472 4.23498 19.5418 4.18792L27.5564 0.202206C27.7426 0.109612 27.9621 0.243697 27.9621 0.450069V27.7351L19.3875 31.9993V4.43578Z" fill="#0035F0" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2175 19.4437C11.0313 19.3511 10.8119 19.4852 10.8119 19.6915V27.5646C10.8119 27.6695 10.8716 27.7654 10.9663 27.8124L19.3865 31.9999L27.9611 27.7703L19.3865 23.5061L11.2175 19.4437Z" fill="#4CDAF5" />
          <path d="M8.57459 27.5642C8.57459 27.6691 8.51485 27.765 8.42022 27.8121L0.405588 31.7978C0.219398 31.8904 -2.09745e-05 31.7563 -2.09561e-05 31.5499L-1.85251e-05 4.26491L8.57459 0.000722885L8.57459 27.5642Z" fill="#0035F0" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.7445 12.5563C16.9307 12.6489 17.1501 12.5148 17.1501 12.3085L17.1501 4.43543C17.1501 4.33054 17.0904 4.23463 16.9958 4.18757L8.57554 0.000139455L8.57554 0.000106076L0.000935345 4.22963L8.57554 8.49382L8.57554 8.49386L16.7445 12.5563Z"
            fill="#4CDAF5"
          />
          <path d="M57.9756 9.3489L57.6552 11.7288L45.6652 17.7353H56.3281L57.8154 16.398L57.312 19.9565H40.3795L40.7456 17.3726L51.9577 11.5248H41.066L41.3634 9.3489H57.9756Z" fill="black" />
          <path d="M75.341 14.8567L74.3113 11.2302L73.396 17.7806H77.9266L78.9334 16.9193L78.4529 20.3192H69.1629L71.1079 6.561H61.7492L62.0467 4.38508H75.2952L74.6317 8.98625L76.9427 6.03968H80.1461L77.08 9.77955H74.5172L74.4486 10.2782H76.9656L78.819 14.8567H75.341Z" fill="black" />
          <path
            d="M97.6489 6.561L96.1387 17.1233H93.553L95.0632 6.561H97.6489ZM102.065 4.36241L99.9828 19.0952C99.9218 19.5183 99.7235 19.8281 99.3879 20.0245C99.0523 20.2058 98.6709 20.2965 98.2438 20.2965H94.7887L96.7565 18.3472L98.7743 4.36241H102.065ZM81.9063 20.1152L83.3707 9.71155H93.0039L92.2717 14.8794C92.2107 15.3025 92.0962 15.5896 91.9284 15.7407C91.7759 15.8918 91.4784 15.9673 91.0361 15.9673H86.9173L88.8165 14.4261L89.2055 11.6382H86.6199L85.7733 17.6219H92.3861L93.2785 16.9873L92.8437 20.1152H81.9063ZM86.4365 4.04509H92.203L93.9192 9.46223H90.2123L88.9309 6.24368H88.7708L86.597 9.46223H82.7071L86.4365 4.04509Z"
            fill="black"
          />
          <path
            d="M111.091 3.99976H114.557L114.076 5.72236H123L122.703 7.87562H117.897L117.554 10.2555H121.49L121.192 12.3861H117.257L116.913 14.766H121.284L120.986 16.9193H116.616L116.136 20.3192H111.994L113.756 7.87562H113.481L112.772 10.4595H109.294L111.091 3.99976ZM109.202 6.58366L107.235 20.3192H103.093L104.946 7.4223L103.596 7.67163L103.962 5.08772L109.568 3.99976L109.202 6.58366Z"
            fill="black"
          />
          <path d="M59.394 5.31384H56.7855L56.9685 4.02189H52.6463L52.438 5.31384H48.9599L49.143 4.02189H44.8548L44.6124 5.31384H41.1344L40.8369 7.4671H44.2921L44.1548 8.5324H48.5023L48.6396 7.4671H52.1176L51.9803 8.5324H56.3279L56.4652 7.4671H59.0965L59.394 5.31384Z" fill="black" />
          <path d="M42.2706 25.9056L40.3795 30.6654H40.9717L41.4832 29.3321H43.6906L44.2021 30.6654H44.8011L42.91 25.9056H42.2706ZM41.6582 28.8721L42.5802 26.4922H42.6071L43.5157 28.8721H41.6582Z" fill="black" />
          <path
            d="M48.2483 25.9056V30.6654H48.8002V28.6188H50.2538C50.5567 28.6188 50.7855 28.6722 50.947 28.7921C51.122 28.9121 51.2229 29.1188 51.2499 29.3988L51.3104 30.0321C51.3306 30.2988 51.3979 30.5054 51.5056 30.6654H52.1046C51.9632 30.4921 51.8757 30.2588 51.8488 29.9654L51.7748 29.2321C51.721 28.7522 51.4652 28.4655 51.0076 28.3655V28.3522C51.2835 28.2855 51.4989 28.1522 51.6604 27.9388C51.8084 27.7322 51.8825 27.4989 51.8825 27.2322C51.8825 26.7922 51.7344 26.4589 51.4518 26.2322C51.1758 26.0122 50.799 25.9056 50.3211 25.9056H48.2483ZM48.8002 26.3789H50.2538C50.624 26.3789 50.8999 26.4522 51.0749 26.5989C51.2364 26.7389 51.3239 26.9589 51.3239 27.2522C51.3239 27.5322 51.2364 27.7455 51.0681 27.8988C50.8797 28.0588 50.6038 28.1455 50.2538 28.1455H48.8002V26.3789Z"
            fill="black"
          />
          <path d="M55.3873 25.9056V26.3789H57.0832V30.6654H57.6283V26.3789H59.3243V25.9056H55.3873Z" fill="black" />
          <path d="M62.8854 25.9056V30.6654H63.4372V28.4522H65.9609V27.9788H63.4372V26.3789H66.1023V25.9056H62.8854Z" fill="black" />
          <path d="M69.2798 25.9056L71.1978 28.7322V30.6654H71.7497V28.7322L73.6677 25.9056H73.0014L71.4737 28.2255L69.946 25.9056H69.2798Z" fill="black" />
          <path
            d="M82.3501 25.9056V30.6654H84.0191C84.7728 30.6654 85.3516 30.4454 85.7554 30.0121C86.139 29.5988 86.3342 29.0188 86.3342 28.2855C86.3342 27.5389 86.1525 26.9589 85.7958 26.5589C85.4054 26.1189 84.8334 25.9056 84.0729 25.9056H82.3501ZM82.9019 26.3789H83.9854C84.618 26.3789 85.0757 26.5389 85.3718 26.8656C85.6477 27.1722 85.7891 27.6455 85.7891 28.2855C85.7891 28.9055 85.6343 29.3788 85.3381 29.6988C85.0218 30.0254 84.5507 30.1921 83.9249 30.1921H82.9019V26.3789Z"
            fill="black"
          />
          <path d="M90.0629 25.9056V30.6654H93.5827V30.1921H90.6148V28.4455H93.3067V27.9722H90.6148V26.3789H93.4683V25.9056H90.0629Z" fill="black" />
          <path
            d="M98.9243 25.8123C98.4263 25.8123 98.0158 25.9189 97.6995 26.1322C97.3428 26.3589 97.1678 26.6856 97.1678 27.0989C97.1678 27.4989 97.3495 27.8055 97.7197 28.0188C97.8745 28.0988 98.2446 28.2322 98.8234 28.4055C99.3618 28.5588 99.705 28.6722 99.8396 28.7522C100.156 28.9188 100.317 29.1521 100.317 29.4521C100.317 29.7055 100.196 29.9054 99.954 30.0521C99.7117 30.1988 99.3887 30.2721 98.9983 30.2721C98.5676 30.2721 98.2446 30.1788 98.0225 30.0054C97.7802 29.8121 97.6322 29.5055 97.5851 29.0921H97.0399C97.0803 29.6788 97.2889 30.1121 97.6658 30.3988C97.9889 30.6388 98.433 30.7587 98.9983 30.7587C99.5704 30.7587 100.021 30.6388 100.358 30.4054C100.694 30.1654 100.863 29.8321 100.863 29.4188C100.863 28.9855 100.661 28.6522 100.264 28.4122C100.062 28.2922 99.6444 28.1388 99.0118 27.9522C98.5474 27.8189 98.2513 27.7189 98.1302 27.6522C97.8543 27.5055 97.7197 27.3122 97.7197 27.0722C97.7197 26.7989 97.8341 26.5989 98.0629 26.4656C98.2648 26.3456 98.5407 26.2922 98.8974 26.2922C99.2877 26.2922 99.5906 26.3722 99.8059 26.5456C100.015 26.7122 100.149 26.9655 100.21 27.3122H100.755C100.708 26.8122 100.526 26.4322 100.203 26.1789C99.8934 25.9323 99.4627 25.8123 98.9243 25.8123Z"
            fill="black"
          />
          <path d="M104.563 25.9056V30.6654H105.108V25.9056H104.563Z" fill="black" />
          <path
            d="M111.133 25.8123C110.427 25.8123 109.868 26.0589 109.458 26.5589C109.067 27.0189 108.879 27.5989 108.879 28.3055C108.879 29.0121 109.074 29.5921 109.464 30.0388C109.882 30.5188 110.474 30.7587 111.234 30.7587C111.631 30.7587 112.001 30.7054 112.351 30.5988C112.681 30.4921 112.964 30.3521 113.193 30.1654V28.2188H111.14V28.6922H112.648V29.9054C112.479 30.0121 112.277 30.1054 112.042 30.1721C111.8 30.2388 111.551 30.2788 111.288 30.2788C110.662 30.2788 110.191 30.0921 109.875 29.7255C109.579 29.3788 109.431 28.9055 109.431 28.3055C109.431 27.6922 109.579 27.2055 109.888 26.8456C110.198 26.4789 110.608 26.2989 111.133 26.2989C111.557 26.2989 111.901 26.3989 112.163 26.6056C112.412 26.7989 112.574 27.0722 112.648 27.4322H113.199C113.112 26.9122 112.903 26.5189 112.567 26.2456C112.21 25.9523 111.732 25.8123 111.133 25.8123Z"
            fill="black"
          />
          <path d="M117.076 25.9056V30.6654H117.628V26.7522H117.648L120.381 30.6654H120.946V25.9056H120.394V29.7788H120.374L117.655 25.9056H117.076Z" fill="black" />
        </svg>
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
              <div class="product-group-item">人像清晰化</div>
              <router-link to="/product/imageProcessing/superResolution"><div class="product-group-item">无损放大</div></router-link>
              <router-link to="/product/imageProcessing/faceBeauty"><div class="product-group-item">智能美颜</div></router-link>
              <router-link to="/product/imageProcessing/colorize"><div class="product-group-item">照片上色</div></router-link>
              <router-link to="/product/artGeneration/anime"><div class="product-group-item">人像卡通化</div></router-link>
            </div>
          </div>
          <div class="product-group">
            <div class="product-group-title"><img :src="product_video" alt="" />AI视频处理</div>
            <div class="product-group-items">
              <div class="product-group-item">视频去重</div>
              <div class="product-group-item">智能配乐</div>
              <div class="product-group-item">智能去文字</div>
              <router-link to="/product/videoProcessing/videoTranslation"><div class="product-group-item">视频翻译</div></router-link>
            </div>
          </div>
          <!--          <div class="product-group">-->
          <!--            <div class="product-group-title"><img :src="product_art" alt="" />AI艺术生成</div>-->
          <!--            <div class="product-group-items">-->
          <!--              <div class="product-group-item">关键词生成画作</div>-->
          <!--              <router-link to="/product/artGeneration/anime"><div class="product-group-item">人像卡通化</div></router-link>-->
          <!--              <div class="product-group-item">图片卡通化</div>-->
          <!--              <div class="product-group-item">图片风格迁移</div>-->
          <!--              <div class="product-group-item">照片变活</div>-->
          <!--            </div>-->
          <!--          </div>-->
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
      <!--      <router-link to="/aiPainting/painting" :append="false"><div class="menu-item menu-text" :class="{ active: router.currentRoute.value.fullPath.startsWith('/aiPainting') }">AI艺术创作</div></router-link>-->
      <div class="menu-item">
        <div class="menu-text">
          <span>AI艺术创作</span>
          <span class="caret caret-down"><CaretDownFilled /></span>
          <span class="caret caret-up"><CaretUpFilled /></span>
        </div>
        <div class="menu-child product menu-hide-ai">
          <div class="product-group">
            <div class="product-group-items">
              <router-link to="/aiPainting/painting"><div class="product-group-item">AI作画</div></router-link>
              <router-link to="/aiPainting/img2img/collection"><div class="product-group-item">图生图</div></router-link>
              <router-link to="/"><div class="product-group-item">梦想生成器</div></router-link>
            </div>
          </div>
        </div>
      </div>
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
    height: 72px;
    display: flex;
    background-color: white;
    // margin-bottom: 2px;
    box-shadow: 0 2px 2px rgb(0 0 0 / 6%);
    z-index: 100;

    .logo {
      width: 284px;
      text-align: right;
      line-height: 72px;

      img {
        display: inline;
      }
      svg{
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
        top: 60px;
        left: calc(50% - 384px);
      }

      .menu-hide-case {
        top: 60px;
        left: calc(50% - 210px);
      }

      .menu-hide-ai {
        top: 60px;
        left: calc(50% + 150px);
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
        color: rgba(0, 0, 0, 0.6);

        .caret {
          font-size: 14px;
          margin-left: 4px;
        }

        .caret-up {
          display: none;
        }
      }

      .menu-text.active {
        color: rgba(0, 53, 240, 1);
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
