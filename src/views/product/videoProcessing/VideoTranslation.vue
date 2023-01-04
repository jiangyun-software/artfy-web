<template>
  <div class="content">
    <div class="top-wrap">
      <div class="top">
        <div class="left">
          <video class="video1" style="width: 520px; height: 520px" controls :src="url">
            <source
              src="https://v9-cold1.douyinvod.com/b7cc09b11f4eaebd6291af7a29123368/63a04244/video/tos/cn/tos-cn-ve-15-alinc2/f914976fe4974d4da877e8cf15211364/?a=1128&ch=0&cr=0&dr=0&cd=0%7C0%7C0%7C0&cv=1&br=612&bt=612&cs=0&ds=3&ft=KQ9BF3UUmf.7daD0PD1YBa_3pt2GuNralCdcx4k01bnbEvjThb&mime_type=video_mp4&qs=0&rc=aThpOTNkOzg2PDY5Zzs0M0Bpajd1bjM6ZmZkOTMzNGkzM0AzXjZiLS8zXzMxLzEvNGE1YSM0bGxqcjRnaWBgLS1kLWFzcw==&l=2022121917513701020809707709024232&btag=88000&cdn_n80=1"
              type="video/mp4"
            />
          </video>
        </div>
        <div class="right">
          <div class="title">视频翻译</div>
          <div class="description">mp4, avi, mkv等视频格式, 400M以内</div>
          <!---->
          <ul role="menu" class="el-menu el-menu--inline" data-old-padding-top="" data-old-padding-bottom="" data-old-overflow="" style="">
            <div class="el-collapse-content">
              <div class="i_editor_h4">选择翻译语言</div>
              <select class="selectlang" v-model="selectsourceLang">
                <option disabled selected style="display: block">请选择源语言</option>
                <option v-for="(item, index) in sourceLang" :key="index" :value="item.code">{{ item.description }}</option>
              </select>
              <span>-></span>
              <select class="selectlang" v-model="selectlang">
                <option disabled selected style="display: block">请选择目标语言</option>
                <option v-for="(item, index) in lang" :key="index" :value="item.code">{{ item.description }}</option>
              </select>

              <div class="i_editor_h4">配音和字幕选项</div>
              <div class="el-select my_el_select">
                <select class="selectlang" v-model="selectSet">
                  <option value="0">AI配音并生成字幕</option>
                  <option value="1">仅AI配音</option>
                  <option value="2">仅生成字幕</option>
                </select>
              </div>
              <!-- -->
              <div class="combo">
                <div class="combo-list" style="width: 200px; height: 220px; overflow-y: auto">
                  <RadioGroup v-model:value="selectComboIndex" style="display: block">
                    <div v-for="(item, index) in comboList" :key="index" class="combo-item">
                      <Radio :value="index">{{ item }}</Radio>
                      <div>语音列表 {{ index }}</div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <!---->

              <div class="i_editor_h4">
                <br />
                <label class="el-checkbox is-checked" style="margin-right: 5px"> <input type="checkbox" v-model="removeBgAudio" aria-hidden="false" true-value="1" false-value="0" class="el-checkbox__original" /> </label>原视频静音
              </div>
            </div>
          </ul>
          <!---->
          <div class="paste-wrap"
            >示例:https://v.douyin.com/hLWpbPG/ <Button class="btn-item mobileupload" @click="preview()">预览<br /></Button><Input v-model:value="proparams.urls[0]" class="paste-input" placeholder="CTRL+V粘贴URL" />
          </div>

          <div class="btn-group">
            <Button class="btn-item pcupload btn-upload">
              <span>电脑上传</span>
              <input type="file" accept="audio/mp4, video/mp4" @change="pcUploadChange($event)" />
            </Button>
            <Button class="btn-item mobileupload" @click="process()">URL上传</Button>
            <!-- <Button class="btn-item mobileupload" @click="preview()">预览</Button> -->
          </div>
          <div class="api" v-show="isShow">{{ processStatusMap[processStatus] }}</div>
          <div class="time" v-show="isShowtime">开始时间 {{ strattime }} 结束时间 {{ endtime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, onBeforeMount } from 'vue';
  import { Button, Input, Progress, Modal, message, Slider, Radio, RadioGroup } from 'ant-design-vue';
  import imgDivider from '/@/assets/images/img-divider.png';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import deleteIcon from '/@/assets/svg/delete.svg';
  import downloadIcon from '/@/assets/svg/download.svg';
  import { getUploadFileSingnatureApi, getUploadKeyApi, getUploadFileApi, translateApi, translateResultApi, uploadImageByUrlApi, getDictDataByTypeApi } from '/@/api/api';
  import axios from 'axios';
  import QrcodeVue from 'qrcode.vue';
  import { useUserStore } from '/@/store/modules/user';
  import ImageCompare from '/@/components/ImageCompare/Index.vue';

  export default defineComponent({
    name: 'VideoTranslation',
    components: { Button, Input, Radio, RadioGroup, QrcodeVue, Modal, LoadingOutlined, Progress, ImageCompare, Slider },
    setup() {
      const imgList = ref<any>([]); // { url: '1', progress: 20 },

      //const cutoutWrapRef = ref();

      var strattimeDate = new Date();

      var countDateDiff = null;

      var endtimeDate = new Date();

      var strattime = ref('');

      var endtime = ref('');

      const url = ref('');

      var isShow = ref(false);

      var isShowtime = ref(false);

      var processStatus = ref('');
      //是否需要删除背景声
      var removeBgAudio = ref(false);
      //是否开启字幕
      var wyNeedText = ref('');

      const selectComboIndex = ref(0);

      const sourceLang = [
        { code: 'cn', description: '中文' },
        { code: 'en', description: '英文' },
        { code: 'ja', description: '日语' },
        { code: 'ru', description: '俄语' },
        { code: 'fr', description: '法语' },
        { code: 'de', description: '德语' },
        { code: 'id', description: '印尼语' },
        { code: 'hi', description: '印地语' },
        { code: 'pt', description: '葡萄牙语' },
        { code: 'es', description: '西班牙语' },
        { code: 'ar', description: '阿拉伯语' },
        { code: 'it', description: '意大利语' },
        { code: 'th', description: '泰语' },
        { code: 'vi', description: '越南语' },
        { code: 'ko', description: '韩语' },
      ];

      const lang = [
        { code: 'zh', description: '中文' },
        { code: 'en', description: '英文' },
        { code: 'ja', description: '日语' },
        { code: 'ko', description: '韩语' },
        { code: 'pt', description: '葡萄牙语' },
        { code: 'fr', description: '法语' },
        { code: 'es', description: '西班牙语' },
        { code: 'ar', description: '阿拉伯语' },
        { code: 'vi', description: '越南语' },
        { code: 'th', description: '泰语' },
        { code: 'de', description: '德语' },
        { code: 'ru', description: '俄语' },
        { code: 'it', description: '意大利语' },
        { code: 'id', description: '印尼语' },
        { code: 'hi', description: '印地语' },
        { code: 'tr', description: '土耳其语' },
        { code: 'fil', description: '菲律宾语' },
        { code: 'ms', description: '马来西亚语' },
        { code: 'km', description: '高棉语' },
      ];

      var selectsourceLang = ref('');

      var selectlang = ref('');

      var selectSet = ref('0');

      const comboList = {
        '38': '标准男声-中文(普通话)',
        '39': '标准女声-中文(普通话)',
        '40': '标准男声-英国',
        '41': '标准女声-英国',
        '42': '标准男声-日本',
        '43': '标准女声-日本',
        '44': '标准男声-印尼',
        '45': '标准女声-印尼',
        '46': '标准男声-俄罗斯',
        '47': '标准女声-俄罗斯',
        '48': '标准男声-德国',
        '49': '标准女声-德国',
        '50': '标准男声-法国',
        '51': '标准女声-法国',
        '52': '标准男声-西班牙',
        '53': '标准女声-西班牙',
        '54': '标准男声-沙特阿拉伯',
        '55': '标准女声-沙特阿拉伯',
        '56': '标准男声-印度',
        '57': '标准女声-印度',
        '58': '标准男声-葡萄牙',
        '59': '标准女声-葡萄牙',
        '60': '标准男声-泰国',
        '61': '标准男声-美国',
        '62': '标准女声-美国',
      };

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
        urls: [] as any,
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
        urls: [] as any,
        voice: 2,
        wyVoiceParam: '{"id":43}',
        lang: 'ja',
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
      //提取url
      const getStrUrl = () => {
        var s = [];
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
        s = proparams.urls[0].match(reg);
        proparams.urls[0] = s && s.length ? s[0] : null;
      };

      const preview = () => {
        getStrUrl();
        window.open(proparams.urls[0]);
      };

      //视频翻译
      const processing = ref(false);
      const process = () => {
        if (isShow.value == true) {
          return;
        } else {
          getStrUrl();
          message.success('提交成功');
          //message.success('提交selectlang :' + selectlang.value + ' selectsourceLang:' + selectsourceLang.value + ' selectComboIndex:' + selectComboIndex.value);

          proparams.lang = selectlang.value;
          proparams.sourceLang = selectsourceLang.value;
          proparams.wyVoiceParam = '{"id":' + selectComboIndex.value + '}';
          if (removeBgAudio.value) {
            proparams.removeBgAudio = 1;
          } else {
            proparams.removeBgAudio = 0;
          }
          if (selectSet.value == '0') {
            proparams.wyNeedText = 1;
            proparams.voice = 2;
          } else if (selectSet.value == '1') {
            proparams.wyNeedText = 0;
          } else if (selectSet.value == '2') {
            proparams.wyNeedText = 1;
            proparams.voice = 3;
          }

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
              //获取起始时间
              strattimeDate = new Date();
              strattime.value = strattimeDate.toLocaleString() + ':' + (strattimeDate.getSeconds() + 1);
              isShow.value = true;
              isShowtime.value = false;
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
                isShowtime.value = true;
                //message.success(res.data.content[0].videoUrl);
                // 停止定时器
                clearInterval(timer);
                //获取结束时间
                endtimeDate = new Date();
                endtime.value = endtimeDate.toLocaleString() + ':' + (endtimeDate.getSeconds() + 1);
                //countDateDiff = Math.ceil(Math.abs(endtimeDate.getTime() - strattimeDate.getTime()) / (1000 * 60 * 60 * 24));
                url.value = res.data.content[0].videoUrl;
              } else {
                //未成功
                isShow.value = true;
                isShowtime.value = false;
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

      //本地视频
      const pcUploadChange = (e) => {
        if (e.target.files.length == 0) {
          return false;
        }
        uploadAndCutout(e.target.files[0]);
      };

      const uploadAndCutout = (data) => {
        getUploadFileSingnatureApi('universalCutout').then((res) => {
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
            // cutoutWrapRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // //佐糖抠图接口
            // cutoutApi({ url: res.data.id, type: 'object' }).then((res3) => {
            //   const img = imgList.value.find((item) => item.url == res.data.url);
            //   img.url = res3.data.url;
            //   img.done = true;
            //   img.id = res3.data.id;
            //});
            message.success('电脑上传 视频翻译');
            proparams.urls[0] = res.data.url;
            proparams.lang = selectlang.value;
            proparams.sourceLang = selectsourceLang.value;
            proparams.wyVoiceParam = '{"id":' + selectComboIndex.value + '}';
            if (removeBgAudio.value) {
              proparams.removeBgAudio = 1;
            } else {
              proparams.removeBgAudio = 0;
            }
            if (selectSet.value == '0') {
              proparams.wyNeedText = 1;
              proparams.voice = 2;
            } else if (selectSet.value == '1') {
              proparams.wyNeedText = 0;
            } else if (selectSet.value == '2') {
              proparams.wyNeedText = 1;
              proparams.voice = 3;
            }

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
                //获取起始时间
                strattimeDate = new Date();
                strattime.value = strattimeDate.toLocaleString() + ':' + (strattimeDate.getSeconds() + 1);
                isShow.value = true;
                isShowtime.value = false;
                let timer = setInterval(() => {
                  fun(timer);
                }, 5000);
                // window.setInterval(() => {
                //   setTimeout(processResult, 0);
                // }, 30000);
              }
            });
          });
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
        preview,
        processResult,
        processing,
        Resultprocessing,
        fun,
        url,
        isShow,
        isShowtime,
        processStatus,
        processStatusMap,
        getStrUrl,
        selectlang,
        selectsourceLang,
        sourceLang,
        lang,
        selectComboIndex,
        comboList,
        removeBgAudio,
        wyNeedText,
        selectSet,
        strattime,
        endtime,
        strattimeDate,
        endtimeDate,
        countDateDiff,
        pcUploadChange,
        uploadAndCutout,
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
              margin-top: 6px;
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

          .time {
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
  .selectlang {
    //border: 1px;
    border-width: 1px;
  }
</style>
