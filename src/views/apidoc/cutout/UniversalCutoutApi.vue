<template>
  <div class="page">
    <div class="section-wrap">
      <div class="title">通用抠图API</div>
      <div class="description">自动识别图像中主体轮廓，与背景进行分离，返回分割后的Alpha图、前景物体图，适应多物体，复杂背景。人像、商品、卡通、动物等等，所有明确主体的品类都可以识别分割，适应复杂背景和光线。</div>
    </div>
    <div class="doc section-wrap">
      <div class="doc-api-title">API文档说明</div>
      <Divider class="doc-title-divider" />
      <div class="doc-title">请求说明</div>
      <div class="api-url">请求url：http://jy.aicv.club/rest-api/cutout</div>
      <div class="api-method">请求方式：formData</div>
      <div class="api-response-type">返回类型：JSON</div>
      <div class="api-request">输入参数</div>
      <div class="api-request-content">
        <div class="api-header">
          <div class="api-request-title">1.请求头参数(header):</div>
          <table>
            <tr><th>参数</th><th>描述</th></tr>
            <tr><td>Content-Type</td><td>multipart/form-data</td></tr>
            <tr><td>x-api-key</td><td>api key</td></tr>
          </table>
        </div>
        <div class="api-body">
          <div class="api-request-title">2.请求体参数(body)：</div>
          <table>
            <tr><th>参数</th><th>描述</th><th>必填</th><th>默认值</th></tr>
            <tr><td>file</td><td>图片文件</td><td>是</td><td></td></tr>
          </table>
        </div>
      </div>
      <Divider />
      <div class="api-result">
        <div class="doc-title">返回说明</div>
        <div class="api-result-title">正常返回</div>
        <div class="api-result-example">
          <pre>
{
  "code": 200,
  "data": "https://1204-1309389332.cos.ap-guangzhou.myqcloud.com/temp/2022/10/22/4078b81c-ff87-4b9c-8145-90c5deb06863", //图片临时url，定时清理，请自行保存
  "msg": "seccess"
}
          </pre>
        </div>
        <div class="api-result-title">错误返回</div>
        <div class="api-result-example">
          <pre>
{
  "code": 500,
  "data": null,
  "msg": "错误提示"
}
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Divider } from 'ant-design-vue';

  export default defineComponent({
    name: 'UniversalCutoutApi',
    components: { Divider },
    setup() {
      return {};
    },
  });
</script>
<style lang="less" scoped>
  .page {
    // background-color: white;
    // padding: 48px;
    color: black;

    .section-wrap {
      background-color: white;
      padding: 48px;
    }

    .title {
      font-family: 'OPPOSans';
      font-style: normal;
      font-weight: 400;
      font-size: 70px;
    }

    .description {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      margin-top: 24px;
    }

    .doc {
      margin-top: 24px;
    }

    .doc-api-title {
      font-size: 48px;
      font-weight: 400;
    }

    .doc-title {
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 24px;
    }

    .doc-title-divider {
      margin: 32px 0px;
    }

    .api-url,
    .api-method,
    .api-response-type,
    .api-request,
    .api-result-title {
      line-height: 32px;
      font-size: 16px;
      display: flex;
      align-items: center;
    }

    .api-url::before,
    .api-method::before,
    .api-response-type::before,
    .api-request::before,
    .api-result-title::before {
      content: '';
      width: 6px;
      height: 6px;
      background-color: black;
      border-radius: 100%;
      margin-right: 10px;
      display: inline-block;
    }

    .api-result {
      margin-top: 24px;
    }

    .api-request-content {
      padding: 16px 52px;

      .api-request-title {
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
        margin-bottom: 12px;
      }

      .api-body {
        margin-top: 24px;
      }
    }
  }

  pre {
    padding: 24px;
    background: #f8f8f8;
  }

  table {
    border: solid 1px #dddddd;
    text-align: center;
    border-width: 1px 0px 0px 1px;
    width: 100%;
    border-spacing: 0;

    td,
    th {
      border: solid 1px #dddddd;
      border-width: 0px 1px 1px 0px;
      padding: 10px 0px;
      text-align: center;
    }

    th {
      color: rgba(0, 0, 0, 0.3);
      font-weight: 600;
      background: #e9e9e9;
    }
    td {
      color: rgba(0, 0, 0, 0.7);
      font-weight: 400;
    }
  }
</style>
