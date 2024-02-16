import { View } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import Countdown from '@/components/Countdown/index';
import RandomWord from '@/components/RandomWord/index';
import { getWordsByCategory } from '@/lib/fetchers/data';
import { useState } from 'react';

export default function Index() {
  const [selectTime, setselectTime] = useState('60');
  useLoad((options) => {
    Taro.hideHomeButton();
    Taro.stopPullDownRefresh();
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82f6',
    });
    const { category = '', time = '60' } = options;
    setselectTime(time);
  });

  return (
    <View className='index'>
      <Countdown
        time={selectTime}
        count='30'
        isStartCountDown='true'
        isEnd='false'
      />
      <RandomWord />
    </View>
  );
}
