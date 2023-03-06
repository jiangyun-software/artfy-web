<template>
  <div class="modelRepository">
    <div v-show="!creating" class="model-list">
      <div class="add-button">
        <button @click="creating = true"><img :src="plusBlackIcon" /><span class="add-button-text">创建模型</span></button>
      </div>
      <div v-for="item in modelList" :key="item.id" class="model-item">
        <div v-if="item.status != '2'" class="model-item-generating">
          <img :src="generatingIcon" alt="" />
          <div class="model-item-generating-text">模型生成中...</div>
        </div>
        <div v-else class="model-item-info">
          <div class="model-item-info-image">
            <img class="model-item-info-image-img" :src="item.images.split(',')[0]" alt="" />
            <button class="model-item-info-image-btn">去生成</button>
            <div class="btn-del"><img :src="deleteIcon" alt="" /></div>
          </div>
          <div class="model-item-info-content">
            <div class="model-item-info-name-imageNumber">
              <div class="model-item-info-name">{{ item.name }}</div>
              <div class="model-item-info-imageNumber">{{ item.images.split(',').length }}张图片</div>
            </div>
            <div class="divider-row"></div>
            <div class="model-item-info-describe">图片描述词：{{ item.describe }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="creating" class="model-create">
      <div class="back">
        <button class="back-btn" @click="creating = false">
          <img class="back-icon" :src="arrowIcon" alt="" />
          <span class="back-text">模型库</span>
        </button>
      </div>
      <div class="form-label">
        <div class="form-label-left"></div>
        <div class="form-label-text">模型名称</div>
        <div class="form-label-tips">用于艺术生成选择模型的名称提示</div>
      </div>
      <div class="form-control"><input class="painting-input" type="text" placeholder="请在此给你的模型命名" v-model="modelForm.name" /></div>
      <div class="form-label">
        <div class="form-label-left"></div>
        <div class="form-label-text">模型名称</div>
        <div class="form-label-tips">用于艺术生成选择模型的名称提示</div>
      </div>
      <div class="from-control image-list">
        <div class="image-upload">
          <img :src="plusIcon" alt="" />
          <div class="image-upload-text">上传图片</div>
          <input type="file" multiple @change="batchUpload($event)" />
        </div>
        <div v-for="(item, index) in modelForm.images" :key="item.i" class="image-item">
          <div v-if="item.status == 0" class="image-item-uploading">
            <img class="round" :src="loadingIcon" alt="" />
          </div>
          <div v-if="item.status == 1" class="image-item-image">
            <img class="image-item-image-src" :src="item.url" alt="" />
            <div class="image-item-image-hover">
              <div class="image-item-image-hover-btn" @click="toTop(item, index)"><img class="image-item-image-hover-btn-icon" :src="arrowIcon" alt="" style="transform: rotate(90deg) translate(-50%, 50%)" /></div>
              <div class="image-item-image-hover-btn" @click="delImg(index)"><img class="image-item-image-hover-btn-icon" :src="deleteIcon" alt="" /></div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-label">
        <div class="form-label-left"></div>
        <div class="form-label-text">选择分类</div>
        <div class="form-label-tips">用于模型生成的类名。示例：男人，女人，车等</div>
      </div>
      <div class="form-control classification-list">
        <div v-for="item in classificationList" :key="item.id" class="classification-item" :class="{ active: item.id == modelForm.classification.id }" @click="selectClassification(item.id)">{{ item.name }}</div>
      </div>
      <div v-show="modelForm.classification.id == -1" class="form-control" style="margin-top: 12px"><input class="painting-input" type="text" placeholder="描述" v-model="modelForm.describe" /></div>
      <div class="point">
        <span>剩余可用点数：{{ 200 }}</span>
        <router-link to="">去充值</router-link>
      </div>
      <div class="btn-submit">
        <button>创建模型<span>2点</span></button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import plusIcon from '/@/assets/icons/plus.svg';
  import plusBlackIcon from '/@/assets/icons/plus-black.svg';
  import generatingIcon from '/@/assets/icons/generating.svg';
  import deleteIcon from '/@/assets/icons/delete.svg';
  import loadingIcon from '/@/assets/icons/loading.svg';
  import arrowIcon from '/@/assets/icons/arrow-down.svg';
  import { ref, reactive } from 'vue';
  import { getUploadSingnatureApi } from '/@/api/api';
  import axios from 'axios';

  const modelForm = reactive({
    name: '',
    images: [] as any,
    classification: { id: -1 },
    describe: '',
  });

  const creating = ref(true);

  const images = reactive<any>([]);

  const modelList = reactive([
    { id: 0, name: 'name', describe: '描述', images: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', status: '0' },
    { id: 0, name: 'name', describe: '描述', images: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', status: '1' },
    {
      id: 0,
      name: 'namexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      describe: '描述xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      images: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97,https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97',
      status: '2',
    },
  ]);

  const batchUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // const fileList = [] as any;
      for (let i = 0; i < e.target.files.length; i++) {
        const item = reactive({ id: i, status: 0, file: e.target.files[i], url: '' });
        modelForm.images.push(item);
        getUploadSingnatureApi('dreambooth').then((res) => {
          const params = new FormData();
          params.append('key', res.data.key);
          params.append('policy', res.data.policy);
          params.append('OSSAccessKeyId', res.data.OSSAccessKeyId);
          params.append('success_action_status', '200');
          params.append('signature', res.data.signature);
          params.append('file', item.file);
          axios({
            url: res.data.host,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
          }).then(() => {
            item.status = 1;
            item.url = res.data.url;
          });
        });
      }
    }
  };

  const toTop = (item, index) => {
    modelForm.images.splice(index, 1);
    modelForm.images.unshift(item);
  };

  const delImg = (index) => {
    modelForm.images.splice(index, 1);
  };

  const classificationList = reactive([
    { id: 0, name: '男人' },
    { id: 1, name: '女人' },
    { id: 2, name: '猫' },
    { id: 3, name: '狗' },
    { id: 4, name: '插画' },
    { id: -1, name: '其他' },
  ]);

  const selectClassification = (id) => {
    modelForm.classification.id = id;
  }
</script>
<style lang="less" scoped>
  .modelRepository {
    background: rgba(255, 255, 255, 0.16);
    .model-list {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      padding: 24px;

      .add-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 260px;
        height: 330px;
        background: #000000;
        border-radius: 8px;

        button {
          width: 136px;
          height: 48px;
          background: #8aff00;
          border-radius: 4px;

          img {
            display: inline-block;
          }

          .add-button-text {
            color: #000000;
          }
        }
      }

      .model-item {
        width: 260px;
        height: 330px;
        background: #000000;
        border-radius: 8px;
        position: relative;

        .model-item-generating {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;

          .model-item-generating-text {
            color: #8aff00;
          }
        }

        .model-item-info {
          .model-item-info-content {
            padding: 12px 16px;
          }
          .model-item-info-image {
            height: 242px;
            position: relative;

            .model-item-info-image-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }

            .model-item-info-image-btn {
              position: absolute;
              right: 16px;
              bottom: 16px;
              width: 58px;
              height: 28px;
              line-height: 28px;
              text-align: center;
              background: #8aff00;
              border-radius: 4px;
              display: none;
            }

            .btn-del {
              width: 32px;
              height: 32px;
              display: none;
              align-items: center;
              justify-content: center;
              background: rgba(0, 0, 0, 0.6);
              border-radius: 2px;
              cursor: pointer;
              position: absolute;
              top: 16px;
              left: 16px;
            }
          }

          .model-item-info-name-imageNumber {
            display: flex;
            justify-content: space-between;

            .model-item-info-name {
              color: rgba(255, 255, 255, 0.9);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .model-item-info-imageNumber {
              color: rgba(255, 255, 255, 0.5);
              width: 100px;
              text-align: right;
            }
          }

          .model-item-info-describe {
            color: rgba(255, 255, 255, 0.6);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .model-item-info:hover {
          .model-item-info-image-btn {
            display: block;
          }
          .btn-del {
            display: inline-flex;
          }
        }
      }
    }
  }

  .divider-row {
    border-top: solid 1px rgba(255, 255, 255, 0.2);
    margin: 10px 0px;
  }

  .painting-input {
    width: 100%;
    height: 48px;
    background-color: black;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 400;
    font-size: 14px;
    padding: 0px 50px 0px 24px;
    border-radius: 4px;
  }

  .painting-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .painting-input:focus {
    outline: none;
    border: solid 1px #8aff00;
  }

  .model-create {
    padding: 24px;
    .back {
      .back-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 108px;
        height: 36px;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 4px;
        gap: 4px;
        cursor: pointer;
      }
      .back-icon {
        transform: rotate(90deg);
      }
      .back-text {
        color: rgba(255, 255, 255, 0.9);
      }
    }

    .form-label {
      margin-top: 36px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      .form-label-left {
        width: 4px;
        height: 16px;
        background: #8aff00;
        border-radius: 2px;
      }
      .form-label-text {
        font-weight: 500;
        font-size: 16px;
        color: white;
        margin-left: 8px;
      }
      .form-label-tips {
        color: rgba(255, 255, 255, 0.5);
        margin-left: 24px;
      }
    }

    .image-list {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;

      .image-upload {
        width: 118px;
        height: 118px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-direction: column;
        background: #000000;
        border-radius: 8px;
        color: white;
        position: relative;

        input {
          font-size: 0px;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          opacity: 0;
          cursor: pointer;
        }
      }

      .image-item {
        width: 118px;
        height: 118px;
        background: #000000;
        border-radius: 8px;
        overflow: hidden;
        position: relative;

        .image-item-uploading {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image-item-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .image-item-image-src {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }

          .image-item-image-hover {
            position: absolute;
            width: 100%;
            top: 50%;
            left: 0px;
            transform: translateY(-50%);
            display: none;
            gap: 8px;
            justify-content: center;
            .image-item-image-hover-btn {
              position: relative;
              width: 32px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              background: rgba(0, 0, 0, 0.6);
              border-radius: 2px;
              cursor: pointer;
              .image-item-image-hover-btn-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
        .image-item-image:hover {
          .image-item-image-hover {
            display: flex;
          }
        }
      }
    }

    .classification-list {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .classification-item {
        width: 48px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: rgba(255, 255, 255, 0.16);
        border-radius: 14px;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        // border: solid 1px rgba(255, 255, 255, 0.16);
      }

      .classification-item.active {
        border: 1px solid white;
      }
    }

    .point {
      color: rgba(255, 255, 255, 0.5);
      text-align: right;
      margin-top: 12px;
      a {
        color: rgba(255, 255, 255, 0.5);
        text-decoration: underline;
        margin-left: 20px;
      }
    }

    .btn-submit {
      text-align: right;
      margin-top: 16px;
      button {
        width: 200px;
        font-weight: 400;
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #8aff00;
        border-radius: 4px;
        height: 48px;
        span {
          margin-left: 16px;
          background: #ffcd1a;
          border: 1px solid #000000;
          border-radius: 14px;
          width: 48px;
          display: inline-block;
        }
      }
    }
  }

  .round {
    animation: round 1s linear infinite;
  }

  @keyframes round {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
