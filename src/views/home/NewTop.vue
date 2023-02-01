<template>
  <div class="top">
    <div class="bg">
      <img :src="bgLine" alt="" />
    </div>
    <div class="top-content">
      <div class="content-title">
        <div class="content-title-top">
          <span style="font-weight: 900">赋能机器</span>
        </div>
        <div class="content-title-bottom"> <span style="font-weight: 600">驱动技术创新</span> <span style="font-weight: 600">设计创意</span> </div>
      </div>
      <div class="content-description">
        <div>开拓用人工智能赋能机器驱动技术创新和设计创意的历史先河</div>
        <div>研制元宇宙构建者 - 工程师机器人系统</div>
      </div>
    </div>
    <!--    <div class="scroll-items scroll-one" ref="box1">-->
    <!--      <div class="photo-box" @click="jump('/product/cutout/universalCutout')">-->
    <!--        <img :src="photo11" />-->
    <!--        <span>通用抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo12" />-->
    <!--        <span>物体抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo13" />-->
    <!--        <span>人像抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo14" />-->
    <!--        <span>无损放大</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo15" />-->
    <!--        <span>修复/去水印</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo11" />-->
    <!--        <span>通用抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo12" />-->
    <!--        <span>物体抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo13" />-->
    <!--        <span>人像抠图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo14" />-->
    <!--        <span>无损放大</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo15" />-->
    <!--        <span>修复/去水印</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="scroll-items scroll-two" ref="box2">-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo21" />-->
    <!--        <span>图生图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo22" />-->
    <!--        <span>智能上色</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo23" />-->
    <!--        <span>人像卡通化</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo24" />-->
    <!--        <span>梦想生成器</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo25" />-->
    <!--        <span>AI作画</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo21" />-->
    <!--        <span>图生图</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo22" />-->
    <!--        <span>智能上色</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo23" />-->
    <!--        <span>人像卡通化</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo24" />-->
    <!--        <span>梦想生成器</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo25" />-->
    <!--        <span>AI作画</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <div class="scroll-items scroll-three" ref="box3">-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo31" />-->
    <!--        <span>智能配乐</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo32" />-->
    <!--        <span>视频去字幕</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo33" />-->
    <!--        <span>视频翻译</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo34" />-->
    <!--        <span>视频去重</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo31" />-->
    <!--        <span>智能配乐</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo32" />-->
    <!--        <span>视频去字幕</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo33" />-->
    <!--        <span>视频翻译</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo34" />-->
    <!--        <span>视频去重</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo31" />-->
    <!--        <span>智能配乐</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo32" />-->
    <!--        <span>视频去字幕</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo33" />-->
    <!--        <span>视频翻译</span>-->
    <!--      </div>-->
    <!--      <div class="photo-box">-->
    <!--        <img :src="photo34" />-->
    <!--        <span>视频去重</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div v-for="(item, index) in list" :class="['scroll-items', `scroll-${className[index]}`]" :key="index" :ref="getBox">
      <div v-for="(item2, index) in item" class="photo-box" @click="jump(item2.url)" :key="index">
        <img :src="item2.img" />
        <span>{{ item2.title }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
  import bgLine from '/@/assets/images/background-line.png';
  import photo11 from '/@/assets/images/scroll-1-1.png';
  import photo12 from '/@/assets/images/scroll-1-2.png';
  import photo13 from '/@/assets/images/scroll-1-3.png';
  import photo14 from '/@/assets/images/scroll-1-4.png';
  import photo15 from '/@/assets/images/scroll-1-5.png';
  import photo21 from '/@/assets/images/scroll-2-1.png';
  import photo22 from '/@/assets/images/scroll-2-2.png';
  import photo23 from '/@/assets/images/scroll-2-3.png';
  import photo24 from '/@/assets/images/scroll-2-4.png';
  import photo25 from '/@/assets/images/scroll-2-5.png';
  import photo31 from '/@/assets/images/scroll-3-1.png';
  import photo32 from '/@/assets/images/scroll-3-2.png';
  import photo33 from '/@/assets/images/scroll-3-3.png';
  import photo34 from '/@/assets/images/scroll-3-4.png';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const boxes = ref<HTMLDivElement[]>([]); //存放滚动盒子数组
  let oBox = document.querySelector('body'); //获取监听滚动条
  const className = ['one', 'two', 'three']; //遍历类名
  const originTranslateXList: number[] = []; //盒子初始偏移位置
  const list = reactive([
    [
      { img: photo11, url: '/product/cutout/universalCutout', title: '通用抠图' },
      { img: photo12, url: '/product/cutout/commodityCutout', title: '物体抠图' },
      { img: photo13, url: '/product/cutout/portraitCutout', title: '人像抠图' },
      { img: photo14, url: '/product/imageProcessing/superResolution', title: '无损放大' },
      { img: photo15, url: '/product/imageProcessing/repairEdit', title: '修复/去水印' },
      { img: photo11, url: '/product/cutout/universalCutout', title: '通用抠图' },
      { img: photo12, url: '/product/cutout/commodityCutout', title: '物体抠图' },
      { img: photo13, url: '/product/cutout/portraitCutout', title: '人像抠图' },
      { img: photo14, url: '/product/imageProcessing/superResolution', title: '无损放大' },
      { img: photo15, url: '/product/imageProcessing/repairEdit', title: '修复/去水印' },
    ],
    [
      { img: photo21, url: '/aiPainting/img2img/collection', title: '图生图' },
      { img: photo22, url: '/product/imageProcessing/colorize', title: '照片上色' },
      { img: photo23, url: '/product/artGeneration/anime', title: '人像卡通化' },
      { img: photo24, url: '/', title: '梦想生成器' },
      { img: photo25, url: '/aiPainting/painting', title: 'AI作画' },
      { img: photo21, url: '/aiPainting/img2img/collection', title: '图生图' },
      { img: photo22, url: '/product/imageProcessing/colorize', title: '照片上色' },
      { img: photo23, url: '/product/artGeneration/anime', title: '人像卡通化' },
      { img: photo24, url: '/', title: '梦想生成器' },
      { img: photo25, url: '/aiPainting/painting', title: 'AI作画' },
    ],
    [
      { img: photo31, url: '/', title: '智能配乐' },
      { img: photo32, url: '/', title: '视频去字幕' },
      { img: photo33, url: '/', title: '视频翻译' },
      { img: photo34, url: '/', title: '视频去重' },
      { img: photo31, url: '/', title: '智能配乐' },
      { img: photo32, url: '/', title: '视频去字幕' },
      { img: photo33, url: '/', title: '视频翻译' },
      { img: photo34, url: '/', title: '视频去重' },
    ],
  ]);
  /**计算初始偏移距离*/
  const getTranslateX = (el: HTMLDivElement): number => {
    let x = getComputedStyle(el, null)['transform'];
    let num = parseFloat(x.replace(/[^0-9\-.,]/g, '').split(',')[4]);
    return num;
  };
  /**获取滚动元素*/
  const getBox = (el) => {
    if (el) {
      boxes.value.push(el as HTMLDivElement);
    }
  };
  /**进行滚动方法*/
  const move = () => {
    boxes.value.forEach((value, index) => {
      if (index % 2 === 0) {
        value.style.transform = `translate(${originTranslateXList[index] - oBox!.scrollTop / 4}px, 0)`;
      } else {
        value.style.transform = `translate(${originTranslateXList[index] + oBox!.scrollTop / 4}px, 0)`;
      }
    });
  };
  /**路由跳转*/
  const jump = (url) => {
    router.push(url);
  };
  onMounted(() => {
    boxes.value.forEach((e) => {
      let num = getTranslateX(e);
      originTranslateXList.push(num);
    });
    // box1X = getTranslateX(box1.value as HTMLDivElement);
    // box2X = getTranslateX(box2.value as HTMLDivElement);
    // box3X = getTranslateX(box3.value as HTMLDivElement);
    oBox?.addEventListener('scroll', move);
  });
  onBeforeUnmount(() => {
    oBox?.removeEventListener('scroll', move);
  });
</script>

<style scoped lang="less">
  .top {
    position: relative;
    text-align: center;
    padding-bottom: 100px;
    .bg {
      position: absolute;
      right: 30%;
    }
    .top-content {
      width: 100%;
      height: 473px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .content-title {
      width: 747px;
      height: 208px;
      background: url('/@/assets/images/title-bg.png');
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .content-title-top {
        span {
          //font-family: 'OPPOSans';
          font-style: normal;
          font-weight: 400;
          font-size: 100px;
          line-height: 110px;
          display: flex;
          margin-left: 132px;
        }
      }
      .content-title-bottom {
        display: flex;
        justify-content: space-between;
        span {
          //font-family: 'OPPOSans';
          font-style: normal;
          font-weight: 400;
          font-size: 60px;
          line-height: 79px;
        }
      }
    }
    .content-description {
      margin-top: 48px;
      width: 747px;
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 14px;
      div {
        color: #4c4c4c;
        &:last-child {
          margin-top: 8px;
        }
      }
    }
    .scroll-items {
      width: 100%;
      display: flex;
    }

    .photo-box {
      min-width: 304px;
      height: 210px;
      border-radius: 16px;
      box-shadow: 0px 7px 50px rgba(0, 0, 0, 0.06);
      margin: 18px;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      box-sizing: border-box;
      cursor: pointer;
      img {
        //width: 100%;
        min-width: 280px;
        height: 186px;
        border-radius: 8px;
      }

      span {
        position: absolute;
        //line-height: 38px;
        right: 0;
        bottom: 0;
        background: #ffffff;
        padding: 10px 16px;
        border-radius: 16px 0px 0px 0px;
        text-align: center;
        font-family: 'OPPOSans';
        font-style: normal;
        font-size: 14px;
        font-weight: 900;
        //transform: translate(10px, 10px);
      }
      &:hover {
        color: #0035f0;
        border: 1px solid #0035f0;
      }
    }

    .scroll-one {
      transform: translate(18px, 0);
    }

    .scroll-two {
      transform: translate(-1500px, 0);
    }

    .scroll-three {
      transform: translate(18px, 0);
    }
  }
</style>
