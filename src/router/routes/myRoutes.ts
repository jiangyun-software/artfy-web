/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT, AccountLayout, ApiDocLayout } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

// test
// http:ip:port/main-out
export const myRoutes: AppRouteModule[] = [
  {
    path: '',
    name: 'Home',
    component: LAYOUT,
    redirect: 'index',
    meta: {
      title: t('jy.home.title'),
    },
    children: [
      {
        path: 'index',
        name: 'homePage',
        component: () => import('/@/views/home/Home.vue'),
        meta: {
          title: t('jy.page.home.title'),
          footer: true,
        },
      },
      {
        path: 'product/cutout/universalCutout',
        name: 'UniversalCutout',
        component: () => import('/@/views/product/cutout/UniversalCutout.vue'),
        meta: {
          title: t('jy.page.product.cutout.universalCutout.title'),
          footer: true,
        },
      },
      {
        path: 'product/cutout/portraitCutout',
        name: 'PortraitCutout',
        component: () => import('/@/views/product/cutout/PortraitCutout.vue'),
        meta: {
          title: t('jy.page.product.cutout.portraitCutout.title'),
          footer: true,
        },
      },
      {
        path: 'product/cutout/headCutout',
        name: 'HeadCutout',
        component: () => import('/@/views/product/cutout/HeadCutout.vue'),
        meta: {
          title: t('jy.page.product.cutout.headCutout.title'),
          footer: true,
        },
      },
      {
        path: 'product/cutout/commodityCutout',
        name: 'CommodityCutout',
        component: () => import('/@/views/product/cutout/CommodityCutout.vue'),
        meta: {
          title: t('jy.page.product.cutout.commodityCutout.title'),
          footer: true,
        },
      },
      {
        path: 'product/imageProcessing/colorize',
        name: 'Colorize',
        component: () => import('/@/views/product/imageProcessing/Colorize.vue'),
        meta: {
          title: t('jy.page.product.imageProcessing.colorize.title'),
          footer: true,
        },
      },
      {
        path: 'product/imageProcessing/superResolution',
        name: 'SuperResolution',
        component: () => import('/@/views/product/imageProcessing/SuperResolution.vue'),
        meta: {
          title: t('jy.page.product.imageProcessing.superResolution.title'),
          footer: true,
        },
      },
      {
        path: 'product/imageProcessing/faceBeauty',
        name: 'FaceBeauty',
        component: () => import('/@/views/product/imageProcessing/FaceBeauty.vue'),
        meta: {
          title: t('jy.page.product.imageProcessing.faceBeauty.title'),
          footer: true,
        },
      },
      {
        path: 'product/videoProcessing/videoTranslation',
        name: 'VideoTranslation',
        component: () => import('/@/views/product/videoProcessing/VideoTranslation.vue'),
        meta: {
          title: t('jy.page.product.videoProcessing.videoTranslation.title'),
          footer: true,
        },
      },
      {
        path: 'product/artGeneration/anime',
        name: 'Anime',
        component: () => import('/@/views/product/artGeneration/Anime.vue'),
        meta: {
          title: t('jy.page.product.argGeneration.anime.title'),
          footer: true,
        },
      },
      {
        path: 'product/artGeneration/keywordPainting',
        name: 'KeywordPainting',
        component: () => import('/@/views/product/artGeneration/keywordPainting/Index.vue'),
        meta: {
          title: t('jy.page.product.argGeneration.keywordPainting.title'),
          footer: true,
        },
      },
      {
        path: 'product/artGeneration/keywordPainting/collection',
        name: 'KeywordPaintingCollection',
        component: () => import('/@/views/product/artGeneration/keywordPainting/Collection.vue'),
        meta: {
          title: t('jy.page.product.argGeneration.keywordPaintingCollection.title'),
          footer: true,
        },
      },
      {
        path: 'product/imageProcessing/repairEdit',
        name: 'RepairEdit',
        component: () => import('/@/views/product/imageProcessing/RepairEdit.vue'),
        meta: {
          title: t('jy.page.product.imageProcessing.repairEdit.title'),
          footer: true,
        },
      },
      {
        path: 'case/graphicDesign',
        name: 'GraphicDesign',
        component: () => import('/@/views/case/GraphicDesign.vue'),
        meta: {
          title: t('jy.page.case.graphicDesign.title'),
          footer: true,
        },
      },
      {
        path: 'case/eCommerceDesign',
        name: 'ECommerceDesign',
        component: () => import('/@/views/case/ECommerceDesign.vue'),
        meta: {
          title: t('jy.page.case.eCommerceDesign.title'),
          footer: true,
        },
      },
      {
        path: 'case/artGeneration',
        name: 'ArtGeneration',
        component: () => import('/@/views/case/ArtGeneration.vue'),
        meta: {
          title: t('jy.page.case.eCommerceDesign.title'),
          footer: true,
        },
      },
      {
        path: 'case/videoXR',
        name: 'VideoXR',
        component: () => import('/@/views/case/VideoXR.vue'),
        meta: {
          title: t('jy.page.case.videoXR.title'),
          footer: true,
        },
      },
      {
        path: 'price',
        name: 'Price',
        component: () => import('/@/views/price/Index.vue'),
        meta: {
          title: t('jy.page.price.title'),
          footer: true,
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountLayout,
    redirect: 'account/my',
    meta: {
      title: t('jy.page.home.title'),
    },
    children: [
      {
        path: 'my',
        name: 'MyAccount',
        component: () => import('/@/views/account/My.vue'),
        meta: {
          title: t('jy.page.account.my.title'),
          footer: true,
          auth: true,
        },
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('/@/views/account/Setting.vue'),
        meta: {
          title: t('jy.page.account.setting.title'),
          footer: true,
          auth: true,
        },
      },
      {
        path: 'apiKey',
        name: 'ApiKey',
        component: () => import('/@/views/account/ApiKey.vue'),
        meta: {
          title: t('jy.page.account.apiKey.title'),
          footer: true,
          auth: true,
        },
      },
      {
        path: 'invitationCode',
        name: 'InvitationCode',
        component: () => import('/@/views/account/InvitationCode.vue'),
        meta: {
          title: t('jy.page.account.invitationCode.title'),
          footer: true,
          auth: true,
        },
      },
    ],
  },
  {
    path: '/apiDoc',
    name: 'ApiDoc',
    component: ApiDocLayout,
    redirect: 'apiDoc/cutout/universalCutoutApi',
    meta: {
      title: t('jy.page.apidoc.title'),
    },
    children: [
      {
        path: 'cutout/universalCutoutApi',
        name: 'UniversalCutoutApi',
        component: () => import('/@/views/apidoc/cutout/UniversalCutoutApi.vue'),
        meta: {
          title: t('jy.page.apidoc.cutout.universalCutout.title'),
          footer: true,
        },
      },
      {
        path: 'cutout/portraitCutoutApi',
        name: 'PortraitCutoutApi',
        component: () => import('/@/views/apidoc/cutout/PortraitCutoutApi.vue'),
        meta: {
          title: t('jy.page.apidoc.cutout.portraitCutout.title'),
          footer: true,
        },
      },
      {
        path: 'imageProcessing/repairApi',
        name: 'RepairApi',
        component: () => import('/@/views/apidoc/imageProcessing/RepairApi.vue'),
        meta: {
          title: t('jy.page.apidoc.imageProcessing.repairApi.title'),
          footer: true,
        },
      },
    ],
  },
  {
    path: '/mobileUpload',
    name: 'MobileUpload',
    component: () => import('/@/views/mobile/MobileUpload.vue'),
    meta: {
      title: t('jy.page.mobile.mobileUpload.title'),
      footer: true,
    },
  },
];

export const myRouteNames = myRoutes.map((item) => item.name);
