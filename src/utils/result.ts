export class BaseOkResult<T> {
  data: T;
  code: number;
  message: string;
}

export class BaseListResult<T> {
  list: T;
  pagination: {
    pageNum: number;
    pageSize: number;
    total: number;
  };
}

export class ResultList<T> extends BaseListResult<T> {}

// export class ResultOk<T> extends BaseOkResult<BaseListResult<T>> {}

export interface IResult<T = any> {
  data?: T;
  code?: number;
  message?: string;
}

export const Result = {
  success<T>(option: IResult<T> = {}): IResult<T> {
    const { data = null, code = 0, message = 'success' } = option;
    return {
      code,
      data,
      message,
    };
  },
  error<T>(option: IResult<T> = {}): IResult<T> {
    const { data = null, code = 1, message = 'error' } = option;
    return {
      code,
      data,
      message,
    };
  },
};
