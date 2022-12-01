<template>
  <div class="case">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_graphicdesign_example1" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">自定义形象照<br />探索无限可能</div>
          <div class="description">抠图从未如此简单！人物，商品，动物全部一键搞定。<br />精确识别主体并移除背景，并支持自定义更换背景颜色。</div>
          <div class="try">
            <Button class="try-btn">
              <span class="text">去试试</span>
              <span class="icon"><img :src="tryIcon" type="" /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="case" style="margin-top: 60px">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_graphicdesign_example2" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">去除瑕疵皱纹<br />还原自然美丽</div>
          <div class="description">无需专业修图师，小白也可轻松操作。一键即可去除面部瑕疵，还<br />原自然美貌，还不快去试试～</div>
          <div class="try">
            <Button class="try-btn">
              <span class="text">去试试</span>
              <span class="icon"><img :src="tryIcon" type="" /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="case" style="margin-top: 60px">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_graphicdesign_example3" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">发丝级专业抠图<br />细节看得见</div>
          <div class="description">专注细节，无需通道也可达到发丝级分割技术抠图。<br />轻松搞定人像抠图，抠从未如此简单！</div>
          <div class="try">
            <Button class="try-btn">
              <span class="text">去试试</span>
              <span class="icon"><img :src="tryIcon" type="" /></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import case_graphicdesign_example1 from '/@/assets/images/case_graphicdesign_example1.png';
  import case_graphicdesign_example2 from '/@/assets/images/case_graphicdesign_example2.png';
  import case_graphicdesign_example3 from '/@/assets/images/case_graphicdesign_example3.png';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import { Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'GraphicDesign',
    components: { Button },
    setup() {
      return {
        case_graphicdesign_example1,
        case_graphicdesign_example2,
        case_graphicdesign_example3,
        tryIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import './case.less';
</style>
