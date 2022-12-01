<template>
  <div class="easyapi-wrap">
    <div class="easyapi">
      <img :src="easyapi" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import easyapi from '/@/assets/images/home-easyapi.png';

  export default defineComponent({
    name: 'AllApplication',
    setup() {
      return {
        easyapi,
      };
    },
  });
</script>
<style lang="less" scoped>
  .easyapi-wrap {
    background-color: #e9e9e9;
    padding: 80px 0px 200px 0px;
    .easyapi {
      width: 1200px;
      margin: 0px auto;
    }
  }
</style>
