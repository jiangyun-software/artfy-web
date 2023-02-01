<template>
  <div class="concat">
    <div class="concat-item concat-wechat">
      <img :src="wechatIcon" alt="" />
      <div class="pop-wechat">
        <div class="concat-details">
          <div class="label"><span class="hightLight">商务</span>热线：</div>
          <div class="phone">135 4306 0130</div>
          <img class="qr" :src="businessQR" alt="" />
        </div>
        <div class="concat-details" style="margin-left: 16px">
          <div class="label"><span class="hightLight">技术</span>热线：</div>
          <div class="phone">139 2387 1248</div>
          <img class="qr" :src="technology" alt="" />
        </div>
        <CaretRightOutlined class="right" />
      </div>
    </div>
    <div class="concat-item concat-email">
      <img :src="emailIcon" alt="" />
      <div class="pop-email">
        <div class="concat-details">
          <div class="label">售后邮箱：</div>
          <div class="email">jiangyun@aicv.club</div>
        </div>
        <CaretRightOutlined class="right" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CaretRightOutlined } from '@ant-design/icons-vue';
  import wechatIcon from '/@/assets/images/wechat.png';
  import emailIcon from '/@/assets/images/email.png';
  import businessQR from '/@/assets/images/officialAccountQR2.png';
  import technology from '/@/assets/images/officialAccountQR2.png';

  export default defineComponent({
    name: 'Concat',
    components: { CaretRightOutlined },
    setup() {
      return {
        wechatIcon,
        emailIcon,
        businessQR,
        technology,
      };
    },
  });
</script>
<style lang="less" scoped>
  .concat {
    position: fixed;
    top: 50%;
    right: 40px;
    z-index: 999;

    .concat-item {
      width: 56px;
      height: 56px;
      border-radius: 8px;
      line-height: 56px;
      text-align: center;
      background-color: white;
      margin: 24px 0px;
      cursor: pointer;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

      img {
        display: inline;
      }
    }

    .pop-wechat {
      display: none;
      position: absolute;
      padding: 16px;
      background-color: white;
      border-radius: 8px;
      right: 72px;
      line-height: normal;
      top: -58px;
      cursor: default;
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
      border-radius: 8px;

      .concat-details {
        background-color: #f8f8f8;
        width: 130px;
        height: 188px;
        text-align: left;
        padding: 18px;

        .label {
          font-weight: 500;
        }

        .phone {
          margin-top: 4px;
          color: black;
          opacity: 0.7;
        }

        .qr {
          margin-top: 14px;
        }
      }

      .hightLight {
        color: #0035f0;
        font-weight: 500;
      }

      .right {
        position: absolute;
        right: -16px;
        color: white;
        top: calc(50% - 24px);
        padding: 21px 6px 21px 0px;
      }
    }

    .pop-email {
      display: none;
      position: absolute;
      background-color: white;
      border-radius: 8px;
      line-height: normal;
      right: 72px;
      padding: 20px;
      text-align: left;
      width: 220px;
      height: 86px;
      margin-top: -71px;
      cursor: default;
      box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.06);
      border-radius: 8px;

      .label {
        font-weight: 500;
        color: black;
      }

      .email {
        opacity: 0.7;
        font-weight: 400;
        margin-top: 6px;
      }

      .right {
        position: absolute;
        right: -16px;
        color: white;
        top: calc(50% - 24px);
        padding: 21px 6px 21px 0px;
      }
    }

    .concat-wechat:hover .pop-wechat {
      display: flex;
    }

    .concat-email:hover .pop-email {
      display: block;
    }
  }
</style>
