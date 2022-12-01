<template>
  <Layout>
    <Header />
    <Content />
    <Footer />
    <Login />
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Header from '../default/header.vue';
  import Content from './content.vue';
  import Footer from '../default/footer.vue';
  import Login from '../default/login.vue';

  export default defineComponent({
    name: 'UserLaout',
    components: {
      Layout,
      Header,
      Content,
      Footer,
      Login,
    },
    setup() {},
  });
</script>
<style lang="less"></style>
