import { defHttp } from '/@/utils/http/axios';
import { RestResult } from '/@/api/model/baseModel';

enum Api {
  Login = '/artfy/auth/login',
  Logout = '/artfy/auth/logout',
  GetUserInfo = '/artfy/auth/memberInfo',
  GetPermCode = '/artfy/getPermCode',
  Register = '/artfy/auth/register',
}

/**
 * @description: user login api
 */
export function loginApi(params: any) {
  return defHttp.post<any>({
    url: Api.Login,
    data: params,
  });
}

/**
 * @description: user login api
 */
export function registerApi(params: any) {
  return defHttp.post<any>({
    url: Api.Register,
    data: params,
  });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<RestResult>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
