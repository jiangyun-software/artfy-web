<template>
  <div class="painting">
    <div class="top">
      <div class="top-row">
        <div class="model-select" :class="{ active: modelSelectActive }" @click="selectModel()">
          <span class="setting-text">{{ modelList.find((item) => item.active)?.name || '模型选择' }}</span>
          <img class="arrowIcon" :src="arrowIcon" />
        </div>
        <div class="model-select" :class="{ active: caseSelectActive }" @click="selectCase()">
          <span>
            <span class="setting-text">{{ caseTree.find((item) => item.active)?.case.find((item) => item.active)?.name || '案例选择' }} </span>
            <span v-show="!caseTree.find((item) => item.active)?.case.find((item) => item.active)" class="setting-text-notSelect"> (可不选)</span>
          </span>
          <img class="arrowIcon" :src="arrowIcon" />
        </div>
        <transition name="slide">
          <div class="select-pop" v-show="modelSelectActive">
            <div class="model-add-btn">
              <img :src="plusIcon" alt="" />
              <div>创建模型</div>
            </div>
            <div v-for="item in modelList" :key="item.id" class="model-item" :class="{ active: item.active }" @click="selectModelItem(item.id)">
              <img :src="item.image" alt="" />
              <div class="model-item-name">{{ item.name }}</div>
            </div>
          </div>
        </transition>
        <transition name="slide">
          <div class="case-pop" v-show="caseSelectActive">
            <div class="case-group">
              <div v-for="group in caseTree" :key="group.id" class="case-group-item" :class="{ active: group.active }" @click="selectCaseGroup(group.id)">
                <img v-if="!group.active" :src="group.icon.split(',')[0]" alt="" /><img v-if="group.active" :src="group.icon.split(',')[1]" alt="" /><span>{{ group.name }}</span>
              </div>
            </div>
            <div class="case-list">
              <div v-for="item in caseTree.find((item) => item.active)?.case" :key="item.id" class="case-item" :class="{ active: item.active }" @click="selectCaseItem(item.id)">
                <img :src="item.image" alt="" />
                <div class="case-item-name">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="top-row" style="margin-top: 16px">
        <div style="width: 100%; position: relative">
          <div style="display: flex">
            <div class="setting" :class="{ active: settingShow }" @click="changeSetting()"><img class="settingIcon" :src="settingIcon" alt="" /><span class="setting-text">参数设置</span><img class="arrowIcon" :src="arrowIcon" /></div>
            <div class="keyword"><input v-model="settingParams.keyword" placeholder="请输入你想要的图片描述" /><img class="icon" :src="randomGreenIcon" @click="round" :class="{ round: rounding }" /></div>
            <button class="submit" @click="submit">
              立即生成
              <span class="point">{{ settingParams.totalPoint }}点</span>
            </button>
          </div>
          <transition name="slide">
            <div class="setting-content" v-show="settingShow">
              <div class="setting-group">
                <div class="setting-title">
                  <div class="divider-left"></div>
                  <div>分辨率</div>
                </div>
                <div class="setting-resolution">
                  <div v-for="item in resolution" :key="item.id" class="setting-resolution-item" :class="{ active: item.active }" @click="changeResolution(item.id)">
                    {{ item.text }} <div class="point">{{ item.point }}点</div>
                  </div>
                </div>
              </div>
              <div class="setting-group" style="margin-left: 72px">
                <div class="setting-title">
                  <div class="divider-left"></div>
                  <div>生成数量</div>
                </div>
                <div class="setting-resolution">
                  <div v-for="item in quantity" :key="item.id" class="setting-resolution-item" :class="{ active: item.active }" style="width: 100px" @click="changeQuantity(item.id)">{{ item.quantity }}张</div>
                </div>
              </div>
              <div class="divider-top"></div>
              <div style="display: flex">
                <div class="setting-group">
                  <div class="setting-title">
                    <div>种子数量</div>
                  </div>
                  <div class="form-input-icon">
                    <input class="form-input" v-model="settingParams.seed" maxlength="9" @input="settingParams.seed = settingParams.seed.replace(/\D/g, '').replace(/^0{1,}/g, '')" />
                    <div class="icon-bg" @click="randomSeed()"><img class="icon" :src="randomIcon" alt="" /></div>
                  </div>
                </div>
                <div class="setting-group" style="margin-left: 72px">
                  <div class="setting-title">
                    <div>提示重量</div>
                  </div>
                  <div class="slider-wrap">
                    <Slider v-model:value="settingParams.tipWeight" class="slider" :min="0" :max="100" :step="10" />
                    <div class="slider-view">{{ settingParams.tipWeight }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
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
        guidanceScale: 60,
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

      const resolution = reactive<any>([
        { id: 0, text: '标清', active: true, point: 1 },
        { id: 1, text: '高清', active: false, point: 2 },
      ]);

      const changeResolution = (id) => {
        resolution.forEach((item) => {
          if (item.id == id) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
      };

      const quantity = reactive<any>([
        { id: 0, quantity: 1, point: 1, active: true },
        { id: 1, quantity: 4, point: 2 },
        { id: 2, quantity: 6, point: 3 },
      ]);

      const changeQuantity = (id) => {
        quantity.forEach((item) => {
          if (item.id == id) {
            item.active = true;
            settingParams.quantity = item.quantity;
          } else {
            item.active = false;
          }
        });
      };

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
        // settingParams.resolution = proportion.find((item) => item.active).list.find((item) => item.active).resolution;

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
        return resolution.find((item1) => item1.active).point * settingParams.quantity;
      });

      const tipWeightDeg = ref('50deg');
      watch(settingParams, () => {
        tipWeightDeg.value = (settingParams.tipWeight / 100) * 360 + 'deg';
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

      const rounding = ref(false);
      const round = () => {
        if (!rounding.value) {
          rounding.value = true;
          setTimeout(() => {
            rounding.value = false;
          }, 400);
        }
      };

      const modelSelectActive = ref(false);
      const caseSelectActive = ref(false);

      const selectModel = () => {
        caseSelectActive.value = false;
        settingShow.value = false;
        modelSelectActive.value = !modelSelectActive.value;
      };

      const selectCase = () => {
        modelSelectActive.value = false;
        settingShow.value = false;
        caseSelectActive.value = !caseSelectActive.value;
      };

      const changeSetting = () => {
        caseSelectActive.value = false;
        modelSelectActive.value = false;
        settingShow.value = !settingShow.value;
      };

      const modelList = reactive([
        { id: 0, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test0' },
        { id: 1, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test1', active: true },
        { id: 2, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test2' },
        { id: 3, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test3' },
        { id: 4, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test4' },
        { id: 5, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test5' },
        { id: 6, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test6' },
        { id: 7, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test7' },
        { id: 8, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test8' },
        { id: 9, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test9' },
        { id: 10, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'tes10t' },
        { id: 11, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test11' },
        { id: 12, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test12' },
        { id: 13, image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', name: 'test13' },
      ]);

      const selectModelItem = (modelId) => {
        modelList.forEach((item) => {
          if (item.id == modelId) {
            item.active = true;
          } else {
            item.active = false;
          }
        });
      };

      const caseTree = reactive([
        {
          id: 0,
          name: '人',
          icon: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97,https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97',
          active: true,
          case: [
            { id: 0, name: '案例0', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 1, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', active: false },
            { id: 2, name: '案例2', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 3, name: '案例3', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 4, name: '案例4', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 5, name: '案例5', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 6, name: '案例6', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 7, name: '案例7', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 8, name: '案例8', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 9, name: '案例9', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 10, name: '案例10', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 11, name: '案例11', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
          ],
        },
        {
          id: 1,
          name: '猫',
          icon: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97,https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97',
          case: [
            { id: 0, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 1, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 2, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 3, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', active: true },
            { id: 4, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 5, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 6, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 7, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 8, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 9, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 10, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 11, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
          ],
        },
        {
          id: 2,
          name: '狗',
          icon: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97,https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97',
          case: [
            { id: 0, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 1, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 2, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 3, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 4, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 5, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 6, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 7, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 8, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 9, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97', active: true },
            { id: 10, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
            { id: 11, name: '案例1', image: 'https://jyzn-static-test1.oss-cn-shenzhen.aliyuncs.com/c888a6b6-d844-4ad5-95df-b1c3b015ff97' },
          ],
        },
      ]);

      const selectCaseGroup = (groupId) => {
        caseTree.forEach((group) => {
          if (group.id == groupId) {
            group.active = true;
          } else {
            group.active = false;
          }
        });
      };

      const selectCaseItem = (caseId) => {
        caseTree
          .find((item) => item.active)
          ?.case.forEach((item) => {
            if (item.id == caseId) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
      };

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
        resolution,
        quantity,
        changeQuantity,
        changeResolution,
        plusIcon,
        settingShow,
        randomGreenIcon,
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
        round,
        rounding,
        tipWeightDeg,
        modelSelectActive,
        caseSelectActive,
        selectModel,
        selectCase,
        changeSetting,
        modelList,
        selectModelItem,
        caseTree,
        selectCaseGroup,
        selectCaseItem,
      };
    },
  });
</script>
<style lang="less" scoped>
  .painting {
    .top {
      padding: 16px 24px 24px 24px;
      background: rgba(255, 255, 255, 0.16);
    }
    .top-row {
      display: flex;
      align-items: center;
      position: relative;
      gap: 16px;

      .model-select {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 400;
        font-size: 14px;
        color: white;
        width: 340px;
        background-color: black;
        height: 48px;
        border-radius: 4px;
        position: relative;
        cursor: pointer;
        padding: 0px 16px;

        .setting-text-notSelect {
          color: rgba(255, 255, 255, 0.5);
        }
      }

      .model-select.active {
        border: 1px solid #8aff00;
        .arrowIcon {
          transform: rotate(180deg);
        }
      }

      .select-pop {
        position: absolute;
        width: 100%;
        top: 60px;
        left: 0px;
        z-index: 1;
        border: 1px solid #8aff00;
        border-radius: 4px;
        background-color: black;
        padding: 16px;
        overflow: hidden;
        color: white;
        display: flex;
        gap: 20px;
        flex-wrap: wrap;

        .model-add-btn {
          width: 118px;
          height: 118px;
          text-align: center;
          background: rgba(255, 255, 255, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 4px;
          cursor: pointer;
        }

        .model-item {
          width: 118px;
          height: 118px;
          text-align: center;
          background: rgba(255, 255, 255, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          border-radius: 4px;
          position: relative;
          cursor: pointer;

          .model-item-name {
            position: absolute;
            width: 100%;
            height: 24px;
            line-height: 24px;
            background: rgba(0, 0, 0, 0.8);
            left: 0px;
            bottom: 0px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .model-item.active {
          border: 1px solid #8aff00;
          .model-item-name {
            background: #8aff00;
            color: black;
          }
        }
      }

      .case-pop {
        border: 1px solid #8aff00;
        border-radius: 4px;
        background-color: black;
        padding: 16px;
        position: absolute;
        z-index: 1;
        width: 100%;
        top: 60px;
        left: 0px;
        .case-group {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: flex-start;

          .case-group-item {
            width: 88px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            color: white;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
            cursor: pointer;

            img {
              width: 18px;
              height: 18px;
              object-fit: contain;
            }
          }

          .case-group-item.active {
            background: #8aff00;
            color: black;
          }
        }

        .case-list {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 16px;

          .case-item {
            width: 118px;
            height: 118px;
            text-align: center;
            background: rgba(255, 255, 255, 0.16);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 4px;
            position: relative;
            cursor: pointer;

            .case-item-name {
              position: absolute;
              width: 100%;
              height: 24px;
              line-height: 24px;
              background: rgba(0, 0, 0, 0.8);
              left: 0px;
              bottom: 0px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: white;
            }

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          }

          .case-item.active {
            border: 1px solid #8aff00;
            .case-item-name {
              background: #8aff00;
              color: black;
            }
          }
        }
      }

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
        // overflow: hidden;

        input {
          width: 100%;
          height: 100%;
          background-color: black;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          font-size: 14px;
          padding: 0px 50px 0px 24px;
          border-radius: 4px;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        input:focus {
          outline: none;
          border: solid 1px #8aff00;
        }

        .icon {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          // transform-origin: 0 0;
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
        overflow: hidden;

        .setting-group {
          display: inline-block;
        }

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

        .divider-top {
          border-top: solid 1px rgba(255, 255, 255, 0.2);
          margin: 24px 0px;
        }

        .setting-resolution {
          display: inline-flex;
          border-radius: 4px;
          gap: 16px;
          margin-top: 16px;

          .setting-resolution-item {
            text-align: center;
            color: #ffffffe6;
            background: rgba(255, 255, 255, 0.16);
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-left: 8px;
            padding: 6px 16px;

            .point {
              display: inline-block;
              width: 28px;
              height: 18px;
              line-height: 18px;
              font-size: 12px;
              color: #ffffff80;
              background: #000000;
              border-radius: 3px;
              margin-left: 8px;
            }
          }

          .setting-resolution-item.active {
            background: #8aff00;
            color: black;
            .point {
              color: #8aff00;
            }
          }
        }

        .form-input-icon {
          width: 166px;
          height: 36px;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          margin-top: 16px;

          input {
            width: 100%;
            height: 100%;
            color: rgba(255, 255, 255, 0.9);
            background: rgba(255, 255, 255, 0.16);
            padding: 0px 24px;
            ::placeholder {
              color: red;
            }
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
          margin-top: 16px;

          .slider {
            flex: 1;
            margin-right: 12px;
          }

          :deep(.slider) {
            .ant-slider-handle {
              background: url('/@/assets/icons/slider-handle.png') !important;
              transform: translateX(-50%) rotate(v-bind(tipWeightDeg)) !important;
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
        // overflow: hidden;

        input {
          width: 100%;
          height: 100%;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 400;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.16);
          padding-left: 48px;
          border-radius: 4px;
        }
        input:focus {
          outline-color: #8aff00;
          outline-style: solid;
          outline-width: 1px;
        }
        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
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

  .round {
    animation: round 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes round {
    0% {
      transform: translateY(-50%) rotate(0deg);
    }

    100% {
      transform: translateY(-50%) rotate(360deg);
    }
  }

  @keyframes slide {
    from {
      max-height: 0px;
    }
    to {
      max-height: 100vh;
    }
  }

  /* 2. 过渡类名 */
  /* 开始 */
  .slide-enter-active {
    // animation: slide 0.2s;
    animation: slide 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide-leave-active {
    animation: slide 0.2s cubic-bezier(0.2, 0, 0.2, 1) reverse;
  }
</style>
