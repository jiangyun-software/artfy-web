<template>
  <div class="account-page">
    <div class="title">主API密钥 </div>
    <div>
      <div class="primary">
        <Input v-model:value="primaryKey" readonly class="jy-input" />
        <div class="option">
          <Button type="link" @click="copy">点击复制</Button>
          <Divider class="divider" type="vertical" />
          <Button type="link" @click="handleResetPrimaryKey">刷新</Button>
        </div>
      </div>
    </div>
    <div class="description">* 主api秘钥会长期有效且只能通过刷新来进行更新，无法删除。子api秘钥可以有有效期，也可以暂时禁用和永久删除</div>
    <div class="add-btn"><Button class="jy-btn-blue" @click="handleEdit(null)">添加子密钥</Button></div>
  </div>
  <div class="account-page sub-key">
    <Table :columns="columns" :row-key="(record) => record.id" :data-source="dataSource" :pagination="pagination" :loading="loading" @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'disabled'">
          <span v-if="record.disabled">已禁用</span>
          <span v-else style="color: #0035f0">已启用</span>
        </template>
        <template v-if="column.key === 'option'">
          <Button type="link" @click="handleEdit(record)" class="btn-edit">编辑</Button>
          <Button type="link" @click="handleDelete(record.id)" class="btn-delete">删除</Button>
        </template>
      </template>
    </Table>
  </div>
  <div ref="globalModal">
    <Modal v-model:visible="subKeyModalVisible" :maskClosable="false" :title="subKeyModalTitle" :getContainer="() => $refs.globalModal" @cancel="onSubKeyModalClose" class="jy-modal" :width="604">
      <Form ref="subKeyFormRef" :model="subKeyFormData" :rules="subKeyRules" name="subKeyForm" autocomplete="off" :label-col="{ span: 4 }">
        <FormItem name="id" style="display: none">
          <Input v-model="subKeyFormData.id" />
        </FormItem>
        <FormItem v-show="subKeyFormData.id" name="key" label="API key:">
          <span>{{ subKeyFormData.key }}</span>
        </FormItem>
        <FormItem v-show="subKeyFormData.id" name="disabled" label="状态:">
          <RadioGroup v-model:value="subKeyFormData.disabled">
            <Radio :value="false">启用</Radio>
            <Radio :value="true">禁用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem name="permanent" label="永久有效:">
          <Switch class="jy" v-model:checked="subKeyFormData.permanent" />
        </FormItem>
        <FormItem v-show="!subKeyFormData.permanent" name="expirationDate" label="过期时间:">
          <DatePicker v-model:value="subKeyFormData.expirationDate" :disabled-date="disabledDate" format="YYYY-MM-DD" value-format="YYYY-MM-DD" size="large" style="width: 256px" />
        </FormItem>
        <FormItem name="remark">
          <InputTextArea v-model:value="subKeyFormData.remark" show-count :maxlength="250" :autoSize="{ minRows: 4, maxRows: 6 }" placeholder="备注内容" />
        </FormItem>
      </Form>
      <template #footer>
        <Button class="jy-btn-blue" style="width: 100%; padding: 12px 0px !important" type="primary" :loading="false" @click="handleSubmitSaveSubKey">确定</Button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
  import { Button, Table, Input, Divider, Form, FormItem, Switch, DatePicker, message, Modal, RadioGroup, Radio } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { subKeySaveApi, subKeyListApi, subKeyDeleteApi, primaryKeyApi, resetPrimaryApi } from '/@/api/api';
  import dayjs from 'dayjs';
  import type { Dayjs } from 'dayjs';
  // import 'ant-design-vue/es/input/style/index';

  export default defineComponent({
    name: 'ApiKey',
    components: { Button, Input, Table, Divider, Form, FormItem, Switch, DatePicker, InputTextArea: Input.TextArea, Modal, RadioGroup, Radio },
    setup() {
      const columns = [
        { title: 'API key', dataIndex: 'key', key: 'key', width: '300px' },
        { title: '备注', dataIndex: 'remark', key: 'remark' },
        { title: '状态', dataIndex: 'disabled', key: 'disabled', width: '120px ' },
        { title: '过期时间', dataIndex: 'expirationDate', key: 'expirationDate', width: '200px' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: '220px' },
        { title: '操作', key: 'option', width: '240px' },
      ];

      const dataSource = ref([]);

      const pagination = reactive({
        pageNum: 1,
        pageSize: 30,
      });

      const total = ref(0);

      const handleTableChange = (pag: { pageSize: number; current: number }, filters: any, sorter: any) => {
        pagination.pageNum = pag.current;
        pagination.pageSize = pag.pageSize;
      };

      const loading = ref(false);

      const primaryKey = ref('');

      const subKeyModalVisible = ref(false);
      const subKeyModalTitle = computed(() => (subKeyFormData.id ? '修改子密钥' : '添加子密钥'));

      const subKeyFormRef = ref<FormInstance>();

      const onSubKeyModalClose = () => {
        setTimeout(() => {
          subKeyFormRef.value.resetFields();
        }, 500);
      };

      const handleSubmitSaveSubKey = () => {
        subKeyFormRef.value
          .validate()
          .then(() => {
            subKeySaveApi(subKeyFormData).then((result) => {
              if (result.code == 200) {
                message.success('保存成功');
                subKeyModalVisible.value = false;
                subKeyList();
                onSubKeyModalClose();
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const subKeyFormData = reactive({
        id: null,
        key: '',
        permanent: false,
        remark: '',
        disabled: false,
        expirationDate: '',
      });

      const validateExpirationDate = async (_rule: Rule, value: string) => {
        if (value === '' && !subKeyFormData.permanent) {
          return Promise.reject('请选择过期日期');
        } else {
          return Promise.resolve();
        }
      };

      const subKeyRules: Record<string, Rule[]> = {
        expirationDate: [{ required: true, validator: validateExpirationDate, trigger: 'blur' }],
      };

      const handleEdit = (record) => {
        if (record) {
          subKeyFormData.id = record.id;
          subKeyFormData.key = record.key;
          subKeyFormData.permanent = record.permanent;
          subKeyFormData.remark = record.remark;
          subKeyFormData.disabled = record.disabled;
          subKeyFormData.expirationDate = record.expirationDate;
        }

        subKeyModalVisible.value = true;
      };

      const subKeyList = () => {
        subKeyListApi(pagination).then((res) => {
          if (res.code == 200) {
            dataSource.value = res.data.rows;
            total.value = res.data.total;
          }
        });
      };

      const handleDelete = (id) => {
        subKeyDeleteApi(id).then((res) => {
          if (res.code == 200) {
            message.success('删除成功');
            subKeyList();
          }
        });
      };

      const handleResetPrimaryKey = () => {
        resetPrimaryApi().then((res) => {
          if (res.code == 200) {
            primaryKey.value = res.data;
            message.success('主密钥刷新成功');
          }
        });
      };

      const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().endOf('day');
      };

      const copy = () => {
        navigator.clipboard.writeText(primaryKey.value);
        message.success('复制成功');
      };

      onMounted(() => {
        primaryKeyApi().then((res) => {
          if (res.code == 200) {
            primaryKey.value = res.data.key;
          }
        });
        subKeyList();
      });

      return {
        columns,
        dataSource,
        handleTableChange,
        pagination,
        loading,
        primaryKey,
        subKeyFormData,
        subKeyModalVisible,
        subKeyModalTitle,
        onSubKeyModalClose,
        subKeyFormRef,
        handleSubmitSaveSubKey,
        subKeyRules,
        handleEdit,
        total,
        subKeyList,
        handleDelete,
        primaryKeyApi,
        resetPrimaryApi,
        handleResetPrimaryKey,
        disabledDate,
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

  .primary {
    width: 664px;
    position: relative;

    .option {
      position: absolute;
      top: 12px;
      right: 8px;

      button {
        color: #0035f0;
      }
    }

    .divider {
      height: 32px;
      margin: 0px;
    }
  }

  .description {
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: rgb(0 0 0 / 50%);
    margin-top: 12px;
  }

  .add-btn {
    margin-top: 60px;
  }

  .sub-key {
    margin-top: 24px;
  }

  .btn-edit {
    color: @blue;
  }

  .btn-delete {
    color: rgb(0 0 0 / 50%);
  }
</style>
