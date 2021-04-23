export namespace UserAO {
  export interface SignupReq {
    userName: string;
  }
  export interface SignupRes {
    id: number;
    userName: string;
  }
  export interface GetAllReq {}
  export interface GetAllRes {
    [key: string]: any;
  }
}

export interface TestA1 {}
