import type { UserInfo } from '/#/store';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel } from '/@/api/sys/model/userModel';
import { doLogout, getUserInfo, loginApi, registerApi } from '/@/api/sys/user';
import { useAppStore } from '/@/store/modules/app';
import { router } from '/@/router';
import { PageEnum } from '/@/enums/pageEnum';
import { message } from 'ant-design-vue';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo {
      // if (this.userInfo == null) {
      //   // this.userInfo = this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
      //   this.userInfo = this.userInfo || <UserInfo>{};
      // }
      return this.userInfo || <UserInfo>{};
    },
    getToken(): string {
      return this.token || (router.currentRoute.value.query.authorization as string) || getAuthCache<string>(TOKEN_KEY);
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setMyUserInfo(info: any | null) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(params): Promise<GetUserInfoModel | null> {
      try {
        const result = await loginApi(params);
        // save token
        this.setToken(result.data);
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async register(params): Promise<GetUserInfoModel | null> {
      try {
        const result = await registerApi(params);
        // save token
        this.setToken(result.data);
        return this.afterLoginAction();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      message.success('登录成功');
      const appStore = useAppStore();
      appStore.setLogining(false);
      this.userInfo = userInfo;
      return userInfo;
    },
    async getUserInfoAction() {
      if (!this.getToken) return null;
      const result = await getUserInfo();
      const userInfo = result.data;
      this.setMyUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goHome = false) {
      if (this.getToken) {
        await doLogout();
      }

      this.setToken(undefined);
      this.setMyUserInfo(null);
      message.info('退出成功');

      goHome && router.push(PageEnum.BASE_HOME);

      if (router.currentRoute.value.fullPath.startsWith('/account')) {
        router.push(PageEnum.BASE_HOME);
      }
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
