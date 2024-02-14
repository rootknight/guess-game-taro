import { presetWeapp } from 'unocss-preset-weapp';
import {
  extractorAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer';

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(
      // 以下配置为 webpack4 平台
      // h5兼容设置，默认为 750 标准（designWidth: 750），webpack4 平台(taroWebpack: webpack4)
      // 只开发小程序可删除
      {
        isH5: process.env.TARO_ENV === 'h5',
        platform: 'taro',
        // 通过设置 taroWebpack 版本，指定 rem 策略
        // webpack4 webpack5
        taroWebpack: 'webpack5',
        designWidth: 375,
        deviceRatio: {
          375: 2 / 1,
          640: 2.34 / 2,
          750: 1,
          828: 1.81 / 2,
        },
      }
    ),
    // attributify autocomplete
    presetWeappAttributify(),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500/10',
      center: 'flex justify-center items-center',
    },
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    // taro-react 不支持 Attributify Mode ，react不支持，react不支持，react不支持
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
};
