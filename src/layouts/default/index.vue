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
  import Header from './header.vue';
  import Content from './content.vue';
  import Footer from './footer.vue';
  import Login from './login.vue';

  export default defineComponent({
    name: 'MyLaout',
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
