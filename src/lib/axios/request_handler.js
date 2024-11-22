export const onRequestFulfilled = (request) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

export const onRequestError = (error) => {
  console.error(`[request error] : [${JSON.stringify(error)}]`);
  console.error(error.request);
  return Promise.reject(error);
};
