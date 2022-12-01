<template>
  <div class="content">
    <div class="top-background">
      <div class="top">
        <div class="title">
          <div class="title-text">关键词生成画作</div>
          <router-link to="/product/keywordPainting/collection">
            <div class="title-collection">
              <img :src="productKeywordpaintingCollection" alt="" style="margin-right: 12px" />
              <span>创意集合</span>
            </div>
          </router-link>
        </div>
        <div class="keyword">
          <Input v-model:value="keyword" class="keyword-input" placeholder="请在此输入一句 “ 英文 ”" :showCount="true" :maxlength="150" />
          <div class="keyword-example">
            <span class="keyword-example-text">示例：Little fairy town ，Gas station on Mars ，Post apocalyptic wonderland</span>
            <span class="keyword-example-ramdom" @click="random">随机生成</span>
          </div>
        </div>
        <div class="direction" style="padding: 0px 36px">
          <div class="direction-title">方向选择</div>
          <div class="direction-list">
            <div class="direction-item" :class="{ 'direction-item-active': keywordPaintingFormData.direction == 'a' }" @click="handleDirection('a')" style="background-image: url('/src/assets/images/product_keywordpainting_direction1.png')">
              <div class="direction-item-title">创意氛围感</div>
            </div>
            <div class="direction-item" :class="{ 'direction-item-active': keywordPaintingFormData.direction == 'b' }" @click="handleDirection('b')" style="background-image: url('/src/assets/images/product_keywordpainting_direction2.png')">
              <div class="direction-item-title">实体化</div>
            </div>
            <div class="direction-item" :class="{ 'direction-item-active': keywordPaintingFormData.direction == 'c' }" @click="handleDirection('c')" style="background-image: url('/src/assets/images/product_keywordpainting_direction3.png')">
              <div class="direction-item-title">随机</div>
            </div>
          </div>
        </div>
        <div class="style" style="padding: 0px 36px">
          <div class="style-title">
            <span>风格选择</span>
            <span style="font-size: 12px; margin-left: 8px; color: rgba(255, 255, 255, 0.8)">多选</span>
          </div>
          <div class="style-list">
            <div v-for="item in styleList" :key="item.value" class="style-item" :class="{ 'style-item-active': keywordPaintingFormData.style.indexOf(item.value) != -1 }" @click="handleStyle(item.value)">{{ item.label }}</div>
          </div>
        </div>
        <div class="size" style="padding: 0px 36px">
          <div class="size-title">风格选择</div>
          <div class="size-list">
            <div class="size-item" :class="{ 'size-item-active': keywordPaintingFormData.size.indexOf('768*1366') != -1 }" @click="handleSize('768*1366')">768*1366</div>
            <div class="size-item" :class="{ 'size-item-active': keywordPaintingFormData.size.indexOf('1366*768') != -1 }" @click="handleSize('1366*768')">1366*768</div>
            <div class="size-item" :class="{ 'size-item-active': keywordPaintingFormData.size.indexOf('1024*1024') != -1 }" @click="handleSize('1024*1024')">1024*1024</div>
          </div>
        </div>
        <div class="btn-generate-wrap">
          <Button class="btn-generate">
            <span>立即生成画作</span>
            <img :src="tryIcon" alt="" style="margin-left: 20px" />
          </Button>
        </div>
      </div>
    </div>
    <div class="history">
      <div v-for="item in history" :key="item.id" class="history-item">
        <div class="history-image">
          <img class="history-image-content" :src="item.image" alt="" />
        </div>
        <div class="history-info">
          <div class="history-info-details">
            <div class="history-info-delete"><img :src="deleteIcon" alt="delete" /></div>
            <div class="history-info-keyword">
              <div class="history-info-keyword-dot"></div>
              <div class="history-info-keyword-text">{{ item.keyword }}</div>
            </div>
            <div class="history-info-size">{{ item.size }}</div>
          </div>
          <div class="history-info-download">
            <div>
              <Button class="btn-download"><img :src="downloadIcon" alt="" />下载</Button>
            </div>
            <div class="download-point">下载消耗点数：3点</div>
            <div class="download-line3">
              <span class="remaining-point">剩余：{{ 457 }}点</span><span class="gotorecharge">去充值</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue';
  import { Button, Input } from 'ant-design-vue';
  import productKeywordpaintingCollection from '/@/assets/images/product_keywordpainting_collection.png';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import deleteIcon from '/@/assets/svg/delete.svg';
  import downloadIcon from '/@/assets/svg/download.svg';

  export default defineComponent({
    name: 'UniversalCutout',
    components: { Button, Input },
    setup() {
      const keyword = ref('');
      const remainingPoint = ref(457);

      const history = reactive([
        { id: 1, keyword: 'beautiful flower field', size: '1024*1024', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example1.png' },
        { id: 2, keyword: 'Little fairy town', size: '1024*1024', image: 'https://1204-1251109575.cos.ap-guangzhou.myqcloud.com/example2.png' },
        { id: 3, keyword: 'Little fairy town', size: '1024*1024', image: '', progress: 50 },
      ]);

      const keywordPaintingFormData = reactive({
        direction: 'a',
        style: ['a', 'c'],
        size: '768*1366',
      });

      const handleDirection = (direction) => {
        keywordPaintingFormData.direction = direction;
      };

      const handleStyle = (style) => {
        const index = keywordPaintingFormData.style.indexOf(style);
        console.log(index);
        if (index == -1) {
          keywordPaintingFormData.style.push(style);
        } else {
          keywordPaintingFormData.style.splice(index, 1);
        }
      };

      const handleSize = (size) => {
        keywordPaintingFormData.size = size;
      };

      const styleList = [
        { label: '随机', value: 'a' },
        { label: '莫奈', value: 'b' },
        { label: '卡米尔', value: 'c' },
        { label: '米开朗基罗', value: 'd' },
        { label: '波提切利', value: 'e' },
        { label: '德加', value: 'f' },
        { label: '蒙克', value: 'g' },
        { label: '毕加索 ', value: 'h' },
        { label: '现代艺术', value: 'i' },
        { label: '超现实主义艺术', value: 'j' },
        { label: '波普艺术', value: 'k' },
        { label: '印象派', value: 'l' },
        { label: '野兽派', value: 'm' },
        { label: '未来主义', value: 'n' },
        { label: '油画', value: 'o' },
        { label: '水彩画', value: 'p' },
        { label: '奇异的色彩', value: 'q' },
      ];

      const randomKeyword = [
        '我本将心向明月，怎奈明月照沟渠',
        '人生若只如初见',
        '空床卧听南窗雨,谁复挑灯夜补衣 ',
        '昨夜雨疏风骤，浓睡不消残酒。',
        '霍格沃茨魔法城堡',
        '生于尘埃，溺于人海，死于理想高台。',
        '仲夏夜的荒原',
        '油菜花不曾铺满大地',
        '寂寞开始蠢蠢欲动，吞噬我的灵魂',
        '花开如火 ',
        '心有惊雷，生似静湖',
        '海棠未雨，梨花先雪',
        '松花酿酒，春水煎茶',
      ];

      const random = () => {
        const r = Math.floor(Math.random() * randomKeyword.length);
        keyword.value = randomKeyword[r];
      };

      return {
        keyword,
        productKeywordpaintingCollection,
        keywordPaintingFormData,
        handleDirection,
        styleList,
        handleStyle,
        handleSize,
        tryIcon,
        deleteIcon,
        downloadIcon,
        history,
        remainingPoint,
        random,
      };
    },
  });
</script>
<style lang="less" scoped>
  .content {
    .top-background {
      background-image: url('/@/assets/images/product_keywordpainting_background.png');
      background-repeat: round;
    }
    .top {
      width: 1200px;
      margin: 0px auto;
      padding: 100px 0px 120px 0px;
    }

    .title {
      position: relative;
      .title-text {
        font-family: 'OPPOSans';
        font-style: normal;
        font-weight: 400;
        font-size: 60px;
        text-align: center;
        color: white;
      }

      .title-collection {
        position: absolute;
        width: 138px;
        height: 48px;
        right: 0px;
        top: calc(50% - 24px);
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        cursor: pointer;
      }

      .title-collection:hover {
        background: rgba(255, 255, 255, 0.4);
      }
    }

    .keyword {
      margin-top: 60px;
      .keyword-input {
        height: 72px;
        border-radius: 36px;
        font-size: 24px;
        padding: 0px 30px;
        background-color: unset;
        border-color: #d9d9d9;
      }

      :deep(.keyword-input .ant-input) {
        background-color: unset;
      }

      :deep(.keyword-input .ant-input) {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        color: white;
      }

      :deep(.keyword-input .ant-input::placeholder) {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        color: white;
      }

      :deep(.keyword-input .ant-input-show-count-suffix) {
        color: rgba(255, 255, 255, 0.5);
      }

      :deep(.keyword-input.ant-input-affix-wrapper:focus) {
        border-color: #d9d9d9;
        box-shadow: none;
      }

      :deep(.keyword-input .ant-input-affix-wrapper-focused) {
        border-color: #d9d9d9;
        box-shadow: none;
      }

      :deep(.keyword-input.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover) {
        border: 1px solid #d9d9d9;
      }

      :deep(.keyword-input.ant-input-affix-wrapper:hover) {
        border: 1px solid #d9d9d9;
      }

      .keyword-example {
        display: flex;
        padding: 0px 36px;
        margin-top: 12px;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;

        .keyword-example-ramdom {
          cursor: pointer;
        }
      }
    }

    .direction {
      color: white;
      margin-top: 48px;

      .direction-title {
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
      }

      .direction-list {
        display: flex;
        margin: 12px -16px 0px -16px;

        .direction-item {
          margin: 0px 14px;
          width: 264px;
          height: 120px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          cursor: pointer;

          .direction-item-title {
            background-color: rgba(0, 0, 0, 0.6);
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 16px;
          }
        }

        .direction-item-active {
          border: 2px solid white;
        }
      }
    }

    .style {
      margin-top: 48px;

      .style-title {
        font-size: 20px;
        color: white;
      }

      .style-list {
        display: flex;
        margin: 4px -48px -12px -12px;
        flex-wrap: wrap;

        .style-item {
          margin: 12px;
          width: 108px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: rgba(99, 98, 73, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
        }

        .style-item-active {
          color: rgba(0, 0, 0, 0.8);
          background-color: white;
        }
      }
    }

    .size {
      margin-top: 48px;
      .size-title {
        font-size: 20px;
        color: white;
      }

      .size-list {
        display: flex;
        margin: 4px -12px -12px -12px;
        flex-wrap: wrap;
        .size-item {
          margin: 12px;
          width: 108px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          background: rgba(99, 98, 73, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
        }

        .size-item-active {
          color: rgba(0, 0, 0, 0.8);
          background-color: white;
        }
      }
    }

    .btn-generate-wrap {
      margin-top: 60px;
      text-align: center;

      .btn-generate {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 238px;
        height: 72px;
        border-radius: 70px;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.8);
        border: none;

        // background: linear-gradient(210deg, #32e2e2 0%, #0094ff 7.29%, #0094ff 13.02%, #ee43be 22.4%, #ff6543 30.21%, #a32fff 38.02%, #00dddd 44.27%, #1b5bff 52.6%, #0094ff 59.9%, #ee43be 70.31%, #ff6543 78.65%, #0094ff 85.94%, #00dddd 92.71%, #1b5bff 100%) !important
        background: linear-gradient(135deg, #e6eeee, #e5e9ae, #f2f3f0, #f7d885, #e6eeee) !important;
      }

      :deep(.btn-generate.ant-btn:hover) {
        text-decoration: none;
        background: unset;
        color: rgba(0, 0, 0, 0.8);
        border: none;
      }
      :deep(.btn-generate.ant-btn:focus) {
        text-decoration: none;
        background: unset;
        color: rgba(0, 0, 0, 0.8);
        border: none;
      }
      :deep(.btn-generate.ant-btn:active) {
        text-decoration: none;
        background: unset;
        color: rgba(0, 0, 0, 0.8);
        border: none;
      }
    }

    .history {
      width: 1200px;
      margin: 60px auto;

      .history-item {
        display: flex;
        background: white;
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        padding: 24px;
        margin: 60px 0px;

        .history-image {
          width: 752px;
          height: 752px;
          background: #e9e9e9;
          display: flex;
          align-items: center;
          justify-content: center;

          .history-image-content {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        .history-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .history-info-delete {
            text-align: right;
            img {
              display: inline-block;
              cursor: pointer;
            }
          }

          .history-info-keyword {
            margin-top: 62px;
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: flex-end;

            .history-info-keyword-dot {
              width: 6px;
              height: 6px;
              background-color: #0035f0;
              border-radius: 6px;
            }

            .history-info-keyword-text {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 500;
              font-size: 20px;
              color: #000000;
              margin-left: 12px;
            }
          }

          .history-info-size {
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.6);
            margin-top: 12px;
            text-align: right;
          }

          .history-info-download {
            text-align: right;
            .btn-download {
              width: 136px;
              height: 60px;
              background: #0035f0;
              border-radius: 8px;
              text-align: center;
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              color: white;
              display: inline-flex;
              align-items: center;
              justify-content: space-between;
              padding: 0px 36px;

              img {
                display: inline-block;
              }
            }

            .download-point {
              margin-top: 24px;
              color: red;
            }

            .remaining-point {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              color: rgba(0, 0, 0, 0.6);
            }

            .download-line3 {
              margin-top: 8px;
            }

            .gotorecharge {
              font-family: 'PingFang SC';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              color: black;
              margin-left: 20px;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
