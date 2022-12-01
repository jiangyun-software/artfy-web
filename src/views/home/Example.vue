<template>
  <div style="background-color: white">
    <div class="example">
      <div class="left">
        <div class="items">
          <div class="item" :style="{ opacity: scroll1 ? 1 : 0 }">
            <div class="line1"><div class="text-color1 inline-text">一键抠图</div></div>
            <div class="line2"><div class="inline-text">去除背景</div></div>
            <div class="line3"><div class="description">基于强大的人工智能算法及成熟图像语义分割技术，自动识别需要保留的主体并去除背景，一键上传即可快速抠图！</div></div>
            <div class="line4">
              <div class="btn">
                <div class="btn-text">去试试</div>
                <img class="btn-icon" :src="gototry" alt="" />
              </div>
            </div>
          </div>
          <div class="item" :style="{ opacity: scroll2 ? 1 : 0 }">
            <div class="line1"><div class="text-color2 inline-text">AI视频</div></div>
            <div class="line2"><div class="inline-text">抠图处理</div></div>
            <div class="line3"><div class="description">解放双手，100%自动，根据人工智能算法自动识别并完成背景去除工作，并支持自定义更换背景颜色。</div></div>
            <div class="line4">
              <div class="btn">
                <div class="btn-text">去试试</div>
                <img class="btn-icon" :src="gototry" alt="" />
              </div>
            </div>
          </div>
          <div class="item" :style="{ opacity: scroll3 ? 1 : 0 }">
            <div class="line1"><div class="text-color3 inline-text">AI图像</div></div>
            <div class="line2"><div class="inline-text">修复/去水印</div></div>
            <div class="line3"><div class="description">遮雀斑，去瑕疵，删除照片中任何不想要的物体，水印，人物或文字。达到毫无痕迹的效果。</div></div>
            <div class="line4">
              <div class="btn">
                <div class="btn-text">去试试</div>
                <img class="btn-icon" :src="gototry" alt="" />
              </div>
            </div>
          </div>
          <div class="item" :style="{ opacity: scroll4 ? 1 : 0 }">
            <div class="line1"><div class="text-color4 inline-text">关键词生成</div></div>
            <div class="line2"><div class="inline-text">艺术画作</div></div>
            <div class="line3"><div class="description">输入一句简单的画作语言描述，人工智能算法会根据描述生成不同的创意画作，原创就是这么简单。</div></div>
            <div class="line4">
              <div class="btn">
                <div class="btn-text">去试试</div>
                <img class="btn-icon" :src="gototry" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right" @scroll="scroll">
        <div class="item"><img :src="example1" alt="" /></div>
        <div class="item"><img :src="example2" alt="" /></div>
        <div class="item"><img :src="example3" alt="" /></div>
        <div class="item"><img :src="example4" alt="" /></div>
      </div>
      <div class="dot">
        <div class="items">
          <div class="item" :class="{ active: scroll1 }"></div>
          <div class="item" :class="{ active: scroll2 }"></div>
          <div class="item" :class="{ active: scroll3 }"></div>
          <div class="item" :class="{ active: scroll4 }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import example1 from '/@/assets/images/home-example1.png';
  import example2 from '/@/assets/images/home-example2.png';
  import example3 from '/@/assets/images/home-example3.png';
  import example4 from '/@/assets/images/home-example4.png';
  import gototry from '/@/assets/images/gototry.png';

  export default defineComponent({
    name: 'Example',
    setup() {
      const scroll = function (e: Event) {
        console.log(e.target);
      };

      let scroll1 = ref(true);
      let scroll2 = ref(false);
      let scroll3 = ref(false);
      let scroll4 = ref(false);

      onMounted(() => {
        document.body.addEventListener('scroll', (e) => {
          if (!scroll1.value && e.target.scrollTop < 828 + ((window.innerHeight - 100) * 3) / 4) {
            scroll1.value = true;
            scroll2.value = scroll3.value = scroll4.value = false;
            console.log('scroll1', scroll1.value);
          } else if (
            !scroll2.value &&
            e.target.scrollTop >= 828 + ((window.innerHeight - 100) * 3) / 4 &&
            e.target.scrollTop < 828 + (window.innerHeight - 100) * 1 + ((window.innerHeight - 100) * 3) / 4
          ) {
            scroll2.value = true;
            scroll1.value = scroll3.value = scroll4.value = false;
            console.log('scroll2', scroll2.value);
          } else if (
            !scroll3.value &&
            e.target.scrollTop >= 828 + (window.innerHeight - 100) * 1 + ((window.innerHeight - 100) * 3) / 4 &&
            e.target.scrollTop < 828 + (window.innerHeight - 100) * 2 + ((window.innerHeight - 100) * 3) / 4
          ) {
            scroll3.value = true;
            scroll2.value = scroll1.value = scroll4.value = false;
            console.log('scroll3', scroll3.value);
          } else if (!scroll4.value && e.target.scrollTop >= 828 + (window.innerHeight - 100) * 2 + ((window.innerHeight - 100) * 3) / 4) {
            scroll4.value = true;
            scroll2.value = scroll3.value = scroll1.value = false;
            console.log('scroll4', scroll4.value);
          }
        });
      });

      return {
        example1,
        example2,
        example3,
        example4,
        gototry,
        scroll,
        scroll1,
        scroll2,
        scroll3,
        scroll4,
      };
    },
  });
</script>
<style lang="less" scoped>
  .example {
    display: flex;
    width: 1200px;
    margin: auto;

    .left {
      flex: 1;

      .items {
        position: sticky;
        top: 100px;
        height: calc(100vh - 100px);
      }

      .item {
        height: calc(100vh - 100px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        transition: all 0.4s ease-in-out;
        position: absolute;

        .line1 {
          font-size: 70px;
          font-weight: 600;
          line-height: 92px;
        }

        .line2 {
          font-size: 70px;
          font-weight: 600;
          color: black;
          line-height: 92px;
        }

        .line3 {
        }

        .inline-text {
          display: inline-block;
        }

        .description {
          color: black;
          opacity: 0.5;
          margin-top: 24px;
          width: 280px;
        }

        .text-color1 {
          background: linear-gradient(264.96deg, #a826f2 6.24%, #0035f0 34.05%, #82e3ff 96.26%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .text-color2 {
          background: linear-gradient(270.37deg, #f37490 0.39%, #f4d643 92.25%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .text-color3 {
          background: linear-gradient(270.37deg, #9c4fff 0.39%, #ff5c52 92.25%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .text-color4 {
          background: linear-gradient(270.37deg, #4fd5ff 0.39%, #5cebb7 70.24%, #86f38a 92.25%);
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .line4 {
          margin-top: 90px;

          .btn {
            background: #0035f0;
            border-radius: 8px;
            padding: 25px 36px;
            display: inline-flex;
            cursor: pointer;

            .btn-text {
              color: white;
              font-size: 16px;
              font-weight: 400;
              display: inline-block;
            }

            .btn-icon {
              margin-left: 24px;
              display: inline-block;
              object-fit: contain;
            }
          }
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      flex: 1;

      .item {
        height: calc(100vh - 100px);
        line-height: calc(100vh - 100px);
      }

      img {
        display: inline-block;
      }
    }

    .dot {
      width: 30px;

      .items {
        height: calc(100vh - 100px);
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        flex-direction: column;
        position: sticky;
        top: 100px;
        padding-bottom: 136px;

        .item {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: black;
          opacity: 0.1;
          margin: 10px 0px;
        }

        .active {
          background-color: #0035f0;
          opacity: 1;
        }
      }
    }
  }
</style>
