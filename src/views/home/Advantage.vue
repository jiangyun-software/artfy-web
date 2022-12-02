<template>
  <div class="advantage-wrap">
    <div class="advantage">
      <div class="title">我们的优势</div>
      <div class="content-list">
        <div class="content-item advantage1">
          <img class="content-image" :src="advantage1" alt="" />
          <div class="content-text">
            <div class="content-text-title">算法领先技术</div>
            <div class="content-text-desc">以海量图像和先进算法为支撑，技术达到国际先进水平！</div>
          </div>
        </div>
        <div class="content-item advantage2">
          <img class="content-image" :src="advantage2" alt="" />
          <div class="content-text">
            <div class="content-text-title">省时、省力、省钱</div>
            <div class="content-text-desc">有效降低大量人工成本，一键处理图片，批量下载</div>
          </div>
        </div>
        <div class="content-item advantage3">
          <img class="content-image" :src="advantage3" alt="" />
          <div class="content-text">
            <div class="content-text-title">简单易用</div>
            <div class="content-text-desc">一键操作，打包下载，无经验也可轻松使用</div>
          </div>
        </div>
        <div class="content-item advantage4">
          <img class="content-image" :src="advantage4" alt="" />
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
        font-size: 48px;
        color: black;
        text-align: center;
      }

      .content-list {
        display: flex;
        justify-content: space-between;
        margin-top: 94px;

        .content-item {
          width: 280px;
          height: 400px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);

          .content-image {
            width: 100%;
            height: 100%;
          }

          .content-text {
            position: absolute;
            padding: 24px;
            bottom: -60px;
            background-color: white;

            .content-text-title {
              font-size: 20px;
              font-weight: 600;
              color: black;
              text-align: center;
            }

            .content-text-desc {
              font-size: 14px;
              line-height: 20px;
              margin-top: 12px;
            }
          }
        }

        .content-item:hover .content-text {
          bottom: 0px;
          transition: 1s;
        }

        .advantage1:hover {
          .content-text {
            background-color: #4cdaf5;
            .content-text-title {
              color: black;
              text-align: left;
            }
            .content-text-desc {
              color: rgba(0, 0, 0, 0.7);
            }
          }
        }

        .advantage2:hover {
          .content-text {
            background-color: #ffcd1a;
            .content-text-title {
              color: black;
              text-align: left;
            }
            .content-text-desc {
              color: rgba(0, 0, 0, 0.7);
            }
          }
        }

        .advantage3:hover {
          .content-text {
            background-color: #0035f0;
            .content-text-title {
              color: white;
              text-align: left;
            }
            .content-text-desc {
              color: rgba(255, 255, 255, 0.7);
            }
          }
        }
        .advantage4:hover {
          .content-text {
            background-color: #d92d2d;
            .content-text-title {
              color: white;
              text-align: left;
            }
            .content-text-desc {
              color: rgba(255, 255, 255, 0.7);
            }
          }
        }

      }
    }
  }
</style>
