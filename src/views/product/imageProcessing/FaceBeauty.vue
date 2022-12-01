<template>
  <div class="content">
    <div class="top-wrap">
      <div class="top">
        <div class="left">
          <ImageCompare style="width: 520px; height: 520px" :before="banner.before" :after="banner.after" />
        </div>
        <div class="right">
          <div class="title">智能美肤</div>
          <div class="description">美化人像图片，在美白的同时保留皮肤质感，并去除面部瑕疵，还原你的真实美丽。</div>
          <div class="btn-group">
            <Button class="btn-item pcupload btn-upload">
              <span>电脑上传</span>
              <input type="file" @change="pcUploadChange($event)" />
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
    <div ref="imagesRef" v-show="imageInfo.progress" class="images">
      <div class="images-top">
        <Button class="btn-download jy-btn-blue" @click="handleDownloadImg">
          <template #icon>
            <img class="btn-icon" :src="downloadIcon" alt="" />
          </template>
          下载
        </Button>
      </div>
      <div class="params-wrap">
        <div class="params">
          <div class="params-item">
            <div class="params-label">锐化（清晰度）程度</div>
            <div class="params-value"><Slider class="size" v-model:value="params.sharp" :min="0" :max="1" :step="0.1" /></div>
          </div>
          <div class="params-item">
            <div class="params-label">平滑程度</div>
            <div class="params-value"><Slider class="size" v-model:value="params.smooth" :min="0" :max="1" :step="0.1" /></div>
          </div>
          <div class="params-item">
            <div class="params-label">美白程度</div>
            <div class="params-value"><Slider class="size" v-model:value="params.white" :min="0" :max="1" :step="0.1" /></div>
          </div>
        </div>
        <div class="params-submit"><Button class="jy-btn-blue-out submit-btn" @click="process">提交参数</Button></div>
      </div>
      <div class="images-content">
        <div class="images-content-left">
          <div class="images-label">原图</div>
          <div class="img-wrap">
            <img v-if="imageInfo.progress == 100" :src="imageInfo.url" alt="" />
            <div v-else class="uploading"><Progress type="dashboard" :percent="imageInfo.progress" /></div>
          </div>
        </div>
        <div class="images-content-right">
          <div class="images-label">预览图</div>
          <div class="img-wrap">
            <img v-if="imageInfo.beautyUrl" :src="imageInfo.beautyUrl" alt="" />
            <div v-else class="loading"><LoadingOutlined class="loading-icon" /></div>
            <div v-if="processing" class="loading"><LoadingOutlined class="loading-icon" /></div>
          </div>
        </div>
      </div>
    </div>
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
  import { defineComponent, reactive, ref, computed, onBeforeMount } from 'vue';
  import { Button, Input, Progress, Modal, message, Slider } from 'ant-design-vue';
  import imgDivider from '/@/assets/images/img-divider.png';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import deleteIcon from '/@/assets/svg/delete.svg';
  import downloadIcon from '/@/assets/svg/download.svg';
  import { getUploadSingnatureApi, getUploadKeyApi, getUploadFileApi, faceBeautyApi, uploadImageByUrlApi, getDictDataByTypeApi } from '/@/api/api';
  import axios from 'axios';
  import QrcodeVue from 'qrcode.vue';
  import { useUserStore } from '/@/store/modules/user';
  import ImageCompare from '/@/components/ImageCompare/Index.vue';

  export default defineComponent({
    name: 'FaceBeauty',
    components: { Button, Input, QrcodeVue, Modal, LoadingOutlined, Progress, ImageCompare, Slider },
    setup() {
      const imageInfo = reactive({
        id: '',
        url: '',
        progress: 0,
        beautyUrl: '',
      });

      const params = reactive({
        url: '',
        sharp: 0.5,
        smooth: 0.5,
        white: 0.5,
      });

      const userStore = useUserStore();

      const pcUploadChange = (e) => {
        if (e.target.files.length == 0) {
          return false;
        }
        uploadAndProcess(e.target.files[0]);
      };

      const uploadAndProcess = (data) => {
        getUploadSingnatureApi('colorize').then((res) => {
          imageInfo.progress = 0;
          imageInfo.beautyUrl = '';
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
                imageInfo.progress = Math.round((progress.loaded / progress.total) * 100);
              }
            },
          }).then(() => {
            imageInfo.url = res.data.url;
            imageInfo.id = res.data.id;
            process();
          });
        });
      };

      const processing = ref(false);
      const process = () => {
        imagesRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        processing.value = true;
        params.url = imageInfo.id;
        faceBeautyApi(params).then((res) => {
          imageInfo.beautyUrl = res.data.url;
          imageInfo.id = res.data.id;
          processing.value = false;
        });
      };

      const tryExample = (item) => {
        imageInfo.id = item.label;
        imageInfo.url = item.value;
        imageInfo.progress = 100;
        process();
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
            imageInfo.url = result.data.files[0].url;
            imageInfo.progress = 100;
            imageInfo.id = result.data.files[0].id;
            process();
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
          uploadAndProcess(paste.files[0]);
        } else if (text && text.startsWith('http')) {
          uploadImageByUrlApi(text).then((res) => {
            imageInfo.url = res.data;
            imageInfo.progress = 100;
            process();
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

      const currentHost = window.location.origin + '/mobileUpload?type=faceBeauty&authorization=' + userStore.getToken + '&key=';

      const handleDownloadImg = () => {
        if (!imageInfo.beautyUrl) {
          message.warning('请上传图片');
          return false;
        }
        let a = document.createElement('a');
        a.href = imageInfo.beautyUrl;
        a.download = new Date().getTime() + '.png';
        a.click();
      };

      const banner = { before: 'https://jyzn-prod.oss-cn-shanghai.aliyuncs.com/images/faceBeauty-banner01-before.jpg', after: 'https://jyzn-prod.oss-cn-shanghai.aliyuncs.com/images/faceBeauty-banner01-after.jpg' };

      const imagesRef = ref();

      const example = ref<any>([]);

      onBeforeMount(() => {
        getDictDataByTypeApi('example_faceBeauty').then((res) => {
          if (res.code == 200) {
            example.value = res.data.map((item) => {
              return { label: item.dictLabel, value: item.dictValue };
            });
          }
        });
      });

      return {
        imageInfo,
        imgDivider,
        pcUploadChange,
        handleMobileUpload,
        handlePaste,
        mobileUploadKey,
        onMobileUploadModalClose,
        currentHost,
        mobileUploadModalVisible,
        handleDownloadImg,
        deleteIcon,
        downloadIcon,
        banner,
        example,
        tryExample,
        params,
        process,
        processing,
        imagesRef,
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

    .images {
      width: 1200px;
      margin: 36px auto 0px auto;
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);

      .images-top {
        padding: 20px;
        text-align: right;

        .btn-download {
          width: 96px !important;
          height: 48px !important;
          font-size: 14px !important;
          padding: 0px !important;

          .btn-icon {
            display: inline-block;
            margin-right: 8px;
          }
        }
      }

      .params-wrap {
        background-color: white;
        padding: 42px;

        .params {
          display: inline-flex;
          width: 900px;
          justify-content: space-between;

          .params-item {
            display: flex;
            align-items: center;

            .params-value {
              width: 200px;
              padding-left: 12px;
            }
          }
        }

        .params-submit {
          display: inline-block;
          width: 190px;
          text-align: right;
          padding-right: 26px;

          .submit-btn {
            font-size: 14px !important;
            padding: 8px 16px !important;
            border-radius: 4px !important;
          }
        }
      }

      .images-content {
        background-color: white;
        padding: 0px 88px 80px 88px;
        display: flex;
        justify-content: space-between;

        .images-content-left,
        .images-content-right {
          width: 440px;
          height: 500px;
          position: relative;
          border: 1px solid #ededed;
        }

        .img-wrap {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: white;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .images-label {
          position: absolute;
          top: 0px;
          left: 0px;
          writing-mode: vertical-lr;
          transform: translate(-46px, -1px);
          background-color: #e9e9e9;
          border-radius: 8px;
          width: 54px;
          height: 84px;
          padding: 0px 20px 0px 12px;
          text-align: center;
          letter-spacing: 4px;
        }

        .uploading {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .loading {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          .loading-icon {
            font-size: 72px;
            color: rgba(0, 0, 0, 0.7);
          }
        }
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
