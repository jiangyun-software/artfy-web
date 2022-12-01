<template>
  <div class="mobile-upload">
    <div v-if="expired" style="color: red">二维码已过期，请重新打开二维码</div>
    <div v-else>
      <Button v-if="uploadProgress == 0" class="btn-upload mybtn">
        <span>点击 上传</span>
        <input type="file" @change="onUploadChange($event)" />
      </Button>
      <div v-else>
        <Progress type="dashboard" :percent="uploadProgress" />
        <div v-show="uploadProgress == 100" class="complete" style="color: #55d187; text-align: center; font-size: 24px">上传完成</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onBeforeMount } from 'vue';
  import { Button, message, Progress } from 'ant-design-vue';
  import { checkUploadKeyApi, setUploadFileApi, getUploadSingnatureApi } from '/@/api/api';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'MobileUpload',
    components: { Button, Progress },
    setup() {
      const route = useRoute();
      const key = route.query.key;
      const product = route.query.type;

      const uploadProgress = ref(0);

      const onUploadChange = (e) => {
        const file = e.target.files[0];
        if (file.size > 1024 * 1024 * 3) {
          // message.error('图片不能超过3MB');
          // return false;
        }

        getUploadSingnatureApi(product).then((res) => {
          const params = new FormData();
          params.append('key', res.data.key);
          params.append('policy', res.data.policy);
          params.append('OSSAccessKeyId', res.data.OSSAccessKeyId);
          params.append('success_action_status', '200');
          params.append('signature', res.data.signature);
          params.append('file', file);
          axios({
            url: res.data.host,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
            onUploadProgress: function (progress) {
              if (progress.lengthComputable) {
                uploadProgress.value = Math.round((progress.loaded / progress.total) * 100);
              }
            },
          }).then(() => {
            setUploadFileApi({ key: key, files: [res.data.id] });
          });
        });
      };

      const expired = ref(false);
      onBeforeMount(() => {
        checkUploadKeyApi(key).then((res) => {
          if (res.code == 500) {
            expired.value = true;
          }
        });
      });

      return {
        uploadProgress,
        onUploadChange,
        expired,
      };
    },
  });
</script>
<style lang="less" scoped>
  .mobile-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
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

  .mybtn {
    width: 200px;
    height: 72px;
    font-size: 20px;
    border-width: 1px;
    border-radius: 8px;
    color: black;
    border-color: black;
  }

  :deep(.ant-progress-text .anticon > svg) {
    width: 2em;
    height: 2em;
  }
</style>
