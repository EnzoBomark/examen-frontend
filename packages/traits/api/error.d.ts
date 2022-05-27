type ErrorFields<T> = {
  [K in keyof T]?: string;
};

type ResponseError<T = never> = {
  statusCode: number;
  error: string;
  message: string;
  attributes?: ErrorFields<T>;
};
