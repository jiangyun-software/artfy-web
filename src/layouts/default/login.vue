<template>
  <div class="login" v-show="logining">
    <div class="marsk">
      <CloseCircleOutlined class="close" @click="closeLoginPanel" />
      <div class="pop">
        <div class="loginMethodIcon">
          <img v-show="loginMethod == 'qr'" :src="loginQrIcon" @click="changeLoginMethod" />
          <img v-show="loginMethod == 'phone'" :src="loginPhoneIcon" @click="changeLoginMethod" />
        </div>
        <div class="qr" v-show="loginMethod == 'qr'">
          <div v-show="!wechatRegisterStatus">
            <div class="title">微信二维码登录</div>
            <div style="text-align: center">
              <img v-if="loginTicket" class="login-qr" :src="'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + loginTicket" alt="" />
              <LoadingOutlined v-else class="login-qr" style="display: flex; align-items: center; justify-content: center; font-size: 72px; color: grey" />
            </div>
            <div class="description">微信扫一扫登录“匠韵智能”</div>
            <div class="toRegist">
              <div
                @click="
                  loginMethod = 'phone';
                  phoneLoginType = 'password';
                  register = false;
                "
                >密码登录</div
              >
              <Divider class="driver" type="vertical" plain />
              <div
                @click="
                  register = true;
                  loginMethod = 'phone';
                "
                >账号注册</div
              >
            </div>
          </div>
          <div v-show="wechatRegisterStatus" style="height: 100%; position: relative">
            <div class="title">绑定手机号</div>
            <Form name="wechatRegisterForm" ref="wechatRegisterFormRef" :rules="loginRules" :model="wechatRegisterForm" autocomplete="on" style="margin-top: 36px">
              <a-form-item name="phonenumber">
                <a-input v-model:value="wechatRegisterForm.phonenumber" :maxlength="11" placeholder="请输入手机号" class="input" />
              </a-form-item>
              <a-form-item name="smsCode">
                <div style="position: relative">
                  <a-input v-model:value="wechatRegisterForm.smsCode" :maxlength="11" placeholder="请输入验证码" class="input" />
                  <a-button type="link" class="getCode" @click="getCode1()" :disabled="countdowning">{{ countdownText }}</a-button>
                </div>
              </a-form-item>
            </Form>
            <div class="completeAccount">请完善账号信息</div>
            <a-button block class="btn-login" @click="wechatRegister">登录</a-button>
          </div>
        </div>
        <div class="phone" v-show="loginMethod == 'phone'">
          <div class="phone-login" v-show="!register">
            <div class="tab">
              <div class="tab-item" :class="{ active: phoneLoginType == 'sms' }" @click="changePhoneLoginType('sms')">短信登录</div>
              <div class="tab-item" :class="{ active: phoneLoginType == 'password' }" @click="changePhoneLoginType('password')" style="margin-left: 54px">密码登录</div>
            </div>
            <div class="myDivider"></div>
            <Form name="loginForm" ref="loginFormRef" :rules="loginRules" :model="formState" autocomplete="on" style="margin-top: 36px">
              <a-form-item name="phonenumber">
                <a-input v-model:value="formState.phonenumber" :maxlength="11" placeholder="请输入手机号" class="input" />
              </a-form-item>
              <a-form-item name="smsCode" v-if="phoneLoginType == 'sms'">
                <div style="position: relative">
                  <a-input v-model:value="formState.smsCode" :maxlength="11" placeholder="请输入验证码" class="input" />
                  <a-button type="link" class="getCode" @click="getCode2()" :disabled="countdowning">{{ countdownText }}</a-button>
                </div>
              </a-form-item>
              <div v-if="phoneLoginType == 'password'">
                <a-form-item name="password">
                  <a-input-password v-model:value="formState.password" placeholder="密码" class="input" />
                </a-form-item>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px">
                  <a-checkbox class="remember" v-model:checked="formState.remember">记住我</a-checkbox>
                  <div class="registLink" style="display: flex; align-items: center">
                    <a-button type="link" @click="register = !register">手机号注册</a-button>
                    <div class="myVerticalDivider"></div>
                    <a-button type="link">忘记密码</a-button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div class="register" v-show="register">
            <div class="title">手机号注册</div>
            <Form ref="registerFormRef" :model="registerForm" :rules="registerRules" name="registerForm" autocomplete="off">
              <a-form-item name="phonenumber">
                <a-input v-model:value="registerForm.phonenumber" :maxlength="11" placeholder="请输入手机号" class="input" style="margin-top: 36px" />
              </a-form-item>
              <a-form-item name="smsCode" style="position: relative">
                <a-input v-model:value="registerForm.smsCode" :maxlength="11" placeholder="请输入验证码" class="input" />
                <a-button type="link" class="getCode" @click="getCode3()" :disabled="countdowning">{{ countdownText }}</a-button>
              </a-form-item>
              <a-form-item name="password">
                <a-input-password v-model:value="registerForm.password" placeholder="密码" class="input" />
              </a-form-item>
              <a-form-item name="password2">
                <a-input-password v-model:value="registerForm.password2" placeholder="密码" class="input" />
              </a-form-item>
            </Form>
            <div style="text-align: right; margin-top: 12px">
              <span>已有账号，</span>
              <a-button type="link" style="color: #0035f0; padding: 4px 0px" @click="register = !register">马上登录</a-button>
            </div>
          </div>
          <a-button v-show="!register" block class="btn-login" @click="login">登录</a-button>
          <a-button v-show="register" block class="btn-login" @click="registerUser">注册/登录</a-button>
        </div>
        <Divider class="driver-bottom" style="display: block; background-color: rgba(0, 0, 0, 0.2); height: 1px; margin-top: 80px" />
        <div class="footer">登录即表明您同意<span class="hightlight">用户协议</span>和<span class="hightlight">隐私策略</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, watch, computed } from 'vue';
  import { CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { Divider, Form, Input, Button, InputPassword, Checkbox, FormItem } from 'ant-design-vue';
  import type { FormInstance } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { useAppStore } from '/@/store/modules/app';
  import { useUserStore } from '/@/store/modules/user';
  import loginQR from '/@/assets/images/loginQR.png';
  import loginQrIcon from '/@/assets/images/loginQrIcon.png';
  import loginPhoneIcon from '/@/assets/images/loginPhoneIcon.png';
  import { loginTicketApi, scanResultApi, wechatRegisterApi, sendSmsCodeApi } from '/@/api/api';

  export default defineComponent({
    name: 'Login',
    components: {
      CloseCircleOutlined,
      LoadingOutlined,
      Divider,
      Form,
      'a-form-item': FormItem,
      'a-input-password': InputPassword,
      'a-button': Button,
      'a-input': Input,
      'a-checkbox': Checkbox,
    },
    setup() {
      const appStore = useAppStore();

      const userStore = useUserStore();

      const closeLoginPanel = () => {
        appStore.setLoginingAction(false);
      };

      let loginMethod = ref('qr');
      let phoneLoginType = ref('sms');

      const changeLoginMethod = () => {
        loginMethod.value = loginMethod.value == 'qr' ? 'phone' : 'qr';
      };

      const changePhoneLoginType = (type) => {
        phoneLoginType.value = type;
        if (type == 'sms') {
          formState.password = '';
        } else {
          formState.smsCode = '';
        }
        loginFormRef.value.clearValidate();
      };

      const closeLogin = () => {};

      const formState = reactive({
        phonenumber: '',
        password: '',
        smsCode: '',
        imgId: '',
        imgCode: '',
        remember: false,
      });

      const registerForm = reactive({
        phonenumber: '',
        password: '',
        password2: '',
        smsCode: '',
        imgId: '',
        imgCode: '',
      });

      const format = (val, preVal) => {
        if (!isNaN(+val)) {
          formState.phonenumber = val;
        } else {
          formState.phonenumber = preVal;
        }
      };

      watch(
        () => formState.phonenumber,
        (val, preVal) => {
          format(val, preVal);
        },
      );

      let register = ref(false);

      let countdownText = ref<string>('获取验证码');
      let countdowning = ref<boolean>(false);

      const getCode1 = () => {
        wechatRegisterFormRef.value.validateFields('phonenumber').then((pass) => {
          if (pass) {
            getCode(wechatRegisterForm.phonenumber);
          }
        });
      };

      const getCode2 = () => {
        loginFormRef.value.validateFields('phonenumber').then((pass) => {
          if (pass) {
            getCode(formState.phonenumber);
          }
        });
      };

      const getCode3 = () => {
        registerFormRef.value.validateFields('phonenumber').then((pass) => {
          if (pass) {
            getCode(registerForm.phonenumber);
          }
        });
      };

      const getCode = (phonenumber: string) => {
        if (!countdowning.value) {
          sendSmsCodeApi(phonenumber);
          countdowning.value = true;
          let second = 60;
          let getCodeInterval = setInterval(() => {
            second--;
            countdownText.value = second + '秒后重试';
            if (second == 0) {
              clearInterval(getCodeInterval);
              countdownText.value = '获取验证码';
              countdowning.value = false;
            }
          }, 1000);
        }
      };

      const login = () => {
        loginFormRef.value
          .validate()
          .then(() => {
            userStore.login(formState);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const registerUser = () => {
        registerFormRef.value
          .validate()
          .then(() => {
            userStore.register(registerForm);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const loginFormRef = ref<FormInstance>();

      const registerFormRef = ref<FormInstance>();

      const wechatRegisterFormRef = ref<FormInstance>();

      let validatePhone = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('手机号不能为空');
        } else if (value.length !== 11) {
          return Promise.reject('手机号不合法');
        } else {
          return Promise.resolve();
        }
      };

      let validatePass = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('密码不能为空');
        } else if (value.length < 8) {
          return Promise.reject('密码长度不能少于8位');
        } else {
          if (registerForm.password !== '') {
            registerFormRef.value.validateFields('password2');
          }
          return Promise.resolve();
        }
      };

      let validatePass2 = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('请确认密码');
        } else if (value !== registerForm.password) {
          return Promise.reject('密码不相同');
        } else {
          return Promise.resolve();
        }
      };

      let validateSmsCode = async (_rule: Rule, value: string) => {
        if (value === '') {
          return Promise.reject('验证码不能为空');
        } else {
          return Promise.resolve();
        }
      };

      const loginRules: Record<string, Rule[]> = {
        phonenumber: [{ validator: validatePhone, trigger: 'submit' }],
        password: [{ required: true, validator: validatePass, trigger: 'submit' }],
        smsCode: [{ required: true, validator: validateSmsCode, trigger: 'submit' }],
      };

      const registerRules: Record<string, Rule[]> = {
        phonenumber: [{ validator: validatePhone, trigger: 'submit' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        password2: [{ validator: validatePass2, trigger: 'change' }],
        smsCode: [{ required: true, validator: validateSmsCode, trigger: 'submit' }],
      };

      let wechatRegisterStatus = ref(false);

      const wechatRegisterForm = reactive({
        phonenumber: '',
        smsCode: '',
        ticket: '',
      });

      let controller: any = null;
      const loginTicket = ref('');
      const getLoginTicket = async () => {
        const result0 = await loginTicketApi();
        loginTicket.value = result0.data;
        wechatRegisterForm.ticket = result0.data;

        let times = 20;
        controller = new AbortController();
        while (times > 0) {
          console.log(times);
          const result = await scanResultApi({ ticket: result0.data }, controller);
          if (result.data.status == 'expired') {
            // 二维码已过期
          } else if (result.data.status == 'unRegister') {
            // 微信未注册
            wechatRegisterStatus.value = true;
          } else if (result.data.status == 'success') {
            userStore.setToken(result.data.token);
            userStore.afterLoginAction();
            closeLoginPanel();
            times = 0;
          }
          times--;
        }
      };

      const wechatRegister = () => {
        wechatRegisterApi(wechatRegisterForm).then((result) => {
          userStore.setToken(result.data);
          userStore.afterLoginAction();
          closeLoginPanel();
        });
      };

      let logining = computed(() => appStore.getLogining);

      watch(
        () => appStore.getLogining,
        (val) => {
          if (val) {
            registerFormRef.value.resetFields();
            loginFormRef.value.resetFields();
            wechatRegisterFormRef.value.resetFields();
            wechatRegisterStatus.value = false;
            loginMethod.value = 'qr';
            phoneLoginType.value = 'sms';

            getLoginTicket();
          } else if (controller) {
            controller.abort();
          }
        },
      );

      return {
        loginMethod,
        changeLoginMethod,
        loginQR,
        loginQrIcon,
        loginPhoneIcon,
        closeLogin,
        changePhoneLoginType,
        phoneLoginType,
        formState,
        register,
        countdownText,
        countdowning,
        getCode,
        getCode1,
        getCode2,
        getCode3,
        login,
        loginFormRef,
        registerForm,
        registerFormRef,
        registerUser,
        registerRules,
        loginRules,
        validateSmsCode,
        closeLoginPanel,
        wechatRegisterStatus,
        wechatRegisterForm,
        logining,
        wechatRegisterFormRef,
        wechatRegister,
        loginTicket,
      };
    },
  });
</script>
<style lang="less" scoped>
  .login {
    .marsk {
      position: absolute;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.5);
      height: 100vh;
      width: 100vw;
      z-index: 1000;

      .close {
        position: absolute;
        top: calc(50% - 382px);
        left: calc(50% + 312px);
        color: #dbd6d6;
        font-size: 36px;
        cursor: pointer;
      }

      .pop {
        width: 604px;
        height: 746px;
        position: absolute;
        top: calc(50% - 382px);
        left: calc(50% - 302px);
        background-color: white;
        opacity: 1;
        border-radius: 6px;
        padding: 48px;

        .title {
          font-family: 'PingFang SC';
          font-size: 20px;
          font-weight: 500;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .login-qr {
          width: 248px;
          height: 248px;
          margin: 80px auto 24px auto;
        }

        .description {
          font-family: 'OPPOSans';
          font-weight: 400;
          font-size: 16px;
          opacity: 0.7;
          text-align: center;
        }

        .toRegist {
          display: flex;
          justify-content: center;
          margin-top: 72px;
          font-size: 16px;
          font-weight: 400;
          color: #0035f0;
          align-items: center;

          .driver {
            margin: 0px 20px;
            background-color: rgba(0, 0, 0, 0.5);
            align-items: center;
          }

          > div {
            cursor: pointer;
          }

          .driver-bottom {
            display: block;
            background-color: rgba(0, 0, 0, 0.2);
            height: 1px;
          }
        }

        .qr,
        .phone {
          height: 532px;
        }

        .phone {
          position: relative;
          .tab {
            font-size: 20px;
            font-weight: 500;
            font-family: 'PingFang SC';
            display: inline-flex;

            .tab-item {
              padding-bottom: 24px;
              cursor: pointer;
            }

            .active {
              color: #0035f0;
              border-bottom: 1px solid #0035f0;
            }
          }
        }
      }
    }
  }

  .myDivider {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: -1px;
  }

  .myVerticalDivider {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    display: inline-block;
    height: 16px;
  }

  .footer {
    margin-top: 24px;
    opacity: 0.7;
    text-align: center;
  }

  .hightlight {
    color: #0035f0;
  }

  .loginMethodIcon {
    img {
      position: absolute;
      top: 24px;
      right: 20px;
      cursor: pointer;
    }
  }

  .input {
    height: 56px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 8px;

    :deep(.ant-input) {
      background: rgba(0, 0, 0, 0);
    }
  }

  .getCode {
    position: absolute;
    top: 14px;
    right: 6px;
    color: #0035f0;
    z-index: 1;
  }

  .getCode[disabled] {
    color: rgba(0, 0, 0, 0.5);
  }

  :deep(.remember .ant-checkbox-checked .ant-checkbox-inner) {
    background-color: #0035f0;
  }

  :deep(.registLink .ant-btn-link) {
    color: #0035f0;
  }

  .btn-login {
    height: 56px;
    background-color: #0035f0;
    color: white;
    position: absolute;
    bottom: 0px;
    border-radius: 8px;
  }

  .completeAccount {
    font-size: 16px;
    text-align: center;
    color: blue;
    margin-top: 50px;
  }
</style>
