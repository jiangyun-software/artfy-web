<template>
  <div class="content">
    <div class="top-wrap">
      <div class="top">
        <div class="left">
          <video class="video1" style="width: 520px; height: 520px" controls :src="url"></video>
        </div>
        <div class="right">
          <div class="title">视频翻译</div>
          <div class="description">mp4, avi, mkv等视频格式, 400M以内</div>
          <div class="paste-wrap"><Input v-model:value="proparams.urls[0]" class="paste-input" placeholder="CTRL+V粘贴URL" /></div>
          <div class="btn-group">
            <Button class="btn-item pcupload btn-upload" @click="process()">
              <span>提交</span>
            </Button>
          </div>
          <div class="api" v-show="isShow">{{ processStatusMap[processStatus] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, onBeforeMount } from 'vue';
  import { Button, Input, Progress, Modal, message, Slider } from 'ant-design-vue';
  import imgDivider from '/@/assets/images/img-divider.png';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import deleteIcon from '/@/assets/svg/delete.svg';
  import downloadIcon from '/@/assets/svg/download.svg';
  import { getUploadSingnatureApi, getUploadKeyApi, getUploadFileApi, translateApi, translateResultApi, uploadImageByUrlApi, getDictDataByTypeApi } from '/@/api/api';
  import axios from 'axios';
  import QrcodeVue from 'qrcode.vue';
  import { useUserStore } from '/@/store/modules/user';
  import ImageCompare from '/@/components/ImageCompare/Index.vue';

  export default defineComponent({
    name: 'VideoTranslation',
    components: { Button, Input, QrcodeVue, Modal, LoadingOutlined, Progress, ImageCompare, Slider },
    setup() {
      const url = ref('');

      var isShow = ref(false);

      var processStatus = ref('');

      const processStatusMap = {
        '-2': '素材准备中',
        '-1': '默认，需要进行处理',
        '0': '工程文件构建完成，处理中',
        '1': '成功',
        '2': 'url解析失败',
        '3': '下载失败',
        '4': 'Ocr调用失败',
        '5': '视频时长超过设定限制',
        '6': '翻译Pro调用失败',
        '7': '翻译Pro处理失败',
        '8': '深尚时长超过限制',
        '9': '人工取消发布',
        '10': '工程文件构造失败',
        '11': '成功',
        '12': 'ASR处理失败',
        '13': '卡点处理失败',
        '14': '素材osskey不存在',
        '15': '作为素材的作品处理失败',
        '16': '视频最后0.2秒读不出来，可能存在损坏',
        '17': '下载的文件不存在',
        '18': '视频处理超时',
        '19': '文件可能部分下载损坏',

        '20': '视频擦除处理失败',
        '21': '语音分离失败',
        '22': '远程服务任务发送失败',
        '23': '远程处理超时',
        '43': '未知错误',
        '44': '无计可施 无可救药',
        '45': '尝试处理次数过多',
        '70': '剪辑次数处理资源耗尽',
        '71': '基础字符处理资源耗尽',
        '72': '高级字符处理资源耗尽',
        '80': '剪辑次数处理资源耗尽，锁住作品等待充值解锁',
        '81': '基础字符处理资源耗尽，锁住作品等待充值解锁',
        '82': '高级字符处理资源耗尽，锁住作品等待充值解锁',
        '98': '存储空间资源耗尽',
        '99': '超出素材时长限制',
        '100': '超出素材大小限制',
        '111': '处理超时',
      };

      const videoInfo = reactive({
        idProject: '',
        dataList: [] as any,
      });

      const idProjectsparams = reactive({
        idProjects: [] as any,
        idWorks: [] as any,
      });

      const params = reactive({
        urls: [],
        srcLang: 'zh-cmn-Hans-CN',
        tgtLang: 'en-US',
        needChineseOcclude: '0',
        needCrop: '0',
        needTrim: 0,
        needMask: 0,
        needMirror: 0,
        needRescale: 0,
        needTransition: 0,
        music: 1,
        musicRegion: 'US',
        resolution: 2,
        callback: '',
        outUserId: '123',
        uid: '',
      });

      const proparams = reactive({
        urls: [],
        voice: 2,
        wyVoiceParam: '{"id":62}',
        lang: 'en',
        sourceLang: 'cn',
        removeBgAudio: 0,
        needChineseOcclude: '1',
        needCrop: '1',
        needTrim: 0,
        needMask: 0,
        needMirror: 0,
        needRescale: 0,
        needTransition: 0,
        music: 2,
        musicRegion: 'US',
        resolution: 2,
        callback: '',
        outUserId: '123',
        uid: '',
        wyNeedText: 1,
      });

      //视频翻译
      const processing = ref(false);
      const process = () => {
        if (isShow.value == true) {
          return;
        } else {
          processing.value = true;
          translateApi(proparams).then((res) => {
            processing.value = false;
            if (res.code == 200 || res.msg == 'success') {
              videoInfo.idProject = res.data.idProject;
              videoInfo.dataList = res.data.dataList;
              idProjectsparams.idProjects[0] = res.data.idProject;
              idProjectsparams.idWorks[0] = res.data.dataList[0].id;
              message.success('提交成功');
              //message.success('视频翻译 callback ' + res.callback);
              isShow.value = true;
              let timer = setInterval(() => {
                fun(timer);
              }, 5000);
              // window.setInterval(() => {
              //   setTimeout(processResult, 0);
              // }, 30000);
            }
          });
        }
      };

      const fun = (timer) => {
        setTimeout(() => {
          // 这里ajax 请求的代码片段和判断是否停止定时器
          translateResultApi(idProjectsparams).then((res) => {
            //message.success('视频翻译状态' + res.msg);
            Resultprocessing.value = false;
            if (res.code == 200 || res.msg == 'success') {
              processStatus.value = res.data.content[0].processStatus;
              if (res.data.content[0].processStatus == 1) {
                //成功
                message.success('视频翻译' + res.msg);
                isShow.value = false;
                //message.success(res.data.content[0].videoUrl);
                // 停止定时器
                clearInterval(timer);

                url.value = res.data.content[0].videoUrl;
              } else {
                //未成功
                isShow.value = true;
                //message.success(res.data.content[0].url + '开始: ' + res.data.content[0].videoUrl + '素材准备中 ' + res.data.content[0].processStatus);
              }
            }
          });
        }, 0);
      };

      //视频翻译
      const Resultprocessing = ref(false);
      const processResult = () => {
        isShow.value = true;
        Resultprocessing.value = true;
        translateResultApi(params).then((res) => {
          Resultprocessing.value = false;
          if (res.code == 200 || res.msg == 'success') {
            message.success(res.msg);
            message.success(res.code);
          }
        });
      };

      return {
        idProjectsparams,
        videoInfo,
        imgDivider,
        deleteIcon,
        downloadIcon,
        params,
        proparams,
        process,
        processResult,
        processing,
        Resultprocessing,
        fun,
        url,
        isShow,
        processStatus,
        processStatusMap,
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
          .api {
            color: red;
            font-size: 18px;
            margin-top: 16px;
            cursor: pointer;
            //display: none;
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
</style>
