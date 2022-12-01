<template>
  <div class="advantage-wrap">
    <div class="advantage">
      <div class="title">我们的优势</div>
      <div class="content-list">
        <div class="content-item">
          <img class="content-image" :src="advantage1" alt="" />
          <div class="content-text">
            <div class="content-text-title">算法领先技术</div>
            <div class="content-text-desc">以海量图像和先进算法为支撑，技术达到国际先进水平！</div>
          </div>
        </div>
        <div class="content-item">
          <img class="content-image" :src="advantage1" alt="" />
          <div class="content-text">
            <div class="content-text-title">省时、省力、省钱</div>
            <div class="content-text-desc">有效降低大量人工成本，一键处理图片，批量下载</div>
          </div>
        </div>
        <div class="content-item">
          <img class="content-image" :src="advantage1" alt="" />
          <div class="content-text">
            <div class="content-text-title">简单易用</div>
            <div class="content-text-desc">一键操作，打包下载，无经验也可轻松使用</div>
          </div>
        </div>
        <div class="content-item">
          <img class="content-image" :src="advantage1" alt="" />
          <div class="content-text">
            <div class="content-text-title">功能丰富且专业</div>
            <div class="content-text-desc">一键操作，打包下载，无经验也可轻松使用</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import advantage1 from '/@/assets/images/home-advantage1.png';
  import advantage2 from '/@/assets/images/home-advantage2.png';
  import advantage3 from '/@/assets/images/home-advantage3.png';
  import advantage4 from '/@/assets/images/home-advantage4.png';

  export default defineComponent({
    name: 'AllApplication',
    setup() {
      return {
        advantage1,
        advantage2,
        advantage3,
        advantage4,
      };
    },
  });
</script>
<style lang="less" scoped>
  .advantage-wrap {
    background-color: #f8f8f8;
    padding: 100px 0px;
    .advantage {
      width: 1200px;
      margin: 0px auto;

      .title {
      }

      .content-list {
        display: none;
      }
    }
  }
</style>
