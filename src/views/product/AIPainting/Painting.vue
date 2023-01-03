<template>
  <div class="painting">
    <div class="top">
      <div style="width: 100%; position: relative">
        <div style="display: flex">
          <div class="setting" :class="{ active: settingShow }" @click="settingShow = !settingShow"><img class="settingIcon" :src="settingIcon" alt="" /><span class="setting-text">参数设置</span><img class="arrowIcon" :src="arrowIcon" /></div>
          <div class="keyword"><input v-model="settingParams.keyword" placeholder="请输入你想要的图片描述" /><img class="icon" :src="randomGreenIcon" /></div>
          <button class="submit" @click="submit">
            立即生成
            <span class="point">{{ settingParams.totalPoint }}点</span>
          </button>
        </div>
        <div class="setting-content" v-show="settingShow">
          <div class="setting-title">
            <div class="divider-left"></div>
            <div>风格选择</div>
            <div class="setting-style-groups">
              <div v-for="item in style" :key="item.id" class="setting-style-tab" :class="{ active: item.active }" @click="changeStyleTab(item)">{{ item.label }}</div>
            </div>
          </div>
          <div class="setting-style-content">
            <div v-for="item1 in style.find((item) => item.active)?.children || []" :key="item1.id" class="setting-style-item" :class="{ active: item1.active }" @click="changeStyleItem(item1)">
              <img class="setting-style-item-img" :src="item1.image" alt="" />
              <div class="setting-style-item-label">{{ item1.label }}</div>
            </div>
          </div>
          <div class="setting-proportion">
            <div class="setting-proportion-left" style="width: 540px">
              <div class="setting-title"><div class="divider-left"></div>图像比例</div>
              <div class="setting-proportion-content">
                <div v-for="item in proportion" :key="item.id" class="setting-proportion-item" :class="{ active: item.active }" @click="changeProportion(item)">{{ item.text }}</div>
              </div>
            </div>
            <div class="setting-proportion-center" style="width: 360px">
              <div class="setting-title"><div class="divider-left"></div>分辨率</div>
              <div class="setting-resolution">
                <div v-for="item in proportion.find((item1) => item1.active).list" :key="item.id" class="setting-resolution-item" :class="{ active: item.active }" @click="changeResolution(item)">
                  {{ item.resolution }} <div class="point" v-if="item.point > 0">{{ item.point }}点</div>
                </div>
              </div>
            </div>
            <div class="setting-proportion-right">
              <div class="setting-title"><div class="divider-left"></div>生成数量</div>
              <div class="setting-quantity">
                <div class="setting-quantity-item" :class="{ active: settingParams.quantity == 1 }" @click="settingParams.quantity = 1">1 张</div>
                <div class="setting-quantity-item" :class="{ active: settingParams.quantity == 4 }" @click="settingParams.quantity = 4">4 张</div>
                <div class="setting-quantity-item" :class="{ active: settingParams.quantity == 6 }" @click="settingParams.quantity = 6">6 张</div>
              </div>
            </div>
          </div>
          <div class="divider-top"></div>
          <div class="setting-params">
            <div class="params-item" style="width: 620px">
              <div class="setting-title">反向描述</div>
              <div class="form-textarea" style="width: 86%">
                <textarea rows="10" v-model="settingParams.reverseDescription"></textarea>
              </div>
            </div>
            <div class="params-item" style="width: 200px">
              <div class="setting-title">参考图</div>
              <div class="params-image">
                <div class="params-image-upload" v-show="!settingParams.referenceImage">
                  <img :src="plusIcon" alt="" />
                  <div>上传图片</div>
                  <input type="file" @change="changeReferenceImage($event)" />
                </div>
                <div class="params-image-view" v-show="settingParams.referenceImage">
                  <img class="view" :src="settingParams.referenceImage" alt="" />
                  <div class="del-btn" @click="settingParams.referenceImage = ''">
                    <img class="del-icon" :src="deleteIcon" alt="" />
                  </div>
                </div>
              </div>
              <div class="guidanceScale">
                <div class="guidanceScale-title">参考图相似度</div>
                <Slider v-model:value="settingParams.guidanceScale" class="slider" :min="0.01" :max="1" :step="0.01" />
              </div>
            </div>
            <div class="params-item" style="width: 240px">
              <div class="setting-title">种子</div>
              <div class="form-input-icon">
                <input class="form-input" v-model="settingParams.seed" maxlength="9" @input="settingParams.seed = settingParams.seed.replace(/\D/g, '').replace(/^0{1,}/g, '')" />
                <div class="icon-bg" @click="randomSeed()"><img class="icon" :src="randomIcon" alt="" /></div>
              </div>
            </div>
            <div class="params-item">
              <div class="setting-title">提示重量</div>
              <div class="slider-wrap">
                <Slider v-model:value="settingParams.tipWeight" class="slider" :min="1" :max="100" />
                <div class="slider-view">{{ settingParams.tipWeight }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="menu">
        <div class="tabs">
          <button :class="{ active: tab == 'collection' }" @click="changeTab('collection')"><img v-show="tab == 'collection'" :src="collectionIcon_black" /><img v-show="tab == 'collect'" :src="collectionIcon_white" />集合</button>
          <button style="margin-left: 16px" :class="{ active: tab == 'collect' }" @click="changeTab('collect')"><img v-show="tab == 'collection'" :src="starIcon_white" /><img v-show="tab == 'collect'" :src="starIcon_black" />收藏</button>
        </div>
        <div class="search">
          <input v-show="tab == 'collection'" v-model="collectionSearchValue" placeholder="请输入搜索关键词" />
          <input v-show="tab == 'collect'" v-model="collectSearchValue" placeholder="请输入搜索关键词" />
          <img class="icon" :src="searchIcon" />
        </div>
      </div>
      <div class="images">
        <div v-show="tab == 'collection'" class="collection">
          <div v-show="collection.length > 0">
            <div v-for="group in collection" :key="group" class="group">
              <div v-show="group.status == 0" class="queue">
                <div v-show="group.status == 0" class="queueing">
                  <div class="queueing-text">等待排队中({{ group.queue }}人)...</div>
                  <div class="queueing-time">预计等待{{ Math.floor(group.queue * 0.2) }}分钟</div>
                </div>
                <div v-show="false" class="painting">作画中</div>
              </div>
              <div v-show="group.status == 2">
                <div class="group-item">
                  <div v-for="image in group.images" :key="image" class="group-item-content">
                    <div v-if="image.status == '2'" class="image-fail">
                      <div class="image-fail-text">图片已被审核员拦截</div>
                    </div>
                    <div v-else class="image-success">
                      <img class="group-item-image" :src="image.image" alt="" @click="viewImage(group, image)" />
                      <div class="hover">
                        <div>
                          <span class="icon-wrap" @click="deleteImage(group.id, image.id)"><img :src="deleteIcon" /></span>
                        </div>
                        <div>
                          <span class="icon-wrap" @click="doCollect(image)"><img v-show="image.collected" :src="starIcon_active" /><img v-show="!image.collected" :src="starIcon_white" /></span>
                          <span class="icon-wrap" style="margin-left: 8px" @click="downloadImage(image.image)"><img :src="downloadIcon" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="group-keyword">
                <span class="group-keyword-label">画面描述：</span><span class="group-keyword-text">{{ group.keyword }}</span>
              </div>
            </div>
            <Pagination v-model:current="collectionPage.pageNum" :total="collectionPage.total" show-less-items @change="collectionPageChange" style="margin-top: 20px" />
          </div>
          <div v-show="collection.length == 0" class="noData">
            <img :src="noDataImage" alt="" />
            <div>啊欧，还没有画作，快去生成画作吧！</div>
          </div>
        </div>
        <div v-show="tab == 'collect'" class="collect">
          <div v-show="collect.length > 0">
            <div v-masonry fit-width="false" transition-duration="0.3s" item-selector=".collect-item" origin-left="true">
              <div v-masonry-tile v-for="image in collect" :key="image.id" class="collect-item">
                <img class="collect-item-image" :src="image.image" alt="" @click="viewImage(undefined, image)" />
                <div class="hover">
                  <div>
                    <span class="icon-wrap" @click="doCollect(image)"><img :src="subtractIcon" /></span><span class="icon-wrap" style="margin-left: 8px" @click="downloadImage(image.image)"><img :src="downloadIcon" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="collect.length == 0" class="noData">
            <img :src="noDataImage" alt="" />
            <div>啊欧，还没有画作，快去集合点击收藏吧！</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="globalModal">
    <Modal v-model:visible="imageDetailsVisible" :maskClosable="false" width="100%" wrap-class-name="full-modal" :getContainer="() => $refs.globalModal" class="jy-modal" :footer="null">
      <div class="img-details">
        <div class="img-details-wrap">
          <img :src="imageInfo.image" alt="" />
        </div>
        <div class="img-details-info">
          <div class="img-details-info-label" style="margin-top: 0px">画面描述</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.keyword }}</div>
          <div class="img-details-info-label">反向描述</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.reverseDescription }}</div>
          <div class="img-details-info-label">风格选择</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.style.parent.label + '-' + imageInfo.aiPainting.style.label }}</div>
          <div class="img-details-info-label">尺寸</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.resolution }}</div>
          <div class="img-details-info-label">种子</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.seed }}</div>
          <div class="img-details-info-label">提示重量</div>
          <div class="img-details-info-value">{{ imageInfo.aiPainting.tipWeight }}%</div>
          <div class="img-details-info-download"><button @click="downloadImage(imageInfo.image)">下载</button></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, getCurrentInstance, nextTick, onBeforeMount, watch, computed } from 'vue';
  import { message, Slider, Pagination, Modal } from 'ant-design-vue';
  import { getUploadSingnatureApi, aiPaintingStyleApi, aiPaintingCollectionApi, aiPaintingDeleteApi, aiPaintingMyCollectApi, aiPaintingCollectApi, aiPaintingSubmitApi, aiPaintingDetailsApi, aiPaintingQueueApi } from '/@/api/api';
  import axios from 'axios';
  import settingIcon from '/@/assets/icons/setting.svg';
  import arrowIcon from '/@/assets/icons/arrow-down.svg';
  import collectionIcon_black from '/@/assets/icons/collection-black.svg';
  import collectionIcon_white from '/@/assets/icons/collection-white.svg';
  import starIcon_white from '/@/assets/icons/star-white.svg';
  import starIcon_black from '/@/assets/icons/star-black.svg';
  import starIcon_active from '/@/assets/icons/star-active.svg';
  import deleteIcon from '/@/assets/icons/delete.svg';
  import downloadIcon from '/@/assets/icons/download.svg';
  import subtractIcon from '/@/assets/icons/subtract.svg';
  import searchIcon from '/@/assets/icons/search.svg';
  import randomIcon from '/@/assets/icons/random.png';
  import plusIcon from '/@/assets/icons/plus.svg';
  import randomGreenIcon from '/@/assets/icons/random-green.svg';
  import noDataImage from '/@/assets/images/noData.png';

  export default defineComponent({
    name: 'Painting',
    components: { Slider, Pagination, Modal },
    setup() {
      const instance = getCurrentInstance();
      const _this = instance?.appContext.config.globalProperties;

      const settingParams = reactive<any>({
        style: { id: undefined },
        keyword: '',
        referenceImage: '',
        tipWeight: 50,
        reverseDescription: '',
        seed: -1,
        quantity: 1,
        totalPoint: 2,
        guidanceScale: 0.5,
      });

      const collectionPage = reactive({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      });

      const collectionSearchValue = ref('');
      const collectSearchValue = ref('');

      const settingShow = ref(false);

      const tab = ref('collection');
      const collection = ref<any>([]);
      const collect = ref<any>([]);

      const changeTab = (t) => {
        tab.value = t;
        if (t == 'collect') {
          nextTick(() => {
            _this?.$redrawVueMasonry();
          });
        }
      };

      const style = ref<any>([]);
      const getPaintingStyle = () => {
        aiPaintingStyleApi('0').then((res) => {
          if (res.code == 200) {
            res.data[0].active = true;
            res.data[0].children[0].active = true;
            style.value = res.data;
          }
        });
      };

      const changeStyleTab = (item) => {
        const activeTab = style.value.find((item1) => item1.active);
        activeTab.active = false;
        activeTab.children.find((item2) => item2.active).active = false;
        item.active = true;
        item.children[0].active = true;
      };

      const changeStyleItem = (item) => {
        style.value.find((item1) => item1.active).children.find((item2) => item2.active).active = false;
        item.active = true;
      };

      const proportion = reactive<any>([
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '1:1', active: true, list: [{ id: 0, resolution: '512*512', point: 1, active: true }, { id: 1, resolution: '2048*2048', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '3:4', list: [{ id: 0, resolution: '900*1200', point: 1 }, { id: 1, resolution: '1800*2400', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '4:3', list: [{ id: 0, resolution: '1200*900', point: 1 }, { id: 1, resolution: '2400*1800', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '9:16', list: [{ id: 0, resolution: '720*1280', point: 1 }, { id: 1, resolution: '1152*2048', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '16:9', list: [{ id: 0, resolution: '1280*720', point: 1 }, { id: 1, resolution: '2048*1152', point: 2 }] },
      ]);

      const changeProportion = (item0) => {
        const group = proportion.find((item1) => item1.active);
        group.active = false;
        group.list.find((item2) => item2.active).active = false;
        item0.active = true;
        item0.list[0].active = true;
      };

      const changeResolution = (item) => {
        proportion.find((item1) => item1.active).list.find((item2) => item2.active).active = false;
        item.active = true;
      };

      const quantity = reactive<any>([
        { quantity: 1, point: 1, active: true },
        { quantity: 4, point: 2 },
        { quantity: 6, point: 3 },
      ]);

      const changeReferenceImage = (e) => {
        getUploadSingnatureApi('aiPainting').then((res) => {
          const params = new FormData();
          params.append('key', res.data.key);
          params.append('policy', res.data.policy);
          params.append('OSSAccessKeyId', res.data.OSSAccessKeyId);
          params.append('success_action_status', '200');
          params.append('signature', res.data.signature);
          params.append('file', e.target.files[0]);
          axios({
            url: res.data.host,
            method: 'post',
            data: params,
            headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
          }).then(() => {
            settingParams.referenceImage = res.data.url;
          });
        });
      };

      const sampler = ['k_lms', 'k_heun', 'k_euler', 'k_euler_a', 'k_dpm_2', 'k_dpm_2_a', 'k_dpm_fast', 'k_dpm_adaptive', 'k_dpmpp_2m', 'k_dpmpp_2s_a'];

      const getCollection = () => {
        aiPaintingCollectionApi({ searchValue: collectionSearchValue.value, pageSize: collectionPage.pageSize, pageNum: collectionPage.pageNum }).then((res) => {
          if (res.code == 200) {
            collection.value = res.data.rows;
            collectionPage.total = res.data.total;

            clearInterval(queueTask);

            const unfinishList = res.data.rows.filter((item) => item.status == 0);

            if (unfinishList.length > 0) {
              const unfinish = unfinishList[unfinishList.length - 1];
              queueTask = setInterval(() => {
                aiPaintingDetailsApi(unfinish.id).then((res1) => {
                  if (res1.code == 200 && res1.data?.status == 2) {
                    getCollection();
                  }
                });
              }, 3000);
            }
          }
        });
      };

      const deleteImage = (paintingId, imageId) => {
        aiPaintingDeleteApi(paintingId, imageId).then((res) => {
          if (res.code == 200) {
            message.success('删除成功');
            getCollection();
          }
        });
      };

      const getMyCollect = () => {
        aiPaintingMyCollectApi({ searchValue: collectSearchValue.value }).then((res) => {
          if (res.code == 200) {
            collect.value = res.data.rows;
            nextTick(() => {
              _this?.$redrawVueMasonry();
            });
          }
        });
      };

      const doCollect = (image) => {
        aiPaintingCollectApi(image.id, !image.collected).then((res) => {
          if (res.code == 200) {
            message.success((image.collected ? '取消' : '') + '收藏成功');
            // getCollection();
            if (image.aiPainting.quantity == 0) {
              image.collected = !image.collected;
            } else {
              getCollection();
            }
            getMyCollect();
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

      const submiting = ref(false);

      const submit = () => {
        if (submiting.value) {
          return false;
        }

        settingShow.value = false;

        settingParams.style.id = style.value.find((item) => item.active).children.find((item) => item.active).id;
        settingParams.proportion = proportion.find((item) => item.active).text;
        settingParams.resolution = proportion.find((item) => item.active).list.find((item) => item.active).resolution;

        submiting.value = true;
        aiPaintingSubmitApi(settingParams).then((res) => {
          if (res.code == 200) {
            message.success('提交成功，正在作画，请稍后');
            getCollection();
          }
          submiting.value = false;
        });
      };

      let queueTask: any = 0;

      const collectionPageChange = (page, pageSize) => {
        collectionPage.pageSize = pageSize;
        getCollection();
      };

      const imageDetailsVisible = ref(false);
      const imageInfo = ref<any>({});

      settingParams.totalPoint = computed(() => {
        return proportion.find((item1) => item1.active).list.find((item2) => item2.active).point * settingParams.quantity;
      });

      const randomSeed = () => {
        settingParams.seed = Math.ceil(Math.random() * 999999999);
        console.log(settingParams.seed);
      };

      const viewImage = (group, image) => {
        if (group) {
          image.aiPainting = group;
        }
        imageInfo.value = image;
        nextTick(() => {
          imageDetailsVisible.value = true;
        });
      };

      watch(collectSearchValue, () => {
        getMyCollect();
      });
      watch(collectionSearchValue, () => {
        getCollection();
      });

      onBeforeMount(() => {
        getPaintingStyle();
        getCollection();
        getMyCollect();
      });

      return {
        settingParams,
        settingIcon,
        arrowIcon,
        randomIcon,
        collectionIcon_black,
        collectionIcon_white,
        starIcon_white,
        starIcon_black,
        starIcon_active,
        deleteIcon,
        downloadIcon,
        subtractIcon,
        searchIcon,
        collection,
        collect,
        tab,
        changeTab,
        style,
        changeStyleTab,
        changeStyleItem,
        proportion,
        quantity,
        changeProportion,
        changeResolution,
        plusIcon,
        changeReferenceImage,
        settingShow,
        randomGreenIcon,
        sampler,
        getPaintingStyle,
        aiPaintingCollectionApi,
        deleteImage,
        getMyCollect,
        doCollect,
        downloadImage,
        noDataImage,
        collectionSearchValue,
        collectSearchValue,
        getCollection,
        submit,
        collectionPage,
        collectionPageChange,
        imageDetailsVisible,
        randomSeed,
        viewImage,
        imageInfo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .painting {
    .top {
      padding: 24px 24px;
      background: rgba(255, 255, 255, 0.16);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      .setting {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 14px;
        color: white;
        width: 158px;
        background-color: black;
        height: 48px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;

        .setting-text {
          margin: 0px 12px;
        }

        .settingIcon,
        .arraowIcon {
          width: 24px;
          height: 24px;
        }
      }

      .setting.active {
        border: 1px solid #8aff00;

        .arrowIcon {
          transform: rotate(180deg);
        }
      }

      .keyword {
        flex: 1;
        background-color: black;
        margin: 0px 16px;
        border-radius: 4px;
        position: relative;
        height: 48px;
        overflow: hidden;

        input {
          width: 100%;
          height: 100%;
          background-color: black;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          font-size: 14px;
          padding: 0px 50px 0px 24px;
        }

        .icon {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
        }
      }
      .submit {
        width: 200px;
        font-weight: 400;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #8aff00;
        border-radius: 4px;
        height: 48px;

        .point {
          margin-left: 16px;
          background: #ffcd1a;
          border: 1px solid #000000;
          border-radius: 14px;
          width: 48px;
          height: 26px;
        }
      }

      .setting-content {
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0px;
        z-index: 1;
        border: 1px solid #8aff00;
        border-radius: 4px;
        background-color: black;
        padding: 16px;

        .setting-title {
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          color: white;

          .divider-left {
            width: 4px;
            height: 16px;
            margin-right: 8px;
            border-radius: 4px;
            background-color: #8aff00;
          }
        }

        .setting-style-groups {
          display: flex;
          margin-left: 36px;

          .setting-style-tab {
            margin: 0px 6px;
            font-weight: 400;
            font-size: 14px;
            height: 24px;
            padding: 2px 10px;
            text-align: center;
            color: rgba(255, 255, 255, 0.5);
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
            cursor: pointer;
          }

          .setting-style-tab.active {
            background: #8aff00;
            color: #000000;
          }
        }

        .setting-style-content {
          display: flex;
          gap: 16px;
          margin-top: 16px;

          .setting-style-item {
            width: 96px;
            height: 96px;
            position: relative;
            border-radius: 4px;
            overflow: hidden;
            cursor: pointer;

            .setting-style-item-img {
              width: 100%;
              height: 100%;
            }

            .setting-style-item-label {
              position: absolute;
              left: 0px;
              bottom: 0px;
              background-color: white;
              padding: 2px 10px;
              font-weight: 400;
              font-size: 12px;
              text-align: center;
              color: #000000;
              border-top-right-radius: 4px;
            }
          }

          .setting-style-item.active {
            border: solid 1px #8aff00;

            .setting-style-item-label {
              background: #8aff00;
            }
          }
        }

        .setting-proportion {
          margin-top: 24px;
          display: flex;

          .setting-proportion-content {
            display: flex;
            gap: 16px;
            margin-top: 16px;

            .setting-proportion-item {
              width: 78px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              color: rgba(255, 255, 255, 0.9);
              background: rgba(255, 255, 255, 0.16);
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
            }

            .setting-proportion-item.active {
              background: #8aff00;
              color: black;
            }
          }

          .setting-resolution,
          .setting-quantity {
            display: flex;
            gap: 16px;
            margin-top: 16px;

            .setting-resolution-item,
            .setting-quantity-item {
              min-width: 102px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              color: rgba(255, 255, 255, 0.9);
              background: rgba(255, 255, 255, 0.16);
              border-radius: 4px;
              cursor: pointer;
              font-size: 14px;
              padding: 0px 20px;

              .point {
                display: inline-block;
                width: 28px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
                background: #000000;
                border-radius: 3px;
                margin-left: 8px;
              }
            }

            .setting-resolution-item.active,
            .setting-quantity-item.active {
              background: #8aff00;
              color: black;

              .point {
                color: #8aff00;
              }
            }
          }
        }

        .divider-top {
          border-top: solid 1px rgba(255, 255, 255, 0.2);
          margin: 24px 0px;
        }

        .setting-params {
          display: flex;

          .setting-title {
            margin-bottom: 16px;
          }

          .form-textarea {
            width: 100%;
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            height: 190px;

            textarea {
              background: rgba(255, 255, 255, 0.16);
              padding: 16px;
              color: rgba(255, 255, 255, 0.9);
              font-size: 14px;
              resize: none;
              height: 100%;
              width: 100%;
            }

            .icon {
              position: absolute;
              right: 8px;
              bottom: 8px;
              cursor: pointer;
            }

            textarea:focus-visible {
              outline: none;
            }
          }

          .params-image {
            width: 120px;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
            background: rgba(255, 255, 255, 0.16);

            .params-image-upload {
              position: absolute;
              text-align: center;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: white;
              cursor: pointer;

              img {
                display: inline-block;
              }

              input[type='file'] {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                cursor: pointer;
                font-size: 0px;
                opacity: 0;
              }
            }

            .params-image-view {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0px;
              top: 0px;

              .view {
                width: 100%;
                height: 100%;
              }

              .del-btn {
                width: 32px;
                height: 32px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                line-height: 32px;
                text-align: center;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 2px;
                display: none;
                cursor: pointer;

                .del-icon {
                  display: inline-block;
                }
              }
            }

            .params-image-view:hover .del-btn {
              display: block;
            }
          }

          .guidanceScale {
            margin-top: 24px;
            width: 120px;

            .guidanceScale-title {
              color: rgba(255, 255, 255, 0.6);
            }

            :deep(.slider) {
              .ant-slider-handle {
                background-color: #8aff00 !important;
              }

              .ant-slider-track {
                background-color: #8aff00 !important;
                z-index: 1;
              }

              .ant-slider-rail {
                background-color: black;
              }

              .ant-slider-step {
                background: rgba(255, 255, 255, 0.16) !important;
              }
            }
          }

          .form-input-icon {
            width: 166px;
            height: 36px;
            border-radius: 4px;
            overflow: hidden;
            position: relative;

            input {
              width: 100%;
              height: 100%;
              color: rgba(255, 255, 255, 0.9);
              background: rgba(255, 255, 255, 0.16);
              padding: 0px 24px;
            }

            input:focus-visible {
              outline: none;
            }

            .icon-bg {
              position: absolute;
              width: 36px;
              height: 36px;
              top: 0px;
              right: 0px;
              background: rgba(255, 255, 255, 0.16);
              border-radius: 4px;
              cursor: pointer;
            }

            img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
          }

          .slider-wrap {
            display: flex;
            width: 300px;
            align-items: center;

            .slider {
              flex: 1;
              margin-right: 12px;
            }

            :deep(.slider) {
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
                background: rgba(255, 255, 255, 0.16) !important;
              }
            }

            .slider-view {
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
        }
      }
    }
    .menu {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
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
      .search {
        height: 40px;
        width: 540px;
        border-radius: 4px;
        position: relative;
        overflow: hidden;

        input {
          width: 100%;
          height: 100%;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.16);
          padding-left: 48px;
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
        }
      }
    }

    .images {
      padding: 0px 24px;

      .collection {
        transform: translateY(-24px);
        .group {
          margin-top: 24px;

          .queue {
            width: 212px;
            height: 378px;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
            position: relative;
            color: rgba(255, 255, 255, 0.9);

            .queueing {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateX(-50%);
              width: 100%;
              text-align: center;
              height: 165px;

              .queueing-time {
                position: absolute;
                bottom: 0px;
                width: 100%;
                color: #ffcd1a;
              }
            }
          }
          .group-item {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            .group-item-content {
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              cursor: pointer;

              .group-item-image {
                max-height: 378px;
                max-width: 212px;
                object-fit: contain;
              }

              .hover {
                position: absolute;
                top: 0px;
                left: 0px;
                padding: 14px;
                display: none;
                justify-content: space-between;
                width: 100%;

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

              .image-fail {
                width: 212px;
                min-height: 212px;
                height: 100%;
                position: relative;
                border: solid 1px rgba(255, 255, 255, 0.5);
                border-radius: 4px;

                .image-fail-text {
                  color: rgba(255, 255, 255, 0.5);
                  width: 100%;
                  text-align: center;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }

            .group-item-content:hover .hover {
              display: flex;
              color: white;
            }
          }

          .group-keyword {
            margin-top: 10px;
            height: 36px;
            border-bottom: 1px solid #4d4d4d;
            display: flex;

            .group-keyword-label {
              color: rgba(255, 255, 255, 0.5);
              width: 70px;
            }
            .group-keyword-text {
              color: rgba(255, 255, 255, 0.9);
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      .collect {
        margin: -12px 0px 0px -12px;
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
          }
          .hover {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            display: none;
            justify-content: flex-end;
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
        }

        .collect-item:hover .hover {
          display: flex;
        }
      }
    }
  }

  .noData {
    padding: 100px 0px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    height: 360px;

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
  }
</style>
