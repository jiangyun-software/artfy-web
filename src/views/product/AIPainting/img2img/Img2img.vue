<template>
  <div class="img2img">
    <div class="top">
      <div class="left">
        <img v-show="params.initImage" :src="params.initImage" class="image" alt="" />
        <div v-show="!params.initImage" class="upload-none">
          <div class="upload-icon"><img :src="plusIcon" alt="" /></div>
          <div class="upload-tips">上传参考图</div>
        </div>
        <input class="upload-btn" type="file" accept="image/jpeg,image/png" @change="changeReferenceImage" />
      </div>
      <div class="right">
        <div class="title-wrap">
          <div class="setting-title">
            <div class="divider-left"></div>
            <div class="title-text">风格选择</div>
          </div>
          <div class="scroll-btn-group">
            <button @click="scroll(-1)"><img :src="leftIcon" /></button>
            <button @click="scroll(1)"><img :src="leftIcon" style="transform: rotate(180deg)" /></button>
          </div>
        </div>
        <div ref="styleContainer" class="style-container">
          <div v-for="item in styleList" :key="item.id" class="style-item" :class="{ active: item.active }" @click="selectStyle(item)">
            <img :src="item.image" alt="" />
            <div class="style-item-label">{{ item.label }}</div>
          </div>
        </div>
        <div class="setting-title" style="margin-top: 24px">
          <div class="divider-left"></div>
          <div class="title-text">参考图差异度</div>
        </div>
        <div class="guidanceScale">
          <Slider v-model:value="params.guidanceScale" class="slider" :min="1" :max="100" :step="1" />
          <div class="slider-view">{{ params.guidanceScale }}%</div>
        </div>
        <button class="btn-submit" @click="submit">
          立即生成
          <span class="point">{{ params.totalPoint }}点</span>
        </button>
      </div>
    </div>
    <div class="content">
      <div class="menu">
        <div class="tabs">
          <!-- <div class="tabs-item" :class="{ active: router.currentRoute.value.fullPath == '/AIPainting/painting' }">AI作画</div> -->
          <router-link to="/aiPainting/img2img/collection">
            <button :class="{ active: router.currentRoute.value.fullPath == '/aiPainting/img2img/collection' }">
              <img v-if="router.currentRoute.value.fullPath == '/aiPainting/img2img/collection'" :src="collectionIcon_black" />
              <img v-else :src="collectionIcon_white" />
              集合
            </button>
          </router-link>
          <router-link to="/aiPainting/img2img/collect">
            <button style="margin-left: 16px" :class="{ active: router.currentRoute.value.fullPath == '/aiPainting/img2img/collect' }">
              <img v-if="router.currentRoute.value.fullPath == '/aiPainting/img2img/collect'" :src="starIcon_black" />
              <img v-else :src="starIcon_white" />
              收藏
            </button>
          </router-link>
        </div>
      </div>
      <div class="images">
        <RouterView>
          <template #default="{ Component, route }">
            <component ref="child" :is="Component" :key="route.fullPath" />
          </template>
        </RouterView>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, onBeforeMount } from 'vue';
  import { Slider, message } from 'ant-design-vue';
  import { getUploadSingnatureApi, aiPaintingStyleApi, img2imgSubmitApi } from '/@/api/api';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import leftIcon from '/@/assets/icons/left.svg';
  import collectionIcon_black from '/@/assets/icons/collection-black.svg';
  import collectionIcon_white from '/@/assets/icons/collection-white.svg';
  import starIcon_white from '/@/assets/icons/star-white.svg';
  import starIcon_black from '/@/assets/icons/star-black.svg';
  import plusIcon from '/@/assets/icons/plus.svg';

  export default defineComponent({
    name: 'Img2img',
    components: { Slider },
    setup() {
      const router = useRouter();

      const params = reactive({
        initImage: '',
        guidanceScale: 60,
        style: { id: 0 },
        totalPoint: 2,
      });

      const styleList = ref<any>([]);

      const getPaintingStyle = () => {
        aiPaintingStyleApi('1').then((res) => {
          if (res.code == 200) {
            res.data[0].active = true;
            styleList.value = res.data;
            params.style.id = res.data[0].id;
          }
        });
      };

      const selectStyle = (style) => {
        styleList.value.find((item) => item.active).active = false;
        style.active = true;
        params.style.id = style.id;
      };

      const styleContainer = ref();
      let scrollValue = 0;
      const scroll = (v) => {
        scrollValue = scrollValue + v * 110 * 3;
        styleContainer.value.scrollLeft = scrollValue;
        scrollValue = styleContainer.value.scrollLeft;
      };

      const changeReferenceImage = (e) => {
        const fileType = e.target.files[0].type;
        if (fileType != 'image/jpeg' && fileType != 'image/png') {
          message.error('图片类型不支持');
          return false;
        }
        getUploadSingnatureApi('img2img').then((res) => {
          const p = new FormData();
          p.append('key', res.data.key);
          p.append('policy', res.data.policy);
          p.append('OSSAccessKeyId', res.data.OSSAccessKeyId);
          p.append('success_action_status', '200');
          p.append('signature', res.data.signature);
          p.append('file', e.target.files[0]);
          axios({
            url: res.data.host,
            method: 'post',
            data: p,
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
          }).then(() => {
            params.initImage = res.data.url;
          });
        });
      };

      const submiting = ref(false);

      const submit = () => {
        if (submiting.value) {
          return false;
        }

        submiting.value = true;
        img2imgSubmitApi(params).then((res) => {
          if (res.code == 200) {
            message.success('提交成功，正在作画，请稍后');
            child.value.getList();
          }
          submiting.value = false;
        });
      };

      const child = ref();

      onBeforeMount(() => {
        getPaintingStyle();
      });

      return {
        router,
        params,
        styleList,
        scroll,
        styleContainer,
        selectStyle,
        plusIcon,
        collectionIcon_black,
        collectionIcon_white,
        starIcon_white,
        starIcon_black,
        leftIcon,
        changeReferenceImage,
        submit,
        child,
      };
    },
  });
</script>
<style lang="less" scoped>
  .img2img {
    .top {
      background: #292929;
      display: flex;
      padding: 24px;
      .left {
        width: 230px;
        height: 230px;
        border-radius: 4px;
        overflow: hidden;
        background-color: black;
        position: relative;

        .image {
          width: 100%;
          height: 100%;
          object-fit: scale-down;
        }

        .upload-none {
          position: absolute;
          text-align: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          .upload-icon {
            text-align: center;
            img {
              display: inline-block;
            }
          }

          .upload-tips {
            color: white;
          }
        }

        .upload-btn {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          font-size: 0px;
          cursor: pointer;
          opacity: 0;
        }
      }
      .right {
        flex: 1;
        padding-left: 48px;
        overflow: auto;
        position: relative;

        .title-wrap {
          display: flex;
          justify-content: space-between;
        }

        .setting-title {
          display: flex;
          align-items: center;
          .divider-left {
            width: 4px;
            height: 16px;
            margin-right: 8px;
            border-radius: 4px;
            background-color: #8aff00;
          }

          .title-text {
            color: white;
            font-size: 16px;
            font-weight: 500;
          }
        }

        .scroll-btn-group {
          button {
            width: 60px;
            height: 26px;
            margin: 0px 6px;
            color: white;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;

            img {
              display: inline-block;
              color: red;
            }
          }
        }

        .style-container {
          display: flex;
          margin-top: 16px;
          gap: 16px;
          overflow: auto;
          .style-item {
            width: 94px;
            height: 94px;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            flex: none;

            .style-item-label {
              position: absolute;
              left: 0;
              bottom: 0;
              background-color: #fff;
              padding: 2px 10px;
              font-weight: 400;
              font-size: 12px;
              text-align: center;
              color: #000;
              border-top-right-radius: 4px;
            }
          }

          .style-item.active {
            border: solid 1px #8aff00;
            .style-item-label {
              background: #8aff00;
            }
          }
        }

        .style-container::-webkit-scrollbar {
          display: none;
        }

        .guidanceScale {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;

          :deep(.slider) {
            width: 220px;
            .ant-slider-handle {
              background: url('/@/assets/icons/slider-handle.png') !important;
              overflow: visible;
              margin-top: -8px;
              width: 22px;
              height: 22px;
              background-color: none !important;
              z-index: 2;
            }

            .ant-slider-track {
              background-color: #8aff00 !important;
              z-index: 1;
            }

            .ant-slider-rail {
              background-color: black;
            }

            .ant-slider-step {
              background: rgba(255, 255, 255, 0.3) !important;
            }
          }

          .slider-view {
            display: inline-block;
            width: 64px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: white;
            font-weight: 600;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
          }
        }

        .btn-submit {
          width: 200px;
          font-weight: 400;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #8aff00;
          border-radius: 4px;
          height: 48px;
          position: absolute;
          bottom: 0px;
          right: 0px;

          .point {
            margin-left: 16px;
            background: #ffcd1a;
            border: 1px solid #000000;
            border-radius: 14px;
            width: 48px;
            height: 26px;
          }
        }
      }
    }

    .content {
      padding: 24px;
      .menu {
        .tabs {
          button {
            width: 126px;
            height: 40px;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;

            img,
            svg {
              width: 18px;
              height: 18px;
              margin-right: 8px;
            }
          }

          .active {
            background: #8aff00;
            color: black;
          }
        }
      }

      .images {
        margin-top: 12px;
        margin-left: -12px;
      }
    }
  }
</style>
