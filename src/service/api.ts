import Taro from '@tarojs/taro';

const baseUrl = process.env.TARO_APP_API;

export default {
  request(options: any, method?: any) {
    const { path } = options;
    return Taro.request({
      url: `${baseUrl}${path}`,
      method: method || 'GET',
      dataType: 'json',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        return res.data;
      },
      fail: (err) => {
        // 统一处理错误
        console.error('请求失败', err);
      },
    });
  },
  get(options: { path: string; data?: object }) {
    return this.request({
      ...options,
    });
  },
  post(options: any) {
    return this.request(
      {
        ...options,
      },
      'POST'
    );
  },
};
