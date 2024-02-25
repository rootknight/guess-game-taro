import { AtProgress } from 'taro-ui';
import { Text, View } from '@tarojs/components';

export default function Countdown({ time, count, isEnd }) {
  return (
    <View className='flex flex-col justify-start gap-1 w-full'>
      <AtProgress
        aria-label='倒计时'
        color='#64748b'
        percent={(count / time) * 100}
        isHidePercent
        strokeWidth={14}
        className='transition-all duration-1000 ease-linear'
      />
      <Text className='text-center text-white'>
        {isEnd ? '时间到啦!' : count}
      </Text>
    </View>
  );
}
