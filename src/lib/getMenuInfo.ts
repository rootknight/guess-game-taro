import Taro from '@tarojs/taro';

const getMenuInfo = () => {
  const { top, right, height } = Taro.getMenuButtonBoundingClientRect();
  const { statusBarHeight } = Taro.getSystemInfoSync();
  const { windowWidth } = Taro.getWindowInfo();
  const menuTop = top - (statusBarHeight || 0);
  const navBarHeight = menuTop * 2 + height;
  const menuRight = windowWidth - right;
  const safeTop = top + height + 8;

  return {
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
};

export default getMenuInfo;
