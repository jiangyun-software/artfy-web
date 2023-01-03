<template>
  <div class="collection">
    <div v-show="collection.length > 0">
      <div v-masonry fit-width="false" transition-duration="0.3s" item-selector=".collect-item" origin-left="true">
        <div v-masonry-tile v-for="image in collection" :key="image.id" class="collect-item">
          <div v-if="image.status == 2">
            <img class="collect-item-image" :src="image.image" alt="" @click="viewImage(image)" />
            <div class="hover">
              <div>
                <span class="icon-wrap" @click="deleteImage(image.id)"><img :src="deleteIcon" /></span>
              </div>
              <div>
                <span class="icon-wrap" @click="doCollect(image)"><img v-show="image.collected" :src="starIcon_active" /><img v-show="!image.collected" :src="starIcon_white" /></span>
                <span class="icon-wrap" style="margin-left: 8px" @click="downloadImage(image.image)"><img :src="downloadIcon" /></span>
              </div>
            </div>
          </div>
          <div v-else class="painting">
            <div class="queue">等待排队中（{{ image.queue }}人）</div>
            <div class="time">预计等待{{ Math.floor(image.queue * 0.2) }}分钟</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="collection.length > 0 && total > pageParams.pageNum * pageParams.pageSize" class="more" @click="more()">查看更多</div>
    <div v-show="collection.length == 0" class="noData">
      <img :src="noDataImage" alt="" />
      <div>啊欧，还没有画作，快去生成画作吧！</div>
    </div>
  </div>
  <div ref="globalModal">
    <Modal v-model:visible="imageDetailsVisible" :maskClosable="false" width="100%" wrap-class-name="full-modal" :getContainer="() => $refs.globalModal" class="jy-modal" :footer="null">
      <div class="img-details">
        <div class="img-details-wrap">
          <img :src="imageInfo.image" alt="" />
        </div>
        <div class="img-details-info">
          <div class="img-details-info-label" style="margin-top: 0px">参考图</div>
          <div class="img-details-info-value"><img class="initImage" :src="imageInfo.initImage" /></div>
          <div class="img-details-info-label">风格选择</div>
          <div class="img-details-info-value">{{ imageInfo.style.label }}</div>
          <div class="img-details-info-label">参考图差异度</div>
          <div class="img-details-info-value">{{ imageInfo.guidanceScale }}%</div>
          <div class="img-details-info-download"><button @click="downloadImage(imageInfo.image)">下载</button></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, nextTick, getCurrentInstance, onBeforeMount } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { img2imgListApi, img2imgCollectApi, img2imgDeleteApi, img2imgDetailsApi } from '/@/api/api';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import collectionIcon_black from '/@/assets/icons/collection-black.svg';
  import collectionIcon_white from '/@/assets/icons/collection-white.svg';
  import starIcon_white from '/@/assets/icons/star-white.svg';
  import starIcon_black from '/@/assets/icons/star-black.svg';
  import starIcon_active from '/@/assets/icons/star-active.svg';
  import deleteIcon from '/@/assets/icons/delete.svg';
  import downloadIcon from '/@/assets/icons/download.svg';
  import noDataImage from '/@/assets/images/noData.png';
  import subtractIcon from '/@/assets/icons/subtract.svg';

  export default defineComponent({
    name: 'Img2imgCollection',
    components: { Modal },
    setup() {
      const router = useRouter();

      const pageParams = reactive({
        pageNum: 1,
        pageSize: 10,
      });

      const more = () => {
        pageParams.pageSize = pageParams.pageSize + 10;
        getCollection();
      };

      const collection = ref<any>([]);
      const total = ref(0);

      const instance = getCurrentInstance();
      const _this = instance?.appContext.config.globalProperties;

      const imageInfo = ref<any>({});
      const imageDetailsVisible = ref(false);

      const viewImage = (image) => {
        imageInfo.value = image;
        nextTick(() => {
          imageDetailsVisible.value = true;
        });
      };

      const deleteImage = (id) => {
        img2imgDeleteApi(id).then((res) => {
          if (res.code == 200) {
            message.success('删除成功');
            getCollection();
          }
        });
      };

      const doCollect = (image) => {
        img2imgCollectApi(image.id, !image.collected).then((res) => {
          if (res.code == 200) {
            message.success((image.collected ? '取消' : '') + '收藏成功');
            // getCollection();
            image.collected = !image.collected;
          }
        });
      };

      const downloadImage = (url) => {
        axios.get(url, { responseType: 'blob' }).then((res) => {
          let url = window.URL.createObjectURL(res.data);
          let a = document.createElement('a');
          a.href = url;
          a.download = new Date().getTime() + '.png';
          a.click();
        });
      };

      let queueTask: any = 0;

      const getCollection = () => {
        img2imgListApi(pageParams).then((res) => {
          if (res.code == 200) {
            collection.value = res.data.rows;
            total.value = res.data.total;

            nextTick(() => {
              setTimeout(() => _this?.$redrawVueMasonry(), 1000);
            });

            clearInterval(queueTask);

            const unfinishList = res.data.rows.filter((item) => item.status == 0);

            if (unfinishList.length > 0) {
              const unfinish = unfinishList[unfinishList.length - 1];
              queueTask = setInterval(() => {
                img2imgDetailsApi(unfinish.id).then((res1) => {
                  if (res1.code == 200 && res1.data?.status == 2) {
                    getCollection();
                  }
                });
              }, 3000);
            }
          }
        });
      };

      const getList = () => {
        getCollection();
      };

      onBeforeMount(() => {
        getCollection();
      });

      return {
        router,
        scroll,
        collection,
        collectionIcon_black,
        collectionIcon_white,
        starIcon_white,
        starIcon_black,
        starIcon_active,
        deleteIcon,
        viewImage,
        deleteImage,
        downloadIcon,
        noDataImage,
        doCollect,
        downloadImage,
        subtractIcon,
        getCollection,
        getList,
        total,
        pageParams,
        more,
        imageDetailsVisible,
        imageInfo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .collection {
    .collect-item {
      position: relative;
      width: 212px;
      margin: 12px;
      border-radius: 4px;
      overflow: hidden;

      .collect-item-image {
        max-height: 378px;
        max-width: 212px;
        object-fit: contain;
        cursor: pointer;
      }
      .hover {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        display: none;
        justify-content: space-between;
        padding: 14px;

        .icon-wrap {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 2px;
          cursor: pointer;
        }
      }

      .painting {
        position: relative;
        height: 212px;
        background: rgba(255, 255, 255, 0.16);
        .queue {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
        }
        .time {
          position: absolute;
          bottom: 12px;
          width: 100%;
          text-align: center;
          color: rgba(255, 205, 26, 0.9);
        }
      }
    }

    .collect-item:hover .hover {
      display: flex;
    }

    .more {
      color: rgba(255, 255, 255, 0.9);
      text-align: center;
      cursor: pointer;
    }
  }

  .noData {
    text-align: center;
    color: rgba(255, 255, 255, 0.5);

    img {
      display: inline-block;
    }
  }

  :deep(.full-modal) {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
      background-color: black;
    }
    .ant-modal-body {
      flex: 1;
    }

    .ant-modal-close {
      color: white;
    }
  }

  .img-details {
    display: flex;
    min-width: 1290;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .img-details-wrap {
      width: 600px;
      height: 600px;
      background: rgba(255, 255, 255, 0.16);
      border-radius: 4px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .img-details-info {
      width: 540px;
      margin-left: 90px;

      .img-details-info-label {
        font-weight: 500;
        font-size: 16px;
        color: white;
        margin-top: 32px;
      }

      .img-details-info-value {
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        margin-top: 8px;
      }

      .img-details-info-download {
        position: absolute;
        left: 690px;
        bottom: 0px;

        button {
          width: 168px;
          background: #8aff00;
          border-radius: 4px;
          color: black;
          height: 48px;
          line-height: 48px;
          font-size: 16px;
        }
      }
    }

    .initImage {
      max-height: 378px;
      max-width: 212px;
      object-fit: contain;
    }
  }
</style>
