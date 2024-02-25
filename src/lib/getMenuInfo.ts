import Taro from '@tarojs/taro';

const { top, right, height } = Taro.getMenuButtonBoundingClientRect();
const { statusBarHeight, windowWidth } = Taro.getSystemInfoSync();
const menuTop = top - (statusBarHeight || 0);
const navBarHeight = menuTop * 2 + height;
const menuRight = windowWidth - right;
const safeTop = statusBarHeight! + navBarHeight + 8;

const menuInfo = {
  top,
  right,
  height,
  statusBarHeight,
  windowWidth,
  menuTop,
  navBarHeight,
  menuRight,
  safeTop,
};

export default menuInfo;
