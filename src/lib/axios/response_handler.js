import axios from "axios";

export const onResponseFulfilled = (response) => {
  return response;
};

// export const onResponseError = async (error) => {
//   if (error?.response.status === 403 || error?.response.status === 401) {
//     localStorage.removeItem("accessToken");
//   }
//   return Promise.reject(error);
// };

export const onResponseError = async (error) => {
  if (error?.response?.status === 401 || error?.response?.status === 403) {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        // Call the token refresh endpoint
        const response = await axios.post("/refreshToken", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // Store the new token in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Update the Authorization header and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Clear tokens and redirect to login if refresh fails
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }
  }

  return Promise.reject(error);
};
