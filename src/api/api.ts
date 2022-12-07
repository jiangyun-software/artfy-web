import { defHttp } from '/@/utils/http/axios';
import { RestResult } from '/@/api/model/baseModel';

// 获取登录二维码
export function loginTicketApi() {
  return defHttp.get<RestResult>({
    url: '/artfy/wechat/loginTicket',
  });
}

// 获取扫码结果
export function scanResultApi(params: any, controller) {
  return defHttp.get<RestResult>({
    url: '/artfy/auth/scanResult',
    params: params,
    timeout: 20000,
    signal: controller.signal,
  });
}

// 微信注册
export function wechatRegisterApi(params: any) {
  return defHttp.post<RestResult>({
    url: '/artfy/auth/wechatRegister',
    data: params,
  });
}

// 发送验证码
export function sendSmsCodeApi(phonenumber: string) {
  return defHttp.get<RestResult>({
    url: '/artfy/sms/sendCode/' + phonenumber,
  });
}

// 修改手机号
export function changePhonenumberApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/member/changePhonenumber',
    data: params,
  });
}

// 修改密码
export function changePasswordApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/member/changePassword',
    data: params,
  });
}

// 获取手机上传的key
export function getUploadKeyApi() {
  return defHttp.get<RestResult>({
    url: '/artfy/mobileUpload/getUploadKey',
  });
}

// 检查上传的key
export function checkUploadKeyApi(key) {
  return defHttp.get<RestResult>({
    url: '/artfy/mobileUpload/checkUploadKey/' + key,
  });
}

// 获取上传文件
export function getUploadFileApi(key, controller) {
  return defHttp.get<RestResult>({
    url: '/artfy/mobileUpload/getUploadFile/' + key,
    signal: controller.signal,
    timeout: 20000,
  });
}

// 设置上传文件
export function setUploadFileApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/mobileUpload/setUploadFile',
    data: params,
  });
}

// 保存子密钥
export function subKeySaveApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/apiKey',
    data: params,
  });
}

// 查询子密钥列表
export function subKeyListApi(params) {
  return defHttp.get<RestResult>({
    url: '/artfy/apiKey',
    params: params,
  });
}

// 查询子密钥详情
export function subKeyDetailsApi(id) {
  return defHttp.get<RestResult>({
    url: '/artfy/apiKey/details/' + id,
  });
}

// 查询主密钥
export function primaryKeyApi() {
  return defHttp.get<RestResult>({
    url: '/artfy/apiKey/primary',
  });
}

// 重置主密钥
export function resetPrimaryApi() {
  return defHttp.get<RestResult>({
    url: '/artfy/apiKey/resetPrimary',
  });
}

// 删除子密钥
export function subKeyDeleteApi(id) {
  return defHttp.delete<RestResult>({
    url: '/artfy/apiKey/' + id,
  });
}

// 人物抠图
export function portraitCutoutApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/cutout/portraitCutout',
    data: { data: url },
    timeout: 10000,
  });
}

// 邀请历史记录
export function invitationLogApi(params) {
  return defHttp.get<RestResult>({
    url: '/artfy/invitationLog',
    params: params,
  });
}

// 图片修复去水印
export function repairApi(data) {
  return defHttp.formData<RestResult>({
    url: '/artfy/imageProcessing/repair',
    data: data,
    timeout: 10000,
  });
}

// 获取套餐列表
export function comboApi() {
  return defHttp.get<RestResult>({
    url: '/artfy/combo/memberList',
  });
}

// 获取oss上传签名
export function getUploadSingnatureApi(product) {
  return defHttp.get<RestResult>({
    url: '/artfy/ali/getUploadSingnature',
    params: { product: product },
  });
}

// 通用抠图
export function universalCutoutApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/cutout/universalCutout',
    data: { data: url },
  });
}

// 图片上色
export function colorizeApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/imageProcessing/colorize',
    data: { data: url },
  });
}

// url转换，获取阿里云oss url
export function uploadImageByUrlApi(url) {
  return defHttp.get<RestResult>({
    url: '/artfy/ali/uploadImageByUrl',
    params: { url: url },
  });
}

// 图片超分
export function superResolutionApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/imageProcessing/superResolution',
    data: { data: url },
  });
}

// 头部抠图
export function headCutoutApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/cutout/headCutout',
    data: { data: url },
  });
}

// 物体抠图
export function commodityCutoutApi(url) {
  return defHttp.post<RestResult>({
    url: '/artfy/cutout/commodityCutout',
    data: { data: url },
  });
}

// 物体抠图
export function animeApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/artGeneration/anime',
    data: params,
  });
}

// 智能美肤
export function faceBeautyApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/imageProcessing/faceBeauty',
    data: params,
  });
}

// 视频翻译
export function translateApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/videoProcessing/translate',
    data: params,
  });
}

// 获取视频翻译结果
export function translateResultApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/videoProcessing/translateResult',
    data: params,
  });
}

// 创建订单
export function createOrderApi(params) {
  return defHttp.post<RestResult>({
    url: '/artfy/order/create',
    data: params,
  });
}

// 我的订单列表
export function myOrderListApi(params) {
  return defHttp.get<RestResult>({
    url: '/artfy/order/myOrder',
    params: params,
  });
}

// 我的点数消费记录
export function myPointLogtApi(params) {
  return defHttp.get<RestResult>({
    url: '/artfy/pointLog/myLog',
    params: params,
  });
}

// 获取订单支付二维码
export function getOrderPayQrcodeApi(orderId, payType) {
  return defHttp.get<RestResult>({
    url: '/artfy/order/payQrcode/' + orderId + '/' + payType,
  });
}

// 获取订单详情
export function getOrderDedailsApi(orderId) {
  return defHttp.get<RestResult>({
    url: '/artfy/order/' + orderId,
  });
}

// 根据字典类型查询字典数据信息
export function getDictDataByTypeApi(type) {
  return defHttp.get<RestResult>({
    url: '/artfy/dict/data/type/' + type,
  });
}

// 获取文件下载地址
export function downloadUrlApi(id) {
  return defHttp.get<RestResult>({
    url: '/artfy/objectMap/downloadUrl/' + id,
  });
}

// 佐糖抠图接口
export function cutoutApi(data) {
  return defHttp.post<RestResult>({
    url: '/artfy/cutout',
    data: data,
  });
}
