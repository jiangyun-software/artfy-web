<template>
  <div class="case">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_videoxr_example1" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">视频抠图去背景<br />无需绿幕布置</div>
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
          <img :src="case_videoxr_example2" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">专业级视频处理<br />去字幕水印</div>
          <div class="description">智能识别视频中的字幕水印，一键去除。轻松完成vlog，影视等剪<br />辑任务，操作简单，效果好。</div>
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
  import case_videoxr_example1 from '/@/assets/images/case_videoxr_example1.png';
  import case_videoxr_example2 from '/@/assets/images/case_videoxr_example2.png';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import { Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'VideoXR',
    components: { Button },
    setup() {
      return {
        case_videoxr_example1,
        case_videoxr_example2,
        tryIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import './case.less';
</style>
