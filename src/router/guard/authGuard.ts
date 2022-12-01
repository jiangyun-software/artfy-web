import type { Router } from 'vue-router';
import { useAppStore } from '/@/store/modules/app';
import { useUserStore } from '/@/store/modules/user';
import { PageEnum } from '/@/enums/pageEnum';
import { removeTabChangeListener } from '/@/logics/mitt/routeChange';

export function createAuthGuard(router: Router) {
  router.afterEach(async (to) => {
    if (to.path === PageEnum.BASE_LOGIN) {
      const userStore = useUserStore();
      const appStore = useAppStore();
      appStore.resetAllState();
      userStore.resetState();
      removeTabChangeListener();
    }

    const userStore = useUserStore();
    if (userStore.getUserInfo.phonenumber == undefined) {
      await userStore.getUserInfoAction();
      if (to.meta.auth && userStore.getUserInfo.phonenumber == undefined) {
        const appStore = useAppStore();
        appStore.setLoginingAction(true);
      }
    }
  });
}
