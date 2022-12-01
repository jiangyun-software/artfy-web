<template>
  <div class="case">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_artgeneration_example1" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">秒变动漫主角<br />平面水彩和3D</div>
          <div class="description">制作专属于你的动漫角色，平面画风，水彩画风，立体画风，各种<br />动漫形象，下一个公主、王子就是你！</div>
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
          <img :src="case_artgeneration_example2" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">一句话生成一幅画<br />艺术创作灵感来源</div>
          <div class="description">输入一句简单的画作语言描述，人工智能算法会根据描述生成不同<br />的创意画作，原创就是这么简单。</div>
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
          <img :src="case_artgeneration_example3" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">图像风格迁移<br />艺术感加持</div>
          <div class="description">给你的照片于世界级艺术风格加持，稳稳一副艺术作品。</div>
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
          <img :src="case_artgeneration_example4" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">Q版大头照<br />搞笑又卖萌</div>
          <div class="description">头像抠图通道可以帮助您直接扣出头部，后续可以自行搭配漫画身<br />体。玩味各种花式拼贴效果。</div>
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
  import case_artgeneration_example1 from '/@/assets/images/case_artgeneration_example1.png';
  import case_artgeneration_example2 from '/@/assets/images/case_artgeneration_example2.png';
  import case_artgeneration_example3 from '/@/assets/images/case_artgeneration_example3.png';
  import case_artgeneration_example4 from '/@/assets/images/case_artgeneration_example4.png';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import { Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'ArtGeneration',
    components: { Button },
    setup() {
      return {
        case_artgeneration_example1,
        case_artgeneration_example2,
        case_artgeneration_example3,
        case_artgeneration_example4,
        tryIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import './case.less';
</style>
