<template>
  <div class="scene-wrap">
    <div class="scene">
      <div class="title">场景应用</div>
      <div class="description">无需phtoshop即可完成图片设计，批量处理电商白底图，一键美化图片，艺术图像处理等超多应用满足您的一应需求。</div>
      <div class="tabs">
        <div class="tabs-item" :class="{ active: active == 1 }" @click="active = 1"><img :src="scene1" alt="" />智能P图</div>
        <div class="tabs-item" :class="{ active: active == 2 }" @click="active = 2"><img :src="scene2" alt="" />电子商务</div>
        <div class="tabs-item" :class="{ active: active == 3 }" @click="active = 3"><img :src="scene3" alt="" />图片转艺术</div>
        <div class="tabs-item" :class="{ active: active == 4 }" @click="active = 4"><img :src="scene4" alt="" />视频处理</div>
      </div>
      <div class="contents">
        <div class="contents-item" :class="{ active: active == 1 }">
          <img :src="sceneContent1" alt="" />
        </div>
        <div class="contents-item" :class="{ active: active == 2 }">
          <img :src="sceneContent2" alt="" />
        </div>
        <div class="contents-item" :class="{ active: active == 3 }">
          <img :src="sceneContent3" alt="" />
        </div>
        <div class="contents-item" :class="{ active: active == 4 }">
          <img :src="sceneContent4" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import scene1 from '/@/assets/images/home-scene1.png';
  import scene2 from '/@/assets/images/home-scene2.png';
  import scene3 from '/@/assets/images/home-scene3.png';
  import scene4 from '/@/assets/images/home-scene4.png';
  import sceneContent1 from '/@/assets/images/home-scene-content1.png';
  import sceneContent2 from '/@/assets/images/home-scene-content2.png';
  import sceneContent3 from '/@/assets/images/home-scene-content3.png';
  import sceneContent4 from '/@/assets/images/home-scene-content4.png';

  export default defineComponent({
    name: 'AllApplication',
    setup() {
      const active = ref(1);
      return {
        active,
        scene1,
        scene2,
        scene3,
        scene4,
        sceneContent1,
        sceneContent2,
        sceneContent3,
        sceneContent4,
      };
    },
  });
</script>
<style lang="less" scoped>
  .scene-wrap {
    padding: 100px 0px 120px 0px;
    background-color: white;
    .scene {
      width: 1200px;
      margin: 0px auto;
      .title {
        font-size: 48px;
        font-weight: 400;
        color: #000000;
      }
      .description {
        margin-top: 12px;
        font-weight: 400;
        font-size: 16px;
        color: rgba(0 0 0 / 70%);
      }

      .tabs {
        margin-top: 80px;
        display: flex;
        width: 700px;
        justify-content: space-between;

        .tabs-item {
          display: inline-flex;
          align-items: center;
          font-weight: 500;
          font-size: 20px;
          color: rgba(0 0 0 / 50%);
          cursor: pointer;

          img {
            margin-right: 12px;
            display: inline-block;
          }
        }

        .active {
          color: rgba(0 0 0 / 100%);
        }
      }

      .contents {
        .contents-item {
          display: none;
          img {
            margin-left: -36px;
          }
        }

        .active {
          display: block;
        }
      }
    }
  }
</style>
