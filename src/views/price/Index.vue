<template>
  <div class="price">
    <div class="title">价格</div>
    <div class="link-price-doc">查看价格说明</div>
    <div class="content">
      <div class="left">
        <div class="average">
          <span class="average-number">￥{{ comboList.length == 0 ? 0 : comboList[selectComboIndex].average }}</span>
          <span class="average-unit">/点</span>
          <div class="favorite">最受欢迎</div>
        </div>
        <div class="description1">按点购买，按点消耗</div>
        <div class="description2">没有时效限制，用完为止</div>
        <Divider class="divider1" />
        <div class="combo-list">
          <RadioGroup v-model:value="selectComboIndex" style="display: block">
            <div v-for="(item, index) in comboList" :key="item.id" class="combo-item">
              <Radio :value="index">{{ item.point }}</Radio>
              <div>{{ item.amount }}</div>
              <div>￥{{ item.average }}/点</div>
            </div>
          </RadioGroup>
          <div class="combo-item">企业客户大批量或包月方案，请联系我们</div>
        </div>
        <Divider class="divider2" />
        <div class="buy"><Button class="jy-btn-blue-out btn-price" @click="createOrder">立即购买</Button></div>
        <div class="payment-amount">需支付￥{{ comboList.length == 0 ? 0 : comboList[selectComboIndex].amount }}</div>
      </div>
      <div class="right">
        <div class="title">免费点数</div>
        <div class="invitation-wrap">
          <div class="invitation-item1">
            <div><Button class="jy-btn-blue-out btn-price">立即邀请</Button></div>
            <div class="invitation-desc">邀请好友注册可获得5点免费下载赠送</div>
          </div>
          <div class="invitation-item2">
            <div><Button class="jy-btn-blue-out btn-price">立即填写</Button></div>
            <div class="invitation-desc">填写好友邀请码可获得5点免费下载赠送</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="modalParent">
    <Modal v-model:visible="qrCodeModalVisible" :maskClosable="false" @cancel="onQrCodeModalClose" :getContainer="() => $refs.modalParent" :footer="null" class="rqCodeModal" :width="480">
      <div class="qr-title">支付宝扫码支付</div>
      <div class="order-qr">
        <QrcodeVue :value="orderInfo[orderInfo.payType]" :size="200" />
        <div class="amount">点数充值 ￥{{ comboList[selectComboIndex].amount }}元</div>
      </div>
      <div class="order-point">充值套餐：{{ comboList[selectComboIndex].point }}点</div>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { Button, Divider, Radio, RadioGroup, Modal, message } from 'ant-design-vue';
  import { comboApi, createOrderApi, getOrderPayQrcodeApi, getOrderDedailsApi } from '/@/api/api';
  import QrcodeVue from 'qrcode.vue';

  export default defineComponent({
    name: 'Price',
    components: { Button, Divider, Radio, RadioGroup, Modal, QrcodeVue },
    setup() {
      const amount = ref(0);
      let comboList = ref<any>([]);
      const selectComboIndex = ref(0);

      const params = {
        comboId: null,
      };

      const orderInfo = reactive({
        orderId: null,
        payType: '0',
        '0': '',
        '1': '',
      });

      const qrCodeModalVisible = ref(false);
      const qrCodeUrl = ref('');

      const getComboList = () => {
        comboApi().then((res) => {
          if (res.code == 200) {
            comboList.value = res.data;
          }
        });
      };

      const createOrder = () => {
        orderInfo.orderId = null;
        orderInfo.payType = '0';
        orderInfo['0'] = '';
        orderInfo['1'] = '';
        params.comboId = comboList.value[selectComboIndex.value].id;
        createOrderApi(params).then((res) => {
          if (res.code == 200) {
            orderInfo.orderId = res.data;
            qrCodeModalVisible.value = true;
            getOrderPayQrcode('0');
          }
        });
      };

      const getOrderPayQrcode = (type) => {
        orderInfo.payType = type;
        if (!orderInfo[orderInfo.payType]) {
          getOrderPayQrcodeApi(orderInfo.orderId, type).then((res) => {
            orderInfo[orderInfo.payType] = res.data.qrcode;
            checkPayStatus();
          });
        }
      };

      let checkPayStatusInterval = 0 as any;
      const checkPayStatus = () => {
        checkPayStatusInterval = setInterval(() => {
          getOrderDedailsApi(orderInfo.orderId).then((res) => {
            if (res.code == 200) {
              if (res.data.payStatus == '1') {
                message.success('支付成功');
                qrCodeModalVisible.value = false;
                clearInterval(checkPayStatusInterval);
              }
            }
          });
        }, 1000);
      };

      const onQrCodeModalClose = () => {
        clearInterval(checkPayStatusInterval);
      };

      onMounted(() => {
        getComboList();
      });

      return {
        amount,
        comboList,
        selectComboIndex,
        getComboList,
        createOrder,
        qrCodeModalVisible,
        onQrCodeModalClose,
        qrCodeUrl,
        orderInfo,
      };
    },
  });
</script>
<style lang="less" scoped>
  .price {
    width: 1200px;
    margin: 0px auto;
    .title {
      font-weight: 400;
      font-size: 56px;
      text-align: center;
      margin-top: 80px;
    }
    .link-price-doc {
      font-weight: 400;
      font-size: 14px;
      color: @blue;
      text-align: center;
      margin-top: 12px;
    }
    .content {
      display: flex;
      // align-items: baseline;
      justify-content: center;
      margin-top: 48px;
      margin-bottom: 150px;

      .left,
      .right {
        width: 568px;
        padding: 48px 24px;
        margin: 0px 12px;
        background: white;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      .left {
        .average {
          color: black;
          text-align: center;
          position: relative;
          display: inline-block;
          margin-left: 50%;
          transform: translateX(-50%);
          .average-number {
            font-size: 48px;
          }
          .average-unit {
            font-size: 14px;
          }
          .favorite {
            position: absolute;
            background: linear-gradient(143.81deg, rgba(255, 205, 26, 0.4) 58.82%, rgba(255, 205, 26, 0) 15.7%);
            border: 1px solid #ffcd1a;
            top: 0px;
            left: calc(100% - 1em);
            white-space: nowrap;
          }
        }
        .description1 {
          font-size: 24px;
          text-align: center;
          margin-top: 36px;
          color: black;
        }
        .description2 {
          font-size: 14px;
          text-align: center;
          margin-top: 8px;
          color: rgba(0, 0, 0, 0.5);
        }
        .divider1 {
          margin: 36px 0px 0px 0px;
        }

        .divider2 {
          margin: 0px 0px 36px 0px;
        }

        .combo-list {
          .combo-item {
            display: flex;
            width: 100%;
            justify-content: space-between;
            margin: 14px 0px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.7);
          }
        }
        .buy {
          text-align: center;
        }
        .payment-amount {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.7);
          margin-top: 12px;
          text-align: center;
        }
      }
      .right {
        .title {
          font-size: 48px;
          color: black;
          margin-top: 0px;
        }
        .invitation-wrap {
          margin-top: 36px;
          .invitation-item1,
          .invitation-item2 {
            padding: 80px 0px;
            background: #f8f8f8;
            border-radius: 8px;
            text-align: center;
          }
          .invitation-item2 {
            margin-top: 24px;
          }

          .invitation-desc {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.7);
            margin-top: 24px;
          }
        }
      }
    }
  }

  .btn-price {
    padding: 12px 0px !important;
    width: 200px !important;
    text-align: center !important;
  }

  .qr-title {
    text-align: center;
    font-size: 20px;
    color: white;
  }

  .order-qr {
    background-color: white;
    padding: 60px;
    margin-top: 24px;
    border-radius: 4px;

    canvas {
      margin: auto;
    }

    .amount {
      text-align: center;
      margin-top: 40px;
      font-size: 20px;
    }
  }

  .order-point {
    text-align: center;
    color: white;
    padding: 24px 0px 10px 0px;
  }

  :deep(.ant-modal-content) {
    border-radius: 8px;
  }

  :deep(.ant-modal-body) {
    // padding: 40px !important;
    background-color: #7e9aff;
  }

  :deep(.ant-modal-header) {
    background-color: #7e9aff;
    border: none;
  }

  :deep(.ant-modal-title) {
    text-align: center;
    color: white;
    font-size: 20px;
  }

  :deep(.ant-modal-close-icon) {
    color: white;
  }
</style>
