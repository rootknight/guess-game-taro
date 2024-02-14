import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import Countdown from '@/components/Countdown/index';
import RandomWord from '@/components/RandomWord/index';
import QuitModal from '@/components/QuitModal/index';
import useCountdown from '@/hooks/useCountdown';
import { useState, useEffect } from 'react';
import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
    Taro.hideHomeButton();
    Taro.stopPullDownRefresh();
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82f6',
    });
  });

  return (
    <View className='index'>
      <Countdown time='60' count='30' isStartCountDown='true' isEnd='false' />
      <RandomWord />
    </View>
  );
}
