<template>
  <div class="painting">
    <div class="top">
      <div style="width: 100%; position: relative">
        <div style="display: flex">
          <div class="setting"><img class="settingIcon" :src="settingIcon" alt="" /><span class="setting-text">参数设置</span><img class="arrowIcon" :src="arrowIcon" /></div>
          <div class="keyword"><input v-model="settingParams.keyword" /><img class="icon" :src="randomIcon" /></div>
          <button class="submit">立即生成<span class="point">2点</span></button>
        </div>
        <div class="setting-content">
          <div class="setting-title">
            <div class="divider-left"></div>
            <div>风格选择</div>
            <div class="setting-style-groups">
              <div v-for="item in style" :key="item.id" class="setting-style-tab" :class="{ active: item.active }" @click="changeStyleTab(item)">{{ item.text }}</div>
            </div>
          </div>
          <div class="setting-style-content">
            <div v-for="item1 in style.find((item) => item.active).list" :key="item1.id" class="setting-style-item" :class="{ active: item1.active }" @click="changeStyleItem(item1)">
              <img class="setting-style-item-img" :src="item1.img" alt="" />
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
                <div v-for="item in quantity" :key="item.quantity" class="setting-quantity-item" :class="{ active: item.active }" @click="changeQuantity(item)">
                  {{ item.quantity }}张 <div class="point">{{ item.point }}点</div>
                </div>
              </div>
            </div>
          </div>
          <div class="divider-top"></div>
          <div class="setting-params">
            <div class="params-item">
              <div class="setting-title">反向描述</div>
              <div class="form-textarea">
                <textarea rows="10"></textarea>
                <img class="icon" :src="randomIcon" alt="" />
              </div>
            </div>
            <div class="params-item">
              <div class="setting-title">参考图</div>
              <div class="params-image" v-show="false">
                <div class="params-image-upload">
                  <img :src="plusIcon" alt="" />
                  <div>上传图片</div>
                </div>
                <div class="params-image-view">
                  <img class="view" src="" alt="" />
                  <div class="del-btn">
                    <img class="del-icon" :src="deleteIcon" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="params-item">
              <div class="setting-title">种子数量</div>
              <div class="form-input-icon">
                <input class="form-input" v-model="settingParams.seed" />
                <img src="" alt="" />
              </div>
            </div>
            <div class="params-item">
              <div class="setting-title">提示重量</div>
              <div><Slider class="slider" :min="0" :max="100" /><div class="slider-view">0%</div></div>
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
        <div class="search"><input placeholder="请输入搜索关键词" /><img class="icon" :src="searchIcon" /></div>
      </div>
      <div class="images">
        <div v-show="tab == 'collection'" class="collection">
          <div v-for="group in collection" :key="group" class="group">
            <div class="group-item">
              <div v-for="image in group.images" :key="image" class="group-item-content">
                <img class="group-item-image" :src="image.url" alt="" />
                <div class="hover">
                  <div>
                    <span class="icon-wrap"><img :src="deleteIcon" /></span>
                  </div>
                  <div>
                    <span class="icon-wrap"><img v-show="image.collected" :src="starIcon_active" /><img v-show="!image.collected" :src="starIcon_white" /></span><span class="icon-wrap" style="margin-left: 8px"><img :src="downloadIcon" /></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="group-keyword">
              <span class="group-keyword-label">画面描述：</span><span class="group-keyword-text">{{ group.keyword }}</span>
            </div>
          </div>
        </div>
        <div v-show="tab == 'collect'" class="collect">
          <div v-masonry fit-width="false" transition-duration="0.3s" item-selector=".collect-item" origin-left="false">
            <div v-masonry-tile v-for="image in collect" :key="image.id" class="collect-item">
              <img class="collect-item-image" :src="image.url" alt="" />
              <div class="hover">
                <div>
                  <span class="icon-wrap"><img :src="subtractIcon" /></span><span class="icon-wrap" style="margin-left: 8px"><img :src="downloadIcon" /></span>
                </div>
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
  import { Slider } from 'ant-design-vue';
  import settingIcon from '/@/assets/icons/setting.svg';
  import arrowIcon from '/@/assets/icons/arrow-down.svg';
  import collectionIcon_black from '/@/assets/icons/collection_black.png';
  import collectionIcon_white from '/@/assets/icons/collection_white.png';
  import starIcon_white from '/@/assets/icons/star_white.png';
  import starIcon_black from '/@/assets/icons/star_black.png';
  import starIcon_active from '/@/assets/icons/star_active.png';
  import deleteIcon from '/@/assets/icons/delete.png';
  import downloadIcon from '/@/assets/icons/download.png';
  import subtractIcon from '/@/assets/icons/subtract.png';
  import searchIcon from '/@/assets/icons/search.svg';
  import erciyuan from '/@/assets/images/aiPainting-style-riman-erciyuan.png';
  import xinhaicheng from '/@/assets/images/aiPainting-style-riman-xinhaicheng.png';
  import rimanjingdian from '/@/assets/images/aiPainting-style-riman-rimanjingdian.png';
  import gongqijun from '/@/assets/images/aiPainting-style-riman-gongqijun.png';
  import chaoxianshi from '/@/assets/images/aiPainting-style-xiaoxiang-chaoxianshi.png';
  import pikesi from '/@/assets/images/aiPainting-style-xiaoxiang-pikesi.png';
  import fengkuangdongwucheng from '/@/assets/images/aiPainting-style-xiaoxiang-fengkuangdongwucheng.png';
  import renwu from '/@/assets/images/aiPainting-style-xiaoxiang-renwu.png';
  import sanDdongwu from '/@/assets/images/aiPainting-style-xiaoxiang-3Ddongwu.png';
  import saibopengke from '/@/assets/images/aiPainting-style-xiaoxiang-saibopengke.png';
  import shenhuajuese from '/@/assets/images/aiPainting-style-yishu-shenhuajuese.png';
  import saibopengkedongman from '/@/assets/images/aiPainting-style-yishu-saibopengkedongman.png';
  import kongjianquanxiyishu from '/@/assets/images/aiPainting-style-yishu-kongjianquanxiyishu.png';
  import xiangsuyishu from '/@/assets/images/aiPainting-style-yishu-xiangsuyishu.png';
  import fuzhuang from '/@/assets/images/aiPainting-style-shijing-fuzhuang.png';
  import xiezi from '/@/assets/images/aiPainting-style-shijing-xiezi.png';
  import bao from '/@/assets/images/aiPainting-style-shijing-bao.png';
  import jianzhu from '/@/assets/images/aiPainting-style-shijing-jianzhu.png';
  import manhuafeng from '/@/assets/images/aiPainting-style-chatu-manhuafeng.png';
  import tiezhihua from '/@/assets/images/aiPainting-style-chatu-tiezhihua.png';
  import shiliangtubiao from '/@/assets/images/aiPainting-style-chatu-shiliangtubiao.png';
  import kalacimoxing from '/@/assets/images/aiPainting-style-chatu-kalacimoxing.png';
  import wenshen from '/@/assets/images/aiPainting-style-chatu-wenshen.png';
  import xiangsufengjing from '/@/assets/images/aiPainting-style-sheji-xiangsufengjing.png';
  import dijuxuanran from '/@/assets/images/aiPainting-style-sheji-dijuxuanran.png';
  import IPjuese from '/@/assets/images/aiPainting-style-sheji-IPjuese.png';
  import randomIcon from '/@/assets/icons/random.png';
  import plusIcon from '/@/assets/icons/plus.png';

  export default defineComponent({
    name: 'Painting',
    components: { Slider },
    setup() {
      const instance = getCurrentInstance();
      const _this = instance?.appContext.config.globalProperties;

      const settingParams = reactive<any>({
        keyword: '',
        referenceImage: '',
      });

      const tab = ref('collection');
      const collection = ref<any>([
        {
          images: [
            { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
            { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: true },
            { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
            { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
            { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
            { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', collected: false },
          ],
          keyword: 'test',
        },
        {
          images: [
            { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
            { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
            { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: true },
            { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
            { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
            { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', collected: false },
          ],
          keyword: 'test',
        },
        {
          images: [
            { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: true },
            { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
            { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
            { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
            { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
            { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', collected: false },
          ],
          keyword: 'test',
        },
      ]);
      const collect = ref<any>([
        { id: 1, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', keyword: 'test' },
        { id: 2, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', keyword: 'test' },
        { id: 3, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E9%AB%98.png', keyword: 'test' },
        { id: 4, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/2048.png', keyword: 'test' },
        { id: 5, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%20%E4%BD%8E.png', keyword: 'test' },
        { id: 6, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%E9%AB%98.png', keyword: 'test' },
        { id: 7, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E4%BD%8E.png', keyword: 'test' },
        { id: 8, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E9%AB%98.png', keyword: 'test' },
        { id: 9, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E4%BD%8E.png', keyword: 'test' },
        { id: 10, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', keyword: 'test' },
        { id: 11, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/1024.png', keyword: 'test' },
        { id: 12, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E4%BD%8E.png', keyword: 'test' },
        { id: 13, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/16_9%20%E9%AB%98.png', keyword: 'test' },
        { id: 14, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/2048.png', keyword: 'test' },
        { id: 15, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%20%E4%BD%8E.png', keyword: 'test' },
        { id: 16, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/3_4%E9%AB%98.png', keyword: 'test' },
        { id: 17, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E4%BD%8E.png', keyword: 'test' },
        { id: 18, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/4_3%20%E9%AB%98.png', keyword: 'test' },
        { id: 19, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E4%BD%8E.png', keyword: 'test' },
        { id: 20, url: 'https://jyzn-test.oss-cn-shanghai.aliyuncs.com/test/9_16%20%E9%AB%98.png', keyword: 'test' },
      ]);

      const changeTab = (t) => {
        tab.value = t;
        if (t == 'collect') {
          nextTick(() => {
            _this?.$redrawVueMasonry();
          });
        }
      };

      const style = reactive<any>([
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '日漫', active: true, list: [{ id: 0, img: erciyuan, label: '二次元', active: true }, { id: 1, img: xinhaicheng, label: '新海诚' }, { id: 2, img: rimanjingdian, label: '日漫经典' }, { id: 3, img: gongqijun, label: '宫崎骏' }] },
        // eslint-disable-next-line prettier/prettier
        { id: 2, text: '肖像', list: [{ id: 0, img: chaoxianshi, label: '超现实' }, { id: 1, img: pikesi, label: '皮克斯' }, { id: 2, img: fengkuangdongwucheng, label: '疯狂动物城' }, { id: 3, img: renwu, label: '人物' }, { id: 3, img: sanDdongwu, label: '3D动物' }, { id: 3, img: saibopengke, label: '赛博朋克' }] },
        // eslint-disable-next-line prettier/prettier
        { id: 3, text: '艺术', list: [{ id: 0, img: shenhuajuese, label: '神话角色' }, { id: 1, img: saibopengkedongman, label: '赛博朋克动漫' }, { id: 2, img: kongjianquanxiyishu, label: '空间全息艺术' }, { id: 3, img: xiangsuyishu, label: '像素艺术' }] },
        // eslint-disable-next-line prettier/prettier
        { id: 4, text: '实景', list: [{ id: 0, img: fuzhuang, label: '服装' }, { id: 1, img: xiezi, label: '鞋子' }, { id: 2, img: bao, label: '包' }, { id: 3, img: jianzhu, label: '建筑' }] },
        // eslint-disable-next-line prettier/prettier
        { id: 5, text: '插图', list: [{ id: 0, img: manhuafeng, label: '漫画风' }, { id: 1, img: tiezhihua, label: '贴纸画' }, { id: 2, img: shiliangtubiao, label: '矢量图标' }, { id: 3, img: kalacimoxing, label: '卡拉此模型' }, { id: 3, img: wenshen, label: '纹身' }] },
        // eslint-disable-next-line prettier/prettier
        { id: 6, text: '设计', list: [{ id: 0, img: xiangsufengjing, label: '像素风景' }, { id: 0, img: dijuxuanran, label: '低聚渲染' }, { id: 0, img: IPjuese, label: 'IP角色' }] },
      ]);

      const changeStyleTab = (item) => {
        const activeTab = style.find((item1) => item1.active);
        activeTab.active = false;
        activeTab.list.find((item2) => item2.active).active = false;
        item.active = true;
        item.list[0].active = true;
      };

      const changeStyleItem = (item) => {
        style.find((item1) => item1.active).list.find((item2) => item2.active).active = false;
        item.active = true;
      };

      const proportion = reactive<any>([
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '1:1', active: true, list: [{ id: 0, resolution: '1024*1024', point: 0, active: true }, { id: 1, resolution: '2048*2048', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '3:4', list: [{ id: 0, resolution: '900*1200', point: 0 }, { id: 1, resolution: '1800*2400', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '4:3', list: [{ id: 0, resolution: '1200*900', point: 0 }, { id: 1, resolution: '2400*1800', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '9:16', list: [{ id: 0, resolution: '720*1280', point: 0 }, { id: 1, resolution: '1152*2048', point: 2 }] },
        // eslint-disable-next-line prettier/prettier
        { id: 0, text: '16:9', list: [{ id: 0, resolution: '1280*720', point: 0 }, { id: 1, resolution: '2048*1152', point: 2 }] },
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

      const changeQuantity = (item0) => {
        quantity.find((item1) => item1.active).active = false;
        item0.active = true;
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
        proportion,
        quantity,
        erciyuan,
        xinhaicheng,
        rimanjingdian,
        gongqijun,
        chaoxianshi,
        pikesi,
        fengkuangdongwucheng,
        renwu,
        sanDdongwu,
        saibopengke,
        shenhuajuese,
        saibopengkedongman,
        kongjianquanxiyishu,
        xiangsuyishu,
        fuzhuang,
        xiezi,
        bao,
        jianzhu,
        manhuafeng,
        tiezhihua,
        shiliangtubiao,
        kalacimoxing,
        wenshen,
        xiangsufengjing,
        dijuxuanran,
        IPjuese,
        changeProportion,
        changeResolution,
        changeQuantity,
        plusIcon,
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
            border-radius: 8px;
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
            height: 120px;

            textarea {
              background: rgba(255, 255, 255, 0.16);
              padding: 16px;
              color: rgba(255, 255, 255, 0.9);
              font-size: 14px;
              resize: none;
              height: 100%;
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

            .params-image-upload {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0px;
              left: 0px;
              background: rgba(255, 255, 255, 0.16);
              text-align: center;

              img {
                display: inline-block;
              }
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
            border-bottom: 1px solid #4d4d4d;
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
