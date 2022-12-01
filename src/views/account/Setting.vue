<template>
  <div class="account-page">
    <div class="title">账号设置</div>
    <div class="setting-items">
      <div class="setting-item">
        <div class="setting-item-label">手机号</div>
        <div class="setting-item-input">
          <Input v-model:value="userInfo.phonenumber" readonly placeholder="未绑定，绑定后可用手机号登录" />
          <Button type="link" v-if="userInfo.phonenumber" @click="handleChangePhonenumber" style="color: black">更改绑定</Button>
          <Button type="link" v-else>立即绑定</Button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-label">微信</div>
        <div class="setting-item-input">
          <Input v-model:value="userInfo.wechatNickName" readonly placeholder="未绑定，绑定后获得更佳体验" />
          <Button type="link" v-if="!userInfo.wechatNickName" @click="handleBindWechat" style="color: #0035f0">立即绑定</Button>
          <Button type="link" v-else @click="handleUnbindWechat">解除绑定</Button>
        </div>
      </div>
      <div class="setting-item">
        <div class="setting-item-label">密码</div>
        <div class="setting-item-input">
          <Input v-model:value="userInfo.password" readonly placeholder="未设置密码，设置后获得更佳体验" />
          <Button type="link" v-if="!userInfo.password" @click="handleChangePassword" style="color: #0035f0">设置密码</Button>
          <Button type="link" v-else @click="handleChangePassword" style="color: black">更改密码</Button>
        </div>
      </div>
    </div>
  </div>
  <div ref="globalModal">
    <Modal v-model:visible="changePhonenumberModalVisible" :maskClosable="false" title="更改手机号" :getContainer="() => $refs.globalModal" @cancel="onChangePhonenumberModalClose">
      <div v-show="changePhonenumberFormData.type == 'old'">
        <div style="display: flex; align-items: center; font-size: 16px">
          <ExclamationCircleOutlined style="color: #ff0000; display: inline" />
          <span style="margin-left: 10px; font-weight: 400">解除绑定后将无法使用该手机号登录此账号。</span>
        </div>
        <div style="margin-top: 36px; font-size: 16px; font-weight: 400">旧手机号：{{ userInfo.phonenumber }}</div>
      </div>
      <Form ref="changePhonenumberFormRef" :model="changePhonenumberFormData" name="changePhonenumberForm" autocomplete="off">
        <Input type="hidden" v-model:value="changePhonenumberFormData.oldPhonenumber" />
        <FormItem v-show="changePhonenumberFormData.type == 'old'" class="input-sms-code" style="margin-top: 16px" name="oldSmsCode" :rules="[{ required: true, message: '验证码不能为空' }]">
          <Input v-model:value="changePhonenumberFormData.oldSmsCode" placeholder="短信验证码" autocomplete="false" :maxlength="6" />
          <Button type="link" @click="getSmsCode('old')">{{ smsCountdownText }}</Button>
        </FormItem>
        <div v-show="changePhonenumberFormData.type == 'new'">
          <FormItem
            class="input-sms-code"
            style="margin-top: 16px"
            name="newPhonenumber"
            :rules="[
              { required: true, message: '手机号不能为空' },
              { pattern: '^[1][3,4,5,6,7,8,9][0-9]{9}$', message: '手机号不合法' },
            ]"
          >
            <Input v-model:value="changePhonenumberFormData.newPhonenumber" placeholder="新手机号" autocomplete="false" :maxlength="11" />
          </FormItem>
          <FormItem class="input-sms-code" name="newSmsCode" :rules="[{ required: true, message: '验证码不能为空' }]">
            <Input v-model:value="changePhonenumberFormData.newSmsCode" placeholder="短信验证码" autocomplete="false" :maxlength="6" />
            <Button type="link" @click="getSmsCode('new')">{{ smsCountdownText }}</Button>
          </FormItem>
        </div>
      </Form>
      <template #footer>
        <Button class="btn-blue" style="width: 100%" type="primary" :loading="false" @click="handleSubmitChangePhonenumber">{{ changePhonenumberBtnText }}</Button>
      </template>
    </Modal>

    <Modal v-model:visible="changePasswordModalVisible" :maskClosable="false" title="修改密码" :getContainer="() => $refs.globalModal" @cancel="onChangePasswordModalClose">
      <Form ref="changePasswordFormRef" :model="changePasswordFormData" :rules="changePasswordRules" name="changePasswordForm" autocomplete="off">
        <FormItem v-if="userInfo.password" class="input-sms-code" name="oldPassword">
          <Input v-model:value="changePasswordFormData.oldPassword" placeholder="旧密码" autocomplete="false" />
        </FormItem>
        <FormItem class="input-sms-code" name="newPassword">
          <Input v-model:value="changePasswordFormData.newPassword" placeholder="新密码" autocomplete="false" />
        </FormItem>
        <FormItem class="input-sms-code" name="confirmPassword">
          <Input v-model:value="changePasswordFormData.confirmPassword" placeholder="确认密码" autocomplete="false" />
        </FormItem>
      </Form>
      <template #footer>
        <Button class="btn-blue" style="width: 100%" type="primary" :loading="false" @click="handleSubmitChangePassword">确定</Button>
      </template>
    </Modal>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
  import { Button, Input, Modal, Form, FormItem, message } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import { getUserInfo } from '/@/api/sys/user';
  import { sendSmsCodeApi, changePhonenumberApi, changePasswordApi } from '/@/api/api';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { useUserStore } from '/@/store/modules/user';
  import type { Rule } from 'ant-design-vue/es/form';

  export default defineComponent({
    name: 'Setting',
    components: { Button, Input, Modal, ExclamationCircleOutlined, Form, FormItem },
    setup() {
      const userInfo = reactive<any>({
        phonenumber: null,
        wechatNickName: null,
        password: null,
      });

      const changePhonenumberFormRef = ref<FormInstance>();
      const changePasswordFormRef = ref<FormInstance>();

      const changePhonenumberFormData = reactive<any>({
        oldPhonenumber: '',
        oldSmsCode: '',
        newPhonenumber: '',
        newSmsCode: '',
        type: 'old',
      });

      const changePasswordFormData = reactive<any>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      let changePhonenumberBtnText = computed(() => {
        if (changePhonenumberFormData.type == 'old') {
          return '下一步';
        } else {
          return '确定';
        }
      });

      const smsCountDown = ref<number>(0);
      const smsCountdownText = ref('获取验证码');

      const changePhonenumberModalVisible = ref(false);
      const bindWechatModalVisible = ref(false);
      const initPasswordModalVisible = ref(false);
      const changePasswordModalVisible = ref(false);

      const handleChangePhonenumber = function () {
        changePhonenumberModalVisible.value = true;
      };

      const handleBindWechat = function () {
        bindWechatModalVisible.value = true;
      };

      const handleUnbindWechat = function () {
        console.log(0);
      };

      const handleInitPassword = function () {
        initPasswordModalVisible.value = true;
      };

      const handleChangePassword = function () {
        changePasswordModalVisible.value = true;
      };

      const handleSubmitChangePhonenumber = function () {
        if (changePhonenumberFormData.type == 'old') {
          changePhonenumberFormData.oldPhonenumber = userInfo.phonenumber;
          changePhonenumberFormRef.value.validateFields(['oldSmsCode']).then((pass) => {
            if (pass) {
              doChangePhonenumber();
            }
          });
        } else {
          changePhonenumberFormRef.value.validateFields(['newPhonenumber', 'newSmsCode']).then((pass) => {
            if (pass) {
              doChangePhonenumber();
            }
          });
        }
      };

      const doChangePhonenumber = () => {
        changePhonenumberApi(changePhonenumberFormData).then((result) => {
          if (result.code == 200 && changePhonenumberFormData.type == 'old') {
            changePhonenumberFormData.type = 'new';
            clearCodeInterval();
          } else if (result.code == 200 && changePhonenumberFormData.type == 'new') {
            message.success('手机号修改成功');
            changePhonenumberModalVisible.value = false;
            doGetUserInfo();
          }
        });
      };

      let getCodeInterval: any = 0;

      const getSmsCode = (type) => {
        if (!smsCountDown.value) {
          if (type == 'old') {
            changePhonenumberFormData.oldPhonenumber = userInfo.phonenumber;
            doSendSmsCode(changePhonenumberFormData.oldPhonenumber);
          } else {
            changePhonenumberFormRef.value.validateFields('newPhonenumber').then((pass) => {
              debugger;
              if (pass) {
                doSendSmsCode(changePhonenumberFormData.newPhonenumber);
              }
            });
          }
        }
      };

      const doSendSmsCode = function (phonenumber) {
        sendSmsCodeApi(phonenumber);
        smsCountDown.value = 60;
        getCodeInterval = setInterval(() => {
          smsCountDown.value--;
          smsCountdownText.value = smsCountDown.value + '秒后重试';
          if (smsCountDown.value == 0) {
            clearInterval(getCodeInterval);
            smsCountdownText.value = '获取验证码';
          }
        }, 1000);
      };

      const clearCodeInterval = function () {
        clearInterval(getCodeInterval);
        smsCountDown.value = 0;
        smsCountdownText.value = '获取验证码';
      };

      const userStore = useUserStore();

      const doGetUserInfo = function () {
        getUserInfo().then((result) => {
          if (result.data) {
            userInfo.phonenumber = result.data.phonenumber || null;
            userInfo.wechatNickName = result.data.wechatInfo ? JSON.parse(result.data.wechatInfo).nickname : null;
            userInfo.password = result.data.initPassword ? '********' : null;

            userStore.setUserInfo(result.data);
          }
        });
      };

      const onChangePhonenumberModalClose = () => {
        changePhonenumberFormRef.value.resetFields();
        changePhonenumberFormData.type = 'old';
      };

      const validateOldPassword = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('旧密码不能为空');
        } else {
          return Promise.resolve();
        }
      };

      const validateNewPassword = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('新密码不能为空');
        } else if (value.length < 8) {
          return Promise.reject('新密码不能少于8个字符');
        } else {
          return Promise.resolve();
        }
      };

      const validateConfirmPassword = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('请确认新密码');
        } else if (value !== changePasswordFormData.newPassword) {
          return Promise.reject('密码不相同');
        } else {
          return Promise.resolve();
        }
      };

      const changePasswordRules: Record<string, Rule[]> = {
        oldPassword: [{ required: true, validator: validateOldPassword, trigger: 'change' }],
        newPassword: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'change' }],
      };

      const handleSubmitChangePassword = () => {
        changePasswordFormRef.value
          .validate()
          .then(() => {
            changePasswordApi(changePasswordFormData).then((result) => {
              if (result.code == 200) {
                message.success('密码修改成功');
                changePasswordModalVisible.value = false;
                doGetUserInfo();
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const onChangePasswordModalClose = () => {
        changePasswordFormRef.value.resetFields();
      };

      onMounted(() => {
        doGetUserInfo();
      });

      return {
        userInfo,
        handleChangePhonenumber,
        handleBindWechat,
        handleUnbindWechat,
        handleInitPassword,
        handleChangePassword,
        changePhonenumberModalVisible,
        bindWechatModalVisible,
        initPasswordModalVisible,
        changePasswordModalVisible,
        changePhonenumberFormData,
        getSmsCode,
        smsCountDown,
        smsCountdownText,
        handleSubmitChangePhonenumber,
        changePhonenumberBtnText,
        changePhonenumberFormRef,
        changePasswordFormRef,
        onChangePhonenumberModalClose,
        changePasswordFormData,
        changePasswordRules,
        handleSubmitChangePassword,
        onChangePasswordModalClose,
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

  .setting-items {
    margin-top: 12px;
    .setting-item {
      display: flex;
      align-items: center;
      margin: 24px 0px;

      .setting-item-label {
        width: 88px;
        font-size: 16px;
        font-weight: 500;
      }

      .setting-item-input {
        width: 512px;
        position: relative;

        input {
          background: rgba(0, 0, 0, 0.06);
          border-radius: 8px;
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          height: 56px;
        }

        button {
          position: absolute;
          right: 0px;
          top: calc(50% - 16px);
        }
      }
    }
  }

  :deep(.ant-modal-content) {
    padding: 48px;
    width: 604px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  :deep(.ant-modal-title) {
    font-size: 20px;
  }

  :deep(.ant-modal-header) {
    padding: 0px 0px 24px 0px;
  }

  :deep(.ant-modal-body) {
    padding: 38px 0px 48px 0px;
  }

  :deep(.ant-modal-footer) {
    border-top: 0px;
    padding: 0px;
  }

  .input-sms-code {
    position: relative;

    input {
      background: rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      font-family: 'PingFang SC';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      height: 56px;
    }

    button {
      position: absolute;
      right: 0px;
      top: calc(50% - 16px);
    }
  }

  .btn-blue {
    background: #0035f0;
    border-radius: 8px;
    color: white;
    font-size: 16px;
    padding: 18px 46px;
    height: auto;
  }
</style>
