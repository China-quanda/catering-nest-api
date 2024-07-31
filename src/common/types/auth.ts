export type ResType = {
  openid: string;
  session_key: string;
  unionid?: string;
  errcode?: number;
  errmsg?: string;
}

export type GetOpenidRes = {
  openid: string;
  session_key: string;
  unionid?: string;
}
