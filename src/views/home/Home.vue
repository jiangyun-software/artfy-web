<template>
  <div style="overflow: visible">
<!--    <Top />-->
<!--    <Partner />-->
<!--    <Example />-->
<!--    <AllApplication />-->
    <NewTop />
    <Scene />
    <EasyApi />
    <Advantage />
    <ConcatBootom />
    <Concat />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Top from './Top.vue';
  import Concat from './Concat.vue';
  import Example from './Example.vue';
  import Partner from './Partner.vue';
  import AllApplication from './AllApplication.vue';
  import Scene from './Scene.vue';
  import EasyApi from './EasyApi.vue';
  import Advantage from './Advantage.vue';
  import ConcatBootom from './ConcatBootom.vue';
  import NewTop from "./NewTop.vue";

  export default defineComponent({
    name: 'Home',
    components: { NewTop, Top, Concat, Example, Partner, AllApplication, Scene, EasyApi, Advantage, ConcatBootom },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped></style>
