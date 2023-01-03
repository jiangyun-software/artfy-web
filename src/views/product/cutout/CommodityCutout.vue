<template>
  <div class="content">
    <div class="top-wrap">
      <div class="top">
        <div class="left">
          <ImageCompareAuto :before="banner[0]" :after="banner[1]" />
        </div>
        <div class="right">
          <div class="title">物体抠图</div>
          <div class="description">智能识别化妆品，服饰，动物，植物等物体，精准保留主体，去除多与背景。 也支持电商用户一键更换白底图。</div>
          <div class="btn-group">
            <Button class="btn-item pcupload btn-upload">
              <span>电脑上传</span>
              <input type="file" accept="image/jpeg, image/png" @change="pcUploadChange($event)" />
            </Button>
            <Button class="btn-item mobileupload" @click="handleMobileUpload">手机上传</Button>
          </div>
          <div class="paste-wrap"><Input class="paste-input" placeholder="CTRL+V粘贴图像或者URL" @paste="handlePaste($event)" /></div>
          <div class="try-content">
            <div class="try-text">试试一下图片看看效果</div>
            <div class="try">
              <img v-for="item in example" :key="item.label" class="try-item" :src="item.value" alt="" @click="tryExample(item)" />
            </div>
          </div>
          <div class="api">通用api ></div>
        </div>
      </div>
    </div>
    <div ref="cutoutWrapRef" class="cutout-wrap">
      <div class="cutout">
        <div class="tools">
          <div class="background">
            <div class="color" :style="background"></div>
            <div class="text">背景<CaretDownFilled /></div>
            <div class="color-list">
              <div class="color-item mask-background" @click="setBackgroundColor('unset0')"></div>
              <div v-for="item in colorList" :key="item" class="color-item" @click="setBackgroundColor(item)" :style="{ 'background-color': item }"></div>
            </div>
          </div>
          <div class="crops">
            <embed class="crop" :src="cutoutToolsCrop1" type="image/svg+xml" @click="activeCrop(0)" :class="{ active: cropActive[0] }" />
            <embed class="crop" :src="cutoutToolsCrop2" type="image/svg+xml" @click="activeCrop(1)" :class="{ active: cropActive[1] }" />
            <embed class="crop" :src="cutoutToolsCrop3" type="image/svg+xml" @click="activeCrop(2)" :class="{ active: cropActive[2] }" />
            <embed class="crop" :src="cutoutToolsCrop4" type="image/svg+xml" @click="activeCrop(3)" :class="{ active: cropActive[3] }" />
            <embed class="crop" :src="cutoutToolsCrop5" type="image/svg+xml" @click="activeCrop(4)" :class="{ active: cropActive[4] }" />
            <embed class="crop" :src="cutoutToolsCrop6" type="image/svg+xml" @click="activeCrop(5)" :class="{ active: cropActive[5] }" />
            <embed class="crop" :src="cutoutToolsCrop7" type="image/svg+xml" @click="activeCrop(6)" :class="{ active: cropActive[6] }" />
            <embed class="crop" :src="cutoutToolsCrop8" type="image/svg+xml" @click="activeCrop(7)" :class="{ active: cropActive[7] }" />
            <embed class="crop" :src="cutoutToolsCrop9" type="image/svg+xml" @click="activeCrop(8)" :class="{ active: cropActive[8] }" />
            <embed class="crop" :src="cutoutToolsCrop10" type="image/svg+xml" @click="activeCrop(9)" :class="{ active: cropActive[9] }" />
            <embed class="crop" :src="cutoutToolsCrop11" type="image/svg+xml" @click="activeCrop(10)" :class="{ active: cropActive[10] }" />
          </div>
        </div>
        <div class="upload">
          <div class="upload-item upload-item-btn">
            <div style="height: 100%; display: flex; align-items: center; justify-content: center">
              <div class="center">
                <div class="cycle"><PlusOutlined /></div>
                <div class="text">上传图片</div>
              </div>
            </div>
            <div class="description">支持jpg、png、bmp格式</div>
            <input type="file" class="filebtn" @change="pcUploadChange($event)" />
          </div>
          <div v-for="(item, index) in imgList" :key="item.url" class="upload-item">
            <div v-if="item.done" class="img-item" :style="background">
              <img :src="item.url" alt="" />
              <div class="img-option img-option-delete" @click="handleDeleteImg(index)"><DeleteOutlined class="img-option-icon" /></div>
              <div class="img-option img-option-download" @click="handleDownloadImg(index)"><DownloadOutlined class="img-option-icon" /></div>
            </div>
            <div v-else class="uploading">
              <Progress type="dashboard" :percent="item.progress" />
              <div v-show="item.progress == 100" style="position: absolute; bottom: 16px; color: white">上传完成，正在识别...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nomore"><div class="text">没有更多了</div></div>
  </div>
  <div ref="modalParent">
    <Modal v-model:visible="mobileUploadModalVisible" :maskClosable="false" title="手机上传" @cancel="onMobileUploadModalClose" :getContainer="() => $refs.modalParent" :footer="null" class="mobileUploadModal" :width="480">
      <div class="upload-qr"><QrcodeVue :value="currentHost + mobileUploadKey" :size="200" /></div>
      <div class="upload-tips">
        <div class="upload-tips-line1">微信扫一扫上传文件</div>
        <div class="upload-tips-line2">* 上传过程中请不要关闭二维码</div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, onMounted, onBeforeMount } from 'vue';
  import { Button, Input, Progress, Modal, message } from 'ant-design-vue';
  import { CaretDownFilled, PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue';
  import cutoutToolsCrop1 from '/@/assets/images/cutout-tools-crop1.svg';
  import cutoutToolsCrop2 from '/@/assets/images/cutout-tools-crop2.svg';
  import cutoutToolsCrop3 from '/@/assets/images/cutout-tools-crop3.svg';
  import cutoutToolsCrop4 from '/@/assets/images/cutout-tools-crop4.svg';
  import cutoutToolsCrop5 from '/@/assets/images/cutout-tools-crop5.svg';
  import cutoutToolsCrop6 from '/@/assets/images/cutout-tools-crop6.svg';
  import cutoutToolsCrop7 from '/@/assets/images/cutout-tools-crop7.svg';
  import cutoutToolsCrop8 from '/@/assets/images/cutout-tools-crop8.svg';
  import cutoutToolsCrop9 from '/@/assets/images/cutout-tools-crop9.svg';
  import cutoutToolsCrop10 from '/@/assets/images/cutout-tools-crop10.svg';
  import cutoutToolsCrop11 from '/@/assets/images/cutout-tools-crop11.svg';
  import cutoutToolsCrop12 from '/@/assets/images/cutout-tools-crop12.svg';
  import { getUploadSingnatureApi, getUploadKeyApi, getUploadFileApi, cutoutApi, uploadImageByUrlApi, getDictDataByTypeApi, downloadUrlApi } from '/@/api/api';
  import axios from 'axios';
  import QrcodeVue from 'qrcode.vue';
  import { useUserStore } from '/@/store/modules/user';
  import ImageCompareAuto from '/@/components/ImageCompareAuto/Index.vue';

  export default defineComponent({
    name: 'CommodityCutout',
    components: { Button, Input, CaretDownFilled, PlusOutlined, Progress, QrcodeVue, Modal, DeleteOutlined, DownloadOutlined, ImageCompareAuto },
    setup() {
      const userStore = useUserStore();

      const imgList = ref<any>([]); // { url: '1', progress: 20 },

      const cropActive = reactive<Array<Boolean>>([false, false, false, false, false, false, false, false, false, false, false]);

      const activeCrop = (i) => {
        cropActive.forEach((item, index) => {
          if (i == index) {
            item = true;
          } else {
            item = false;
          }
          console.log(item);
        });
      };

      const upLoadProgress = ref(0);

      const pcUploadChange = (e) => {
        if (e.target.files.length == 0) {
          return false;
        }
        uploadAndCutout(e.target.files[0]);
      };

      const uploadAndCutout = (data) => {
        getUploadSingnatureApi('universalCutout').then((res) => {
          const image = { url: res.data.url, progress: 0, done: false, id: res.data.id };
          imgList.value.push(image);
          const params = new FormData();
          params.append('key', res.data.key);
          params.append('policy', res.data.policy);
          params.append('OSSAccessKeyId', res.data.OSSAccessKeyId);
          params.append('success_action_status', '200');
          params.append('signature', res.data.signature);
          params.append('file', data);
          axios({
            url: res.data.host,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
            onUploadProgress: function (progress) {
              if (progress.lengthComputable) {
                imgList.value.find((item) => item.url == res.data.url).progress = Math.round((progress.loaded / progress.total) * 100);
              }
            },
          }).then(() => {
            cutoutWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
            cutoutApi({ url: res.data.id, type: 'object' }).then((res3) => {
              const img = imgList.value.find((item) => item.url == res.data.url);
              img.url = res3.data.url;
              img.done = true;
              img.id = res3.data.id;
            });
          });
        });
      };

      const tryExample = (item) => {
        cutoutWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        cutoutApi({ url: item.label, type: 'object' }).then((res) => {
          if (res.code == 200) {
            const image = { url: res.data.url, progress: 100, done: true, id: res.data.id };
            imgList.value.push(image);
          }
        });
      };

      let controller: any = null;
      const handleMobileUpload = async () => {
        const keyResult = await getUploadKeyApi();
        mobileUploadKey.value = keyResult.data;

        let times = 20;
        controller = new AbortController();
        while (times > 0) {
          const result = await getUploadFileApi(keyResult.data, controller);
          if (result.data.status == '0') {
            // 二维码已过期
            message.error('二维码已过期，请重新打开');
            times = 0;
          } else if (result.data.status == '1') {
            // success
            message.success('上传成功');
            const files = result.data.files;
            const fileList = files.map((item) => {
              return { url: item.url, progress: 100, done: false, id: item.id };
            });
            imgList.value.push(...fileList);
            fileList.forEach((item) => {
              cutoutWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
              cutoutApi({ url: item.id, type: 'object' }).then((res) => {
                const img = imgList.value.find((item2) => item2.url == item.url);
                img.url = res.data.url;
                img.done = true;
                img.id = res.data.id;
              });
            });
            mobileUploadKey.value = '';
            times = 0;
          }
          times--;
        }
      };

      const handlePaste = (e) => {
        const paste = e.clipboardData;
        const text = paste.getData('text').trim();
        if (paste.files && paste.files.length > 0 && paste.files[0].type === 'image/png') {
          uploadAndCutout(paste.files[0]);
        } else if (text && text.startsWith('http')) {
          uploadImageByUrlApi(text).then((res) => {
            cutoutWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
            cutoutApi({ url: res.data.id, type: 'object' }).then((res3) => {
              const img = { url: res3.data.url, progress: 100, done: true, id: res3.data.id };
              imgList.value.push(img);
            });
          });
        } else {
          message.error('无法粘贴图片，请确实已截图或复制正确的url');
          return false;
        }
        message.success('图片上传成功');
      };

      const mobileUploadKey = ref('');

      const onMobileUploadModalClose = () => {
        mobileUploadKey.value = '';
        controller.abort();
      };

      const mobileUploadModalVisible = computed(() => {
        return Boolean(mobileUploadKey.value);
      });

      const currentHost = window.location.origin + '/mobileUpload?type=commodityCutout&authorization=' + userStore.getToken + '&key=';

      const handleDeleteImg = (index) => {
        imgList.value.splice(index, 1);
      };

      const handleDownloadImg = (index) => {
        downloadUrlApi(imgList.value[index].id).then((res) => {
          if (res.code == 200) {
            const url = res.data;
            const image = new Image();
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
            image.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = image.width;
              canvas.height = image.height;
              const ctx = canvas.getContext('2d');
              if (backgroundColor.value != 'unset0') {
                ctx!.fillStyle = backgroundColor.value;
                ctx!.beginPath();
                ctx!.fillRect(0, 0, image.width, image.height);
                ctx!.fill();
                ctx!.closePath();
                ctx!.stroke();
              }

              ctx?.drawImage(image, 0, 0, image.width, image.height);

              const url2 = canvas.toDataURL('image/png');
              let a = document.createElement('a');
              a.href = url2;
              a.download = new Date().getTime() + '.png';
              a.click();
              window.URL.revokeObjectURL(url2); // 释放该 url
            };
          }
        });
      };

      const colorList = ref([
        'rgb(255, 255, 255)',
        'rgb(195, 194, 194)',
        'rgb(0, 0, 0)',
        'rgb(156, 39, 176)',
        'rgb(103, 58, 183)',
        'rgb(63, 81, 179)',
        'rgb(33, 150, 243)',
        'rgb(0, 150, 136)',
        'rgb(76, 175, 80)',
        'rgb(205, 220, 57)',
        'rgb(244, 67, 54)',
        'rgb(244, 130, 54)',
        'rgb(244, 219, 54)',
        'rgb(230, 83, 83)',
        'rgb(255, 216, 53)',
        'rgb(112, 188, 89)',
        'rgb(96, 122, 244)',
        'rgb(151, 107, 238)',
      ]);
      const backgroundColor = ref('unset0');
      const background = computed(() => {
        return backgroundColor.value == 'unset0' ? {} : { background: backgroundColor.value };
      });
      const setBackgroundColor = (color) => {
        backgroundColor.value = color;
      };

      const bannerIndex = ref(0);
      const banner = ['https://jyzn-prod.oss-cn-shanghai.aliyuncs.com/images/commodityCutout-banner01-raw.png', 'https://jyzn-prod.oss-cn-shanghai.aliyuncs.com/images/commodityCutout-banner01-cutout.png'];

      const cutoutWrapRef = ref();

      onMounted(() => {
        setInterval(() => {
          bannerIndex.value = bannerIndex.value == banner.length - 1 ? 0 : bannerIndex.value + 1;
        }, 1000);
      });

      const example = ref<any>([]);

      onBeforeMount(() => {
        getDictDataByTypeApi('example_commodityCutout').then((res) => {
          if (res.code == 200) {
            example.value = res.data.map((item) => {
              return { label: item.dictLabel, value: item.dictValue };
            });
          }
        });
      });

      return {
        imgList,
        cutoutToolsCrop1,
        cutoutToolsCrop2,
        cutoutToolsCrop3,
        cutoutToolsCrop4,
        cutoutToolsCrop5,
        cutoutToolsCrop6,
        cutoutToolsCrop7,
        cutoutToolsCrop8,
        cutoutToolsCrop9,
        cutoutToolsCrop10,
        cutoutToolsCrop11,
        cutoutToolsCrop12,
        activeCrop,
        cropActive,
        pcUploadChange,
        handleMobileUpload,
        handlePaste,
        upLoadProgress,
        mobileUploadKey,
        onMobileUploadModalClose,
        currentHost,
        mobileUploadModalVisible,
        handleDeleteImg,
        handleDownloadImg,
        colorList,
        backgroundColor,
        background,
        setBackgroundColor,
        bannerIndex,
        banner,
        example,
        tryExample,
        cutoutWrapRef,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    .top-wrap {
      background-color: white;
      padding: 90px 0px;
      .top {
        margin: auto;
        width: 1200px;
        display: flex;

        .left {
          width: 520px;

          .banner {
            width: 520px;
            height: 520px;
            background-image: url('/@/assets/images/mask-background.jpg');
            position: relative;

            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
              position: absolute;
            }
          }
        }
        .right {
          flex: 1;
          padding: 0px 130px 0px 130px;
          .title {
            font-size: 70px;
            font-weight: 600;
            font-family: 'OPPOSans';
            line-height: 70px;
          }

          .description {
            margin-top: 16px;
            color: rgba(0, 0, 0, 0.5);
          }
          .btn-group {
            margin-top: 28px;
            display: flex;
            justify-content: space-between;

            .btn-item {
              width: 200px;
              height: 72px;
              font-size: 20px;
              border-width: 1px;
              border-radius: 8px;
            }
            .pcupload {
              background-color: black;
              color: white;
            }
            .mobileupload {
              color: black;
              border-color: black;
              margin-left: 12px;
            }
          }

          .paste-wrap {
            margin-top: 20px;

            .paste-input {
              display: inline-block;
              height: 56px;
              background: rgba(0, 0, 0, 0.06);
              border-radius: 8px;
              border: none;
              font-size: 18px;
            }

            .paste-input:focus {
              border-color: #dee0e2;
              box-shadow: 0 0 0 2px rgba(230, 231, 233, 0.2);
            }

            .paste-input::-webkit-input-placeholder {
              font-size: 18px;
            }
          }

          .try-content {
            background: #e9e9e9;
            border-radius: 4px;
            padding: 16px 20px;
            margin-top: 28px;

            .try-text {
              font-size: 12px;
            }

            .try {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 16px;

              .try-item {
                cursor: pointer;
                width: 60px;
                height: 60px;
                border-radius: 4px;
                border: 1px solid black;
              }
            }
          }

          .api {
            color: red;
            font-size: 18px;
            margin-top: 16px;
            cursor: pointer;
          }
        }
      }
    }

    .cutout-wrap {
      margin-top: 36px;
      .cutout {
        background-color: white;
        width: 1200px;
        margin: auto;

        .tools {
          background: #e9e9e9;
          padding: 20px 24px;
          display: flex;

          .background {
            width: 112px;
            height: 48px;
            padding: 12px 16px;
            background-color: white;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 4px;
            position: relative;

            :deep(span.anticon:not(.app-iconify)) {
              vertical-align: middle !important;
            }

            .color-list {
              display: none;
              text-align: center;
              width: 412px;
              position: absolute;
              top: 48px;
              left: 0px;
              padding: 16px;
              background-color: white;
              z-index: 100;
              flex-wrap: wrap;
              box-shadow: 0 0 10px #eee;

              .color-item {
                width: 32px;
                height: 32px;
                margin: 3px;
                border: 1px solid #c7c7c7;
              }
            }

            .color {
              background-image: url('/src/assets/images/mask-background.jpg');
              background-size: 280px;
              border-radius: 4px;
              width: 24px;
              height: 24px;
            }

            .text {
              color: rgba(0, 0, 0, 0.4);
              margin-left: 12px;
            }
          }

          .background:hover .color-list {
            display: flex;
          }

          .crops {
            display: inline-flex;
            justify-content: flex-start;
            margin-left: 8px;

            .crop {
              margin: 0px 8px;
            }
          }
        }

        .upload {
          padding: 14px;
          display: flex;
          flex-wrap: wrap;

          .upload-item-btn {
            background: #f8f8f8;
            position: relative;

            .center {
              display: inline-flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .cycle {
                background-color: #ffcd1a;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .text {
                margin-top: 9px;
              }
            }

            .description {
              position: absolute;
              width: 100%;
              bottom: 16px;
              text-align: center;
              font-size: 12px;
              opacity: 40%;
            }

            .filebtn {
              height: 100%;
              width: 100%;
              opacity: 0;
              position: absolute;
              top: 0px;
              left: 0px;
              cursor: pointer;
            }
          }

          .upload-item {
            width: 214px;
            height: 214px;
            margin: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            .uploading {
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            .img-item {
              width: 100%;
              height: 100%;
              position: relative;
              background-image: url('/src/assets/images/mask-background.jpg');

              .img-option {
                width: 32px;
                height: 32px;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 2px;
                display: none;
                cursor: pointer;
                align-items: center;
                justify-content: center;
              }

              .img-option-delete {
                position: absolute;
                top: 10px;
                right: 10px;
              }

              .img-option-download {
                position: absolute;
                bottom: 10px;
                right: 10px;
              }

              .img-option-icon {
                font-size: 20px;
                color: white;
              }
            }

            .img-item:hover .img-option {
              display: inline-flex;
            }
          }
        }
      }
    }

    .nomore {
      .text {
        font-size: 12px;
        padding: 60px 0px;
        text-align: center;
        background-color: white;
        color: rgba(0, 0, 0, 0.4);
        width: 1200px;
        margin: auto;
      }
    }
  }

  .btn-upload {
    position: relative;

    input {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      cursor: pointer;
      font-size: 0px;
    }
  }

  :deep(.mobileUploadModal .ant-modal-content) {
    border-radius: 8px;
    overflow: hidden;
  }

  :deep(.mobileUploadModal .ant-modal-header) {
    padding: 36px 12px 0px 12px;
    border-bottom: 0px;

    .ant-modal-title {
      border-bottom: 1px solid #f0f0f0;
      padding: 0px 0px 24px 24px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
    }
  }

  :deep(.mobileUploadModal .ant-modal-close) {
    top: 24px;
    right: 12px;
  }

  .upload-qr {
    text-align: center;
    margin-top: 66px;

    canvas {
      display: inline-block;
    }
  }

  .upload-tips {
    text-align: center;
    margin-top: 24px;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 76px;

    .upload-tips-line1 {
      color: #000000;
    }

    .upload-tips-line2 {
      color: #ff0000;
    }
  }

  .mask-background {
    background-image: url('/src/assets/images/mask-background.jpg');
  }
</style>
