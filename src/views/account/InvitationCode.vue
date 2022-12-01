<template>
  <div class="account-page">
    <div class="title">邀请好友免费获取点数</div>
    <div class="invitation-code">
      <Input class="jy-input invitation-code-input" v-model:value="invitationCode" readonly />
      <Button class="invitation-code-copy" type="link" @click="copy">点击复制</Button>
    </div>
    <div class="tips">* 邀请好友手机号注册，填写邀请码，你和好友都获赠5点数</div>
  </div>
  <div class="account-page log">
    <div class="log-title">邀请记录</div>
    <Table class="log-table" :columns="columns" :row-key="(record) => record.id" :data-source="dataSource" :pagination="pagination" @change="handleTableChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, onMounted } from 'vue';
  import { Table, Input, Button, message } from 'ant-design-vue';
  import { invitationLogApi } from '/@/api/api';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'InvitationCode',
    components: { Table, Input, Button },
    setup() {
      const userStore = useUserStore();
      const userInfo = userStore.getUserInfo;
      const invitationCode = userInfo.invitationCode;

      const columns = [
        { title: '日期', dataIndex: 'createTime', width: '250px' },
        { title: '邀请奖励', dataIndex: 'point' },
      ];

      const dataSource = ref([]);

      const pagination = reactive({
        current: 1,
        pageSize: 10,
      });

      const total = ref(0);

      const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
        pagination.current = pag.current;
        pagination.pageSize = pag.pageSize;
      };

      const getInvitationLogs = () => {
        invitationLogApi(pagination).then((res) => {
          if (res.code == 200) {
            dataSource.value = res.data.rows;
          }
        });
      };

      const copy = () => {
        navigator.clipboard.writeText(invitationCode);
        message.success('复制成功');
      };

      onMounted(() => {
        getInvitationLogs();
      });

      return {
        invitationCode,
        columns,
        dataSource,
        total,
        handleTableChange,
        copy,
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

  .invitation-code {
    margin-top: 36px;

    .invitation-code-input {
      width: 300px;
    }

    .invitation-code-copy {
      margin-left: -88px;
      color: @blue;
    }
  }

  .tips {
    margin-top: 16px;
    color: red;
    font-size: 20px;
  }

  .log {
    margin-top: 24px;

    .log-title {
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      color: #000000;
    }

    .log-table {
      margin-top: 24px;
    }
  }
</style>
