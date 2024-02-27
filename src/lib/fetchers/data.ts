import Taro from '@tarojs/taro';

export const baseUrl = process.env.TARO_APP_API;

export const api = async (path: string, method?: any) => {
  const result = await Taro.request({
    url: `${baseUrl}${path}`,
    enableCache: true,
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
  return result;
};

export const getCategories = async () => {
  const res = await api('/getCategories');
  return res.data;
};

export const getWordsByCategory = async (category: string) => {
  const res = await api(`/getWordsByCategory?category=${category}`);
  return res.data;
};
