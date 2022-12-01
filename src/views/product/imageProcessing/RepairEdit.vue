<template>
  <div class="content" @keydown="spaceDown0" @keyup.space="spaceUp0">
    <div class="top-wrap">
      <div class="top">
        <div class="left">
          <video class="banner" playsinline="true" autoplay="true" muted="false" loop="true">
            <source :src="banner" type="video/mp4" />
          </video>
        </div>
        <div class="right">
          <div class="title">涂抹修复/去水印</div>
          <div class="description">遮雀斑，去瑕疵，删除照片中任何不想要的物体，水印，人物或文字。达到毫无痕迹的效果。</div>
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
    <div ref="repairWrapRef" class="repair-wrap" v-show="img.url">
      <div class="repair">
        <div class="top">
          <Button class="btn-delete" @click="delete0">
            <template #icon>
              <DeleteOutlined />
            </template>
            删除
          </Button>
          <Button class="btn-download" @click="handleDownloadImg">
            <template #icon>
              <DownloadOutlined />
            </template>
            下载
          </Button>
        </div>
        <div class="history">
          <Button class="btn-prev" type="link" @click="prev" :disabled="historys.current == 0 || historys.current == -1">
            <template #icon>
              <!-- <DeleteOutlined /> -->
            </template>
            上一步
          </Button>
          <Button class="btn-next" type="link" @click="next" :disabled="historys.current == -1 || historys.current == historys.list.length - 1">
            <template #icon>
              <!-- <DownloadOutlined /> -->
            </template>
            下一步
          </Button>
          <Button class="btn-next" type="link" @click="reset" style="display: none">
            <template #icon>
              <!-- <DownloadOutlined /> -->
            </template>
            重置
          </Button>
        </div>
        <div ref="contentRef" class="content" @mousemove="onMouseMove">
          <div rer="imgWrapRef" class="img-wrap" @mousewheel.prevent="onmousewheel">
            <div
              ref="imgRef"
              class="img"
              @mousedown="start"
              @mousemove="draw"
              @mouseup="end"
              :style="{ width: imageWidth * (zoom / 100) + 'px', height: imageHeight * (zoom / 100) + 'px', cursor: spaceDown ? 'move' : 'unset', left: 'calc(50% + ' + dragPos.x + 'px)', top: 'calc(50% + ' + dragPos.y + 'px)' }"
            >
              <canvas ref="canvas1Ref" class="canvas1" :width="imageWidth" :height="imageHeight"></canvas>
              <canvas ref="canvas3Ref" class="canvas3" :width="maskWidth" :height="maskHeight" :style="{ width: '100%', height: '100%' }"></canvas>
              <canvas ref="canvas2Ref" class="canvas2" :width="imageWidth" :height="imageHeight"></canvas>
              <div ref="penRef" class="pen" :style="{ width: penSize1 + 'px', height: penSize1 + 'px' }"></div>
            </div>
            <div v-show="loading" class="loading-wrap">
              <LoadingOutlined class="loading" />
              <div class="loading-text">正在处理...</div>
            </div>
          </div>
        </div>
        <div class="tools-wrap">
          <div class="tools">
            <div class="tool-option">
              <Button class="btn-option" style="margin-right: 16px; display: none" :class="{ active: model == 1 }" @click="changeModel(1)">勾选修复</Button>
              <Button class="btn-option" :class="{ active: model == 2 }" @click="changeModel(2)">涂抹修复</Button>
            </div>
            <div v-show="model == 2" class="pen-size">
              <div class="text">画笔大小</div>
              <Slider class="size" v-model:value="penSize" :min="10" :max="100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="modalParent">
    <Modal v-model:visible="mobileUploadModalVisible" :maskClosable="false" title="手机上传" @cancel="onMobileUploadModalClose" :getContainer="() => $refs.modalParent" :footer="null" class="jy-modal" :width="480">
      <div class="upload-qr"><QrcodeVue :value="currentHost + mobileUploadKey" :size="200" /></div>
      <div class="upload-tips">
        <div class="upload-tips-line1">微信扫一扫上传文件</div>
        <div class="upload-tips-line2">* 上传过程中请不要关闭二维码</div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, onMounted, nextTick, onBeforeMount } from 'vue';
  import { Button, Input, Progress, Modal, message, Slider } from 'ant-design-vue';
  import universalCutoutExample1 from '/@/assets/images/universalCutoutExample1.png';
  import universalCutoutTry1 from '/@/assets/images/universalCutoutTry1.png';
  import universalCutoutTry2 from '/@/assets/images/universalCutoutTry2.png';
  import universalCutoutTry3 from '/@/assets/images/universalCutoutTry3.png';
  import { CaretDownFilled, PlusOutlined, LoadingOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons-vue';
  import { getUploadKeyApi, getUploadFileApi, repairApi, getUploadSingnatureApi, getDictDataByTypeApi, downloadUrlApi } from '/@/api/api';
  import axios from 'axios';
  import QrcodeVue from 'qrcode.vue';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'RepairEdit',
    components: { Button, Input, CaretDownFilled, PlusOutlined, LoadingOutlined, Progress, QrcodeVue, Modal, DeleteOutlined, DownloadOutlined, Slider },
    setup() {
      const repairParams = {
        data: '',
      };

      const userStore = useUserStore();

      const img = reactive({
        id: '',
        url: '',
        progress: 0,
        done: false,
      });

      const upLoadProgress = ref(0);

      const penSize = ref(50);
      const penSize1 = computed(() => {
        return (penSize.value * zoom.value) / 100;
      });

      const pcUploadChange = (e) => {
        if (e.target.files.length == 0) {
          return false;
        }
        uploadAndCutout(e.target.files[0]);
      };

      const uploadAndCutout = (data) => {
        getUploadSingnatureApi('repair').then((res) => {
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
                img.progress = Math.round((progress.loaded / progress.total) * 100);
              }
            },
          }).then(() => {
            img.url = res.data.url;
            img.id = res.data.id;
            doRepair();
          });
        });
      };

      const doRepair = () => {
        // if (url.indexOf('?') == -1) {
        //   url += '?t=' + Math.random();
        // }
        repairParams.data = img.id;
        var image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = img.url;
        historys.list = [{ id: img.id, url: img.url }];
        historys.current = 0;
        image.onload = () => {
          const zw = (image.width / imageWidth.value) * 100;
          const zh = (image.height / imageHeight.value) * 100;
          if (zw > 100 || zh > 100) {
            if (zw > zh) {
              imageWidth.value = 748;
              imageZoom.value = (1 - (image.width - imageWidth.value) / image.width) * 100;
              imageHeight.value = image.height * (1 - (image.width - imageWidth.value) / image.width);
            } else {
              imageHeight.value = 524;
              imageZoom.value = (1 - (image.height - imageHeight.value) / image.height) * 100;
              imageWidth.value = image.width * (1 - (image.height - imageHeight.value) / image.height);
            }
          } else {
            imageWidth.value = image.width;
            imageHeight.value = image.height;
            imageZoom.value = 100;
          }

          maskWidth.value = image.width;
          maskHeight.value = image.height;

          nextTick(() => {
            ctx.value.drawImage(image, 0, 0, imageWidth.value, imageHeight.value);

            initMask();

            repairWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        };
      };

      const tryExample = (item) => {
        img.id = item.label;
        img.url = item.value;
        doRepair();
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
            img.id = result.data.files[0].id;
            img.url = result.data.files[0].url;
            img.progress = 100;
            img.done = true;
            doRepair();
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
          img.url = text;
          img.progress = 100;
          img.done = true;
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

      const currentHost = window.location.origin + '/mobileUpload?type=repair&authorization=' + userStore.getToken + '&key=';

      const handleDownloadImg = () => {
        downloadUrlApi(img.id).then((res) => {
          axios.get(res.data, { responseType: 'blob' }).then((res1) => {
            let blob = new Blob([res1.data], { type: 'image/png' });
            let href = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = href;
            a.download = new Date().getTime() + '.png';
            a.click();
          });
        });
      };

      const canvas1Ref = ref();
      const canvas2Ref = ref();
      const canvas3Ref = ref();
      const ctx = ref<any>();
      const ctx2 = ref<any>();
      const ctx3 = ref<any>();
      const penRef = ref();
      const contentRef = ref();
      const imgRef = ref();
      const imgWrapRef = ref();

      const getPos = (e) => {
        let tx, ty;
        var rect = imgRef.value.getBoundingClientRect();
        if (model.value == 1) {
          tx = e.pageX - rect.x - 226;
          ty = e.pageY - rect.y - 80;
        } else if (model.value == 2) {
          tx = e.pageX - rect.x;
          ty = e.pageY - rect.y;
        }
        return {
          x: tx,
          y: ty,
        };
      };

      const onMouseMove = (e) => {
        const pos = getPos(e);
        if (model.value == 2 && !loading.value) {
          penRef.value.style.left = pos.x - (penSize.value * (zoom.value / 100)) / 2 + 'px';
          penRef.value.style.top = pos.y - (penSize.value * (zoom.value / 100)) / 2 + 'px';
        }
      };

      let mousePress = false;
      let lastPos: any = null;
      let beginPos: any = null;

      const start = (e) => {
        mousePress = true;
        if (spaceDown.value) {
          return false;
        }
        if (beginPos == null) {
          beginPos = getPos(e);
        }
        if (model.value == 2) {
          const now = getPos(e);
          // const x = lastPos.x - (748 * zoom.value) / 100 / 2;
          // const y = lastPos.y - (524 * zoom.value) / 100 / 2;
          const x = now.x;
          const y = now.y;

          ctx2.value.fillStyle = 'rgb(89, 142, 238)';

          ctx2.value.beginPath();
          ctx2.value.arc(x / (zoom.value / 100), y / (zoom.value / 100), penSize.value / 2, 0, 2 * Math.PI, true);
          ctx2.value.fill();

          ctx3.value.beginPath();
          ctx3.value.arc(x / (zoom.value / 100) / (imageZoom.value / 100), y / (zoom.value / 100) / (imageZoom.value / 100), penSize.value / (imageZoom.value / 100) / 2, 0, 2 * Math.PI, true);
          ctx3.value.fill();
        }
      };

      const dragPos = reactive({
        x: 0,
        y: 0,
      });

      let lastDragPost: any = null;

      const draw = (e) => {
        if (mousePress) {
          if (spaceDown.value) {
            const nowDragPos = getPos1(e);
            if (lastDragPost != null) {
              const moveX = nowDragPos.x - lastDragPost.x;
              const moveY = nowDragPos.y - lastDragPost.y;

              dragPos.x = dragPos.x + moveX;
              dragPos.y = dragPos.y + moveY;
            }
            lastDragPost = nowDragPos;
          } else {
            if (model.value == 2) {
              const now = getPos(e);
              if (lastPos != null) {
                const x = lastPos.x;
                const y = lastPos.y;

                ctx2.value.fillStyle = 'rgb(89, 142, 238)';

                ctx2.value.beginPath();
                ctx2.value.arc(x / (zoom.value / 100), y / (zoom.value / 100), penSize.value / 2, 0, 2 * Math.PI, true);
                ctx2.value.fill();

                ctx3.value.beginPath();
                ctx3.value.arc(x / (zoom.value / 100) / (imageZoom.value / 100), y / (zoom.value / 100) / (imageZoom.value / 100), penSize.value / (imageZoom.value / 100) / 2, 0, 2 * Math.PI, true);
                ctx3.value.fill();
              }

              lastPos = now;
            }
          }
        }
      };

      const end = () => {
        if (!spaceDown.value) {
          if (model.value == 1) {
            close();
          } else if (model.value == 2) {
            loading.value = true;
            canvas3Ref.value.toBlob(
              (blob) => {
                const formData = new FormData();
                formData.append('raw', historys.list[historys.current].id);
                formData.append('mask', blob);
                repairApi(formData).then((res) => {
                  if (res.code == 200) {
                    historys.list = historys.list.slice(0, historys.current + 1);

                    historys.list.push({ id: res.data.id, url: res.data.url });
                    historys.current = historys.current + 1;

                    img.id = res.data.id;
                    loadImage(res.data.url);
                  }
                  loading.value = false;
                });
              },
              'image/jpeg',
              0.5,
            );
          }
        }

        mousePress = false;
        lastPos = null;
        beginPos = null;
        lastDragPost = null;
      };

      const loadImage = (url) => {
        const image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
        image.onload = () => {
          ctx.value.drawImage(image, 0, 0, imageWidth.value, imageHeight.value);
          initMask();
        };
      };

      const close = () => {
        if (lastPos != null) {
          ctx2.value.beginPath();
          ctx2.value.moveTo(lastPos.x, lastPos.y);
          ctx2.value.lineTo(beginPos.x, beginPos.y);
          ctx2.value.stroke();
        }
      };

      const getPos1 = (e) => {
        return {
          x: e.pageX,
          y: e.pageY,
        };
      };

      const model = ref(1);

      const changeModel = (m) => {
        model.value = m;
        if (m == 1) {
          penRef.value.style.left = '-100px';
          penRef.value.style.top = '-100px';

          canvas2Ref.value.style.cursor =
            'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTguOTUgMTIuMDhjNC43MDggMCA2LjUzNiAzLjE4OCA1LjU3IDcuMjA2LS42NCAyLjY2NS0zLjkyMiA0LjQzOC03LjYzMyA0LjkzOC0uMDgzLjIzLS4yMTQuNDM5LS4zOC42MTMuMjYyLjUyMy41NzIuOTE1LjkyNiAxLjE4LjY0OC40ODcgMy4yMDguNjYxIDUuODAxLjQyNGwuMTMyIDEuNDM0Yy0yLjkzMy4yNjgtNS43NzIuMDY1LTYuNzk5LS43MDYtLjU2Mi0uNDIzLTEuMDIzLTEuMDE0LTEuMzktMS43NjhhMS44MDIgMS44MDIgMCAwMS0xLjYxMi0xLjA0OEMxMC42NjMgMjQuMTUgOS4wOCAyMi45MTEgOS4wOCAyMGMwLTQuMSA0Ljc3My03LjkyIDkuODctNy45MnptMCAxLjQ0Yy00LjM2NCAwLTguNDMgMy4yNTUtOC40MyA2LjQ4IDAgMS44ODUuOTQ3IDIuNzM1IDMuMDE3IDIuOTFhMS44MDEgMS44MDEgMCAwMTMuMjY2LS4xM2MzLjEzNy0uNDUzIDUuODYtMS45MyA2LjMxNy0zLjgzLjc2OC0zLjE5OS0uNTEtNS40My00LjE3LTUuNDN6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz48cGF0aCBkPSJNMTUuOTUgMjMuNmMzLS4yMzcgNy4xODgtMS42NDEgNy44Ny00LjQ4Mi42ODMtMi44NC0uMDYyLTYuMzE4LTQuODctNi4zMThTOS44IDE2LjQgOS44IDIwczMuMTUgMy44MzcgNi4xNSAzLjZ6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS40NCIgc3Ryb2tlLWRhc2hhcnJheT0iMS44LDAuOSIvPjxwYXRoIGQ9Ik0xNS4yIDIzLjIxM2MuMzYzIDEuNjI0Ljk2MyAyLjc1IDEuOCAzLjM4LjgzNy42MyAyLjkzNy44MTggNi4zLjU2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNDQiIHN0cm9rZS1kYXNoYXJyYXk9IjEuOCwwLjkiLz48cGF0aCBkPSJNMTUuMiAyNS40YTEuOCAxLjggMCAxMDAtMy42IDEuOCAxLjggMCAwMDAgMy42eiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMC4wOTYgMTEuMTNsLTMuNzA1IDMuMjg2LTEuMjU3LTExLjg4IDkuNjYgNy4wMjgtNC42OTggMS41Njd6IiBmaWxsPSIjMDAwIiBzdHJva2U9IiNGRkYiLz48L2c+PC9zdmc+") 4 4, auto';
        } else if (m == 2) {
          canvas2Ref.value.style.cursor = 'unset';
        }
      };

      const zoom = ref(100);
      const imageWidth = ref(748);
      const imageHeight = ref(524);
      const maskWidth = ref(748);
      const maskHeight = ref(524);
      const imageZoom = ref(100);
      const loading = ref(false);

      const historys = reactive({
        list: [] as Array<any>,
        current: -1,
      });

      const onmousewheel = (e) => {
        if (e.wheelDelta > 0 && zoom.value < 200) {
          zoom.value += 10;
        } else if (e.wheelDelta < 0 && zoom.value > 20) {
          zoom.value -= 10;
        }

        nextTick(() => {
          const pos = getPos(e);
          if (model.value == 2 && !loading.value) {
            penRef.value.style.left = pos.x - (penSize.value * (zoom.value / 100)) / 2 + 'px';
            penRef.value.style.top = pos.y - (penSize.value * (zoom.value / 100)) / 2 + 'px';
          }
        });
      };

      const download = () => {
        const url = canvas3Ref.value.toDataURL('image/png');
        let a = document.createElement('a');
        a.href = url;
        a.download = 'test.png';
        a.click();
        window.URL.revokeObjectURL(url); // 释放该 url
      };

      onMounted(() => {
        ctx.value = canvas1Ref.value.getContext('2d');
        ctx2.value = canvas2Ref.value.getContext('2d');
        ctx3.value = canvas3Ref.value.getContext('2d');
        // ctx2.value.fillStyle = 'rgba(89, 142, 238, 0.6)';
        ctx2.value.fillStyle = 'red';
        ctx2.value.lineWidth = 2;
        // ctx2.value.setLineDash([2, 10]);
        ctx2.value.strokeStyle = 'rgba(89, 142, 238, 1)';
        ctx2.value.strokeStyle = 'red';

        changeModel(2);

        bindSpace();
      });

      const initMask = () => {
        ctx2.value.clearRect(0, 0, canvas2Ref.value.width, canvas2Ref.value.height);
        ctx3.value.clearRect(0, 0, maskWidth.value, maskHeight.value);
        ctx3.value.fillStyle = 'black';
        ctx3.value.beginPath();
        ctx3.value.fillRect(0, 0, maskWidth.value, maskHeight.value);
        ctx3.value.fill();
        ctx3.value.closePath();
        ctx3.value.stroke();
        ctx3.value.fillStyle = 'white';
      };

      const reset = () => {
        ctx2.value.clearRect(0, 0, canvas2Ref.value.width, canvas2Ref.value.height);
      };

      const prev = () => {
        historys.current = historys.current - 1;
        img.id = historys.list[historys.current].id;
        loadImage(historys.list[historys.current].url);
      };

      const next = () => {
        historys.current = historys.current + 1;
        historys.list[historys.current].id;
        loadImage(historys.list[historys.current].url);
      };

      const delete0 = () => {
        historys.list = [];
        historys.current = 0;
        img.url = '';
      };

      const spaceDown0 = (e) => {
        console.log(0);
      };

      const spaceUp0 = (e) => {
        console.log(1);
      };

      const spaceDown = ref(false);
      const bindSpace = () => {
        document.onkeydown = (e) => {
          const key = e.key;
          if (key == ' ') {
            if (window.location.href.endsWith('repairEdit')) {
              e.preventDefault();
            }
            spaceDown.value = true;
          }
        };
        document.onkeyup = (e) => {
          const key = e.key;
          if (key == ' ') {
            spaceDown.value = false;
          }
        };
      };

      const banner = 'https://jyzn-prod.oss-cn-shanghai.aliyuncs.com/images/repair-banner-video.mp4';

      const repairWrapRef = ref();

      const example = ref<any>([]);

      onBeforeMount(() => {
        getDictDataByTypeApi('example_repair').then((res) => {
          if (res.code == 200) {
            example.value = res.data.map((item) => {
              return { label: item.dictLabel, value: item.dictValue };
            });
          }
        });
      });

      return {
        universalCutoutExample1,
        universalCutoutTry1,
        universalCutoutTry2,
        universalCutoutTry3,
        img,
        pcUploadChange,
        handleMobileUpload,
        handlePaste,
        upLoadProgress,
        mobileUploadKey,
        onMobileUploadModalClose,
        currentHost,
        mobileUploadModalVisible,
        handleDownloadImg,
        penSize,
        canvas1Ref,
        canvas2Ref,
        canvas3Ref,
        ctx,
        onMouseMove,
        penRef,
        contentRef,
        imgRef,
        start,
        draw,
        end,
        model,
        changeModel,
        reset,
        download,
        onmousewheel,
        zoom,
        penSize1,
        imageWidth,
        imageHeight,
        imageZoom,
        maskWidth,
        maskHeight,
        historys,
        loading,
        prev,
        next,
        delete0,
        spaceDown,
        spaceDown0,
        spaceUp0,
        imgWrapRef,
        dragPos,
        banner,
        example,
        tryExample,
        repairWrapRef,
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
            border-radius: 8px;
          }
        }
        .right {
          flex: 1;
          padding: 0px 130px 0px 130px;
          overflow: hidden;
          .title {
            font-size: 70px;
            font-weight: 600;
            font-family: 'OPPOSans';
            line-height: 70px;
            white-space: nowrap;
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
                object-fit: cover;
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

    .repair-wrap {
      margin: 36px auto 0px auto;
      width: 1200px;

      .repair {
        .top {
          height: 88px;
          line-height: 88px;
          text-align: right;
          background-color: #e9e9e9;
          padding: 0px 24px;

          .btn-delete,
          .btn-download {
            width: 96px;
            height: 48px;
            border-radius: 8px;
          }

          .btn-delete {
            color: unset !important;
            background: #fff !important;
            border-color: #d9d9d9 !important;
          }

          .btn-download {
            color: white;
            background-color: #0035f0;
            margin-left: 16px;
          }

          .btn-download:hover {
            color: white !important;
            background-color: #0035f0 !important;
          }
        }

        .history {
          text-align: center;
          background-color: white;
          padding: 48px 0px 32px 0px;
        }

        .content {
          background-color: white;
          position: relative;
          height: 524px;

          .pen {
            width: 50px;
            height: 50px;
            position: absolute;
            top: -100px;
            left: -100px;
            border-radius: 50%;
            background-color: rgba(89, 142, 238, 0.6);
          }

          .img-wrap {
            width: 748px;
            height: 524px;
            overflow: hidden;
            margin: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .img {
              position: absolute;
              overflow: hidden;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              .canvas1,
              .canvas2,
              .canvas3 {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: contain;
              }

              .canvas3 {
                visibility: hidden;
              }

              .canvas2 {
                opacity: 0.6;
              }

              .pen {
                width: 50px;
                height: 50px;
                position: absolute;
                top: -100px;
                left: -100px;
                border-radius: 50%;
                background-color: rgba(89, 142, 238, 0.6);
              }
            }

            .loading-wrap {
              position: absolute;
              width: 100px;
              height: 100px;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              background-color: rgba(0, 0, 0, 0.8);
              color: #fff;
              text-align: center;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;

              .loading {
                font-size: 24px;
              }
            }
          }
        }

        .tools-wrap {
          background-color: white;
          padding: 20px 0px;
          .tools {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            width: 748px;
            margin: auto;

            .tool-option {
              .btn-option {
                width: 118px;
                height: 48px;
                border-radius: 8px;
                color: unset !important;
                background: #fff !important;
                border-color: #d9d9d9 !important;
              }

              .btn-option.active {
                color: white !important;
                background-color: #0035f0 !important;
              }

              .active:hover {
                color: white !important;
                background-color: #0035f0 !important;
              }
            }

            .pen-size {
              display: flex;
              align-items: center;
              background: rgba(0, 53, 240, 0.06);
              padding: 8px 20px;
              border-radius: 8px;
              color: #0035f0;

              .text {
                // width: 100px;
                margin-right: 20px;
              }

              .size {
                width: 200px;
              }
            }
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

    .upload-tips-line1 {
      color: #000000;
    }

    .upload-tips-line2 {
      color: #ff0000;
    }
  }

  :deep(.tools .ant-slider-handle) {
    border: none;
    background-color: @blue;
  }

  :deep(.tools .ant-slider-track) {
    background-color: @blue;
  }

  :deep(.tools .ant-slider-step) {
    background-color: rgba(0, 53, 240, 0.1);
  }
</style>
