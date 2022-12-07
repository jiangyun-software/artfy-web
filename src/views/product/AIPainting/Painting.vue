<template>
  <div class="painting">
    <div class="top">
      <div class="setting">
        <img class="settingIcon" :src="settingIcon" alt="" /><span class="setting-text">参数设置</span><img class="arrowIcon" :src="arrowIcon" />
        <div class="setting-content">
          <div class="setting-style">

          </div>
        </div>
      </div>
      <div class="keyword"><input v-model="params.keyword" /><img class="icon" :src="randomIcon" /></div>
      <button class="submit">立即生成<span class="point">2点</span></button>
    </div>
    <div class="content">
      <div class="menu">
        <div class="tabs">
          <button :class="{ active: tab == 'collection' }" @click="changeTab('collection')"><img v-show="tab == 'collection'" :src="collectionIcon_black" /><img v-show="tab == 'collect'" :src="collectionIcon_white" />集合</button>
          <button style="margin-left: 16px" :class="{ active: tab == 'collect' }" @click="changeTab('collect')"><img v-show="tab == 'collection'" :src="starIcon_white" /><img v-show="tab == 'collect'" :src="starIcon_black" />收藏</button>
        </div>
        <div class="search"><input placeholder="请输入搜索关键词" /><img class="icon" :src="searchIcon" /></div>
      </div>
      <div class="images">
        <div v-show="tab == 'collection'" class="collection">
          <div v-for="group in collection" :key="group" class="group">
            <div class="group-item">
              <div v-for="image in group.images" :key="image" class="group-item-content">
                <img class="group-item-image" :src="image.url" alt="" />
                <div class="hover">
                  <div><span class="icon-wrap"><img :src="deleteIcon" /></span></div>
                  <div><span class="icon-wrap"><img v-show="image.collected" :src="starIcon_active" /><img v-show="!image.collected" :src="starIcon_white" /></span><span class="icon-wrap" style="margin-left: 8px;"><img :src="downloadIcon" /></span></div>
                </div>
              </div>
            </div>
            <div class="group-keyword"><span class="group-keyword-label">画面描述：</span><span class="group-keyword-text">{{ group.keyword }}</span></div>
          </div>
        </div>
        <div v-show="tab == 'collect'" class="collect">
          <div v-masonry fit-width="true" transition-duration="0.3s" item-selector=".collect-item" origin-left="false">
            <div v-masonry-tile v-for="image in collect" :key="image.id" class="collect-item">
              <img class="collect-item-image" :src="image.url" alt="" />
              <div class="hover">
                <div><span class="icon-wrap"><img :src="subtractIcon" /></span><span class="icon-wrap" style="margin-left: 8px;"><img :src="downloadIcon" /></span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, getCurrentInstance, nextTick } from 'vue';
  import settingIcon from '/@/assets/icons/setting.svg';
  import arrowIcon from '/@/assets/icons/arrow-down.svg';
  import randomIcon from '/@/assets/icons/random.svg';
  import collectionIcon_black from '/@/assets/icons/collection_black.png';
  import collectionIcon_white from '/@/assets/icons/collection_white.png';
  import starIcon_white from '/@/assets/icons/star_white.png';
  import starIcon_black from '/@/assets/icons/star_black.png';
  import starIcon_active from '/@/assets/icons/star_active.png';
  import deleteIcon from '/@/assets/icons/delete.png';
  import downloadIcon from '/@/assets/icons/download.png';
  import subtractIcon from '/@/assets/icons/subtract.png';
  import searchIcon from '/@/assets/icons/search.svg';

  export default defineComponent({
    name: 'Painting',
    setup() {
      const instance = getCurrentInstance();
      const _this = instance?.appContext.config.globalProperties;

      const params = reactive({
        keyword: '',
      });

      const tab = ref('collection');
      const collection = ref<any>([
        { images: [
          { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
          { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: true },
          { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
          { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
          { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
          { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
        ], keyword: 'test' },
        { images: [
          { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
          { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
          { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: true },
          { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
          { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
          { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
        ], keyword: 'test' },
        { images: [
          { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: true },
          { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
          { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
          { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
          { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
          { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
        ], keyword: 'test' },
      ]);
      const collect = ref(<any>[
        { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', keyword: "test" },
        { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', keyword: "test" },
        { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E9%AB%98.png', keyword: "test" },
        { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/2048.png', keyword: "test" },
        { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%20%E4%BD%8E.png', keyword: "test" },
        { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%E9%AB%98.png', keyword: "test" },
        { id: 7, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E4%BD%8E.png', keyword: "test" },
        { id: 8, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E9%AB%98.png', keyword: "test" },
        { id: 9, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E4%BD%8E.png', keyword: "test" },
        { id: 10, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', keyword: "test" },
        { id: 11, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', keyword: "test" },
        { id: 12, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', keyword: "test" },
        { id: 13, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E9%AB%98.png', keyword: "test" },
        { id: 14, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/2048.png', keyword: "test" },
        { id: 15, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%20%E4%BD%8E.png', keyword: "test" },
        { id: 16, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%E9%AB%98.png', keyword: "test" },
        { id: 17, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E4%BD%8E.png', keyword: "test" },
        { id: 18, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E9%AB%98.png', keyword: "test" },
        { id: 19, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E4%BD%8E.png', keyword: "test" },
        { id: 20, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', keyword: "test" },
      ]);

      const changeTab = (t) => {
        tab.value = t;
        if (t == 'collect') {
          nextTick(() => {
            _this?.$redrawVueMasonry();
          });
        }
      };
      
      return {
        params,
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

        .setting-text {
          margin: 0px 12px;
        }

        .settingIcon,
        .arraowIcon {
          width: 24px;
          height: 24px;
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
          padding: 0px 24px;
        }

        .icon {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
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
          .group-item {
            display: flex;
            flex-wrap: wrap;
            gap: 24px;
            .group-item-content {
              border-radius: 8px;
              overflow: hidden;
              position: relative;

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
            }

            .group-item-content:hover .hover {
              display: flex;
            }
          }

          .group-keyword {
            margin-top: 10px;
            height: 36px;
            border-bottom: 1px solid #4D4D4D;
            .group-keyword-label {
              color: rgba(255, 255, 255, 0.5);
            }
            .group-keyword-text {
              color: rgba(255, 255, 255, 0.9);
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
</style>
