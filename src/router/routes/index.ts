import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { myRoutes } from './myRoutes';
import { PageEnum } from '/@/enums/pageEnum';

const routeModuleList: AppRouteModule[] = [];

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// Basic routing without permission
export const basicRoutes = [RootRoute, ...myRoutes, REDIRECT_ROUTE, PAGE_NOT_FOUND_ROUTE];
