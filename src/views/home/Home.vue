<template>
  <div style="overflow: visible">
    <Top />
    <Partner />
    <Example />
    <AllApplication />
    <Scene />
    <EasyApi />
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

  export default defineComponent({
    name: 'Home',
    components: { Top, Concat, Example, Partner, AllApplication, Scene, EasyApi },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped></style>
