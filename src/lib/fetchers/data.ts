import Taro from '@tarojs/taro';

const baseUrl = 'https://localhost:3000/api';

function request(opiton) {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${baseUrl}/${opiton}`,
      data: {},
      dataType: 'json',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => resolve(res.data),
      fail: (err) => {
        // 统一处理错误
        console.error('请求失败', err);
        reject(err);
      },
    });
  });
}

export const getCategories = async () => {
  try {
    const res = await request('getCategories');
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getWordsByCategory = async (category) => {
  try {
    const res = await request(`getWordsByCategory?category=${category}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
