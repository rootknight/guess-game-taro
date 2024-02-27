import { View } from '@tarojs/components';
import { usePageScroll } from '@tarojs/taro';
import { useState } from 'react';
import getMenuInfo from '@/lib/getMenuInfo';

const NavCustom = ({ children }: { children: React.ReactNode }) => {
  const [bgColor, setBgColor] = useState('bg-transparent');
  const { height, navBarHeight, statusBarHeight, menuRight } = getMenuInfo();

  usePageScroll((res) => {
    if (res.scrollTop >= 4) {
      setBgColor('bg-white shadow-lg');
    } else if (res.scrollTop === 0) {
      setBgColor('bg-transparent');
    }
  });

  return (
    <View className={`z-50 fixed w-full ${bgColor}`}>
      {/* 状态栏 */}
      <View className='w-full' style={`height:${statusBarHeight}px`}></View>
      {/* 导航栏 */}
      <View
        className='w-full flex flex-col justify-center'
        style={`height:${navBarHeight}px`}
      >
        <View
          className='flex justify-between'
          style={`height:${height}px;padding:0 ${menuRight}px`}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

export default NavCustom;
