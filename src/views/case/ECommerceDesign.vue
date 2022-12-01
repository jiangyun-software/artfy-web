<template>
  <div class="case">
    <div class="example">
      <div class="content">
        <div class="image">
          <img :src="case_ecommercedesign_example1" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">任何电商产品<br />都可自动抠图</div>
          <div class="description">支持美妆、服饰、箱包、数码、食品、动植物等各种类型的商品，<br />无需绿色布景，上传图片，智能识别，一键抠出物体本身。</div>
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
          <img :src="case_ecommercedesign_example2" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">一键替换白底图<br />商品展示更清晰</div>
          <div class="description">配合商家对应平台的商品展示，拍摄产品图后用匠韵物体抠图，自<br />定义更换白色背景，直接导出一步到位</div>
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
          <img :src="case_ecommercedesign_example3" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">抚平服装褶皱<br />消除穿帮物体</div>
          <div class="description">产品瑕疵，服装褶皱，多余线头，服装污渍，包括拍摄时不小心拍<br />到的多余物体，都可通过简单的涂抹进行修复去除不需要的东西。</div>
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
          <img :src="case_ecommercedesign_example4" alt="" />
        </div>
        <div class="right">
          <div clas="hot">
            <div class="hot-icon">HOT</div>
          </div>
          <div class="title">实用去水印神器<br />更高的修复质量</div>
          <div class="description">这是一款强大且使用的图片去水印软件，选定您需要移除的水印区<br />域后，AI算法会自动帮您擦除并修复。</div>
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
  import case_ecommercedesign_example1 from '/@/assets/images/case_ecommercedesign_example1.png';
  import case_ecommercedesign_example2 from '/@/assets/images/case_ecommercedesign_example2.png';
  import case_ecommercedesign_example3 from '/@/assets/images/case_ecommercedesign_example3.png';
  import case_ecommercedesign_example4 from '/@/assets/images/case_ecommercedesign_example4.png';
  import tryIcon from '/@/assets/svg/gototry.svg';
  import { Button } from 'ant-design-vue';

  export default defineComponent({
    name: 'ECommerceDesign',
    components: { Button },
    setup() {
      return {
        case_ecommercedesign_example1,
        case_ecommercedesign_example2,
        case_ecommercedesign_example3,
        case_ecommercedesign_example4,
        tryIcon,
      };
    },
  });
</script>
<style lang="less" scoped>
  @import './case.less';
</style>
