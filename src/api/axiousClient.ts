import { store } from '@redux/store';
import { PATH_BASE } from '@routes/index';
import { history } from '@utils/history';
import { lsRefreshTokenAuth, lsTokenAuth } from '@utils/storage';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthApi } from './authApi';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

axiosClient.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        // Do something before request is sent

        if (config.url === '/auth/refreshToken') {
          const refreshToken = lsRefreshTokenAuth.getItem();
          config.headers!.authorization = `Bearer ${refreshToken}`;

          return config;
        }
        const token = lsTokenAuth.getItem();
        config.headers!.authorization = `Bearer ${token}`;

        return config;
    }
    // function (error) {
    //     // Do something with request error
    //     return Promise.reject(error);
    // }
);

// Interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            const { access_token, refresh_token } = await AuthApi.refreshToken();
            lsTokenAuth.setItem(access_token);
            lsRefreshTokenAuth.setItem(refresh_token);
            return axiosClient(originalRequest);
        }
        return Promise.reject(error);
    }
);
