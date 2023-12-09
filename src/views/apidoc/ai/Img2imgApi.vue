<template>
  <div class="page">
    <div class="section-wrap">
      <div class="title">图生图API</div>
      <div class="description">上传照片选择风格生成精美图片</div>
    </div>
    <div class="doc section-wrap">
      <div class="doc-api-title">API文档说明</div>
      <Divider class="doc-title-divider" />
      <div class="doc-title">请求说明</div>
      <div class="api-url">请求url：https://artfy.cc/rest-api/artfy/img2img</div>
      <div class="api-method">请求方式：POST</div>
      <div class="api-response-type">返回类型：JSON</div>
      <div class="api-request">输入参数</div>
      <div class="api-request-content">
        <div class="api-header">
          <div class="api-request-title">1.请求头参数(header):</div>
          <table>
            <tr><th>参数</th><th>描述</th></tr>
            <tr><td>Content-Type</td><td>application/json</td></tr>
            <tr><td>x-api-key</td><td>api key</td></tr>
          </table>
        </div>
        <div class="api-body">
          <div class="api-request-title">2.请求体参数(body)：</div>
          <div class="api-request-body">
            <pre>
{
  "initImageUrl": "图片url", //优先使用url
  "initImageBase64": "图片base64", //优先使用url
  "styleId": "风格id" // 使用风格查询接口获取
}
            </pre>
          </div>
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
  "data": "id", // 本次数据id，可用于回调通知和查询
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
    name: 'Img2imgApi',
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
      padding: 16px 0px 16px 52px;

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
