<template>
  <div class="account-page">
    <div class="title">我的账户</div>
    <div class="createTime">创建时间：{{ userInfo.createTime }}</div>
    <div class="pointInfo">
      <div class="point-item">
        <div class="point-title"><span class="circle"></span><span>剩余点数</span></div>
        <div class="point-wrap">
          <div class="point">{{ userInfo.point }}点</div>
        </div>
      </div>
      <!-- <div class="point-item" style="margin-left: 36px">
        <div class="point-title"><span class="circle"></span><span>视频剩余时间</span></div>
        <div class="point-wrap">
          <div class="point">{{ userInfo.picturePoint }}</div>
        </div>
      </div> -->
    </div>
    <div>
      <router-link to="/price"><Button class="btn-blue">立即购买</Button></router-link>
    </div>
  </div>
  <div class="account-page log">
    <Tabs v-model:activeKey="activeKey">
      <TabPane key="log" tab="消费记录">
        <Table :columns="logColumns" :row-key="(record) => record.id" :data-source="logDataSource" :pagination="logPagination" :loading="logLoading" @change="handleLogTableChange" />
      </TabPane>
      <TabPane key="order" tab="充值记录">
        <Table :columns="orderColumns" :row-key="(record) => record.id" :data-source="orderDataSource" :pagination="orderPagination" :loading="orderLoading" @change="handleOrderTableChange" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onBeforeMount, onMounted } from 'vue';
  import { Button, Table, Tabs, TabPane } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { myOrderListApi, myPointLogtApi } from '/@/api/api';

  export default defineComponent({
    name: 'My',
    components: { Button, Table, Tabs, TabPane },
    setup() {
      const userStore = useUserStore();
      const userInfo = ref({});

      onBeforeMount(async () => {
        userInfo.value = await userStore.getUserInfoAction();
      });

      const activeKey = ref('log');

      const logLoading = ref(false);
      const orderLoading = ref(false);

      const logColumns = [
        { title: '产品', dataIndex: 'product', width: 'auto' },
        { title: '消费点数', dataIndex: 'point', width: 'auto' },
        { title: '消费时间', dataIndex: 'requestTime', width: 'auto' },
        { title: '消费类型', dataIndex: 'type', width: 'auto' },
      ];
      const logDataSource = ref([]);

      const orderColumns = [
        { title: '订单编号', dataIndex: 'id', width: 'auto' },
        { title: '金额', dataIndex: 'amount', width: 'auto' },
        { title: '订单描述', dataIndex: 'subject', width: 'auto' },
        { title: '创建时间', dataIndex: 'createTime', width: 'auto' },
        { title: '支付类型', dataIndex: 'payType', width: 'auto' },
        { title: '支付状态', dataIndex: 'payStatus', width: 'auto' },
        { title: '支付时间', dataIndex: 'payTime', width: 'auto' },
      ];
      const orderDataSource = ref([]);

      const logPagination = reactive({ total: 0, current: 1, pageSize: 10 });
      const orderPagination = reactive({ total: 0, current: 1, pageSize: 10 });

      const handleLogTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
        logPagination.current = pag.current;
        logPagination.pageSize = pag.pageSize;
        getPointLogList();
      };

      const handleOrderTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
        orderPagination.current = pag.current;
        orderPagination.pageSize = pag.pageSize;
        getOrderList();
      };

      const payTypeMap = {
        '0': '支付宝',
        '1': '微信',
      };

      const payStatusMap = {
        '0': '未支付',
        '1': '已支付',
        '2': '已取消',
      };

      const pointTypeMap = {
        '0': '下载',
        '1': 'api调用',
      };

      const getPointLogList = () => {
        logLoading.value = true;
        myPointLogtApi(logPagination).then((res) => {
          logLoading.value = false;
          if (res.code == 200) {
            logDataSource.value = res.data.rows.map((item) => {
              item.type = pointTypeMap[item.type];
              return item;
            });
            logPagination.total = res.data.total;
          }
        });
      };

      const getOrderList = () => {
        orderLoading.value = true;
        myOrderListApi(logPagination).then((res) => {
          orderLoading.value = false;
          if (res.code == 200) {
            orderDataSource.value = res.data.rows.map((item) => {
              item.payType = payTypeMap[item.payType];
              item.payStatus = payStatusMap[item.payStatus];
              return item;
            });
            orderPagination.total = res.data.total;
          }
        });
      };

      onMounted(() => {
        getPointLogList();
        getOrderList();
      });

      return {
        userInfo,
        activeKey,
        logColumns,
        logDataSource,
        orderColumns,
        orderDataSource,
        logPagination,
        orderPagination,
        handleLogTableChange,
        handleOrderTableChange,
        logLoading,
        orderLoading,
      };
    },
  });
</script>
<style lang="less" scoped>
  .account-page {
    padding: 48px;
    background-color: white;
  }

  .title {
    font-size: 48px;
    font-weight: bold;
  }
  .createTime {
    color: rgba(0, 0, 0, 50%);
    font-size: 12px;
  }

  .pointInfo {
    color: black;
    margin-top: 36px;
    display: flex;

    .point-item {
      width: 378px;
      padding: 32px 36px;
      background: #f8f8f8;
      border-radius: 8px;

      .point-title {
        font-size: 16px;
        font-weight: bold;
        display: flex;
        align-items: center;
      }

      .point {
        color: #0035f0;
        font-size: 24px;
      }

      .point-wrap {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 16px;

        .expired {
          color: rgba(0, 0, 0, 70%);
        }
      }
    }
  }

  .circle {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: black;
    margin-right: 8px;
  }

  .btn-blue {
    background: #0035f0;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    padding: 18px 46px;
    height: auto;
    margin-top: 36px;
    margin-bottom: 48px;
  }

  .log {
    margin-top: 24px;
  }
</style>
