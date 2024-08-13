export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error; 
};

// 手动输入2个参数，即statusCode 和 message 两个参数，来传递error 这个结果，
