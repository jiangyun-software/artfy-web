export interface BasicPageParams {
  pageNum: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface RestResult {
  code: number;
  data: any;
  msg: string;
}
