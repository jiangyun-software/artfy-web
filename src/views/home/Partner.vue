<template>
  <div class="partner">
    <div class="items">
      <img class="partner-item" v-for="(item, index) in partners" :key="index" :src="item.logo" alt="" :style="{ order: index }" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import partner_logo_ali from '/@/assets/images/partner_logo_ali.png';
  import partner_logo_taobao from '/@/assets/images/partner_logo_taobao.png';
  import partner_logo_baidu from '/@/assets/images/partner_logo_baidu.png';
  import partner_logo_tengxun from '/@/assets/images/partner_logo_tengxun.png';

  export default defineComponent({
    name: 'Partner',
    setup() {
      let partners = ref([
        { name: 'ali', logo: partner_logo_ali },
        { name: 'taobao', logo: partner_logo_taobao },
        { name: 'baidu', logo: partner_logo_baidu },
        { name: 'tengxun', logo: partner_logo_tengxun },
      ]);

      partners.value.push(...partners.value);
      partners.value.push(...partners.value);
      partners.value.push(...partners.value);
      partners.value.push(...partners.value);
      partners.value.push(...partners.value);

      return {
        partner_logo_ali,
        partner_logo_taobao,
        partner_logo_baidu,
        partner_logo_tengxun,
        partners,
      };
    },
  });
</script>
<style lang="less" scoped>
  .items {
    display: inline-flex;
    height: 160px;
    align-items: center;
    justify-content: flex-end;
    animation: 180s partnersLoop linear infinite normal;

    .partner-item {
      margin: 0px 60px;
      object-fit: contain;
    }
  }

  @keyframes partnersLoop {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(calc(100% - 100vw));
    }
  }
</style>
