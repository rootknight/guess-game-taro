import { AtProgress } from 'taro-ui';
import { Text, View } from '@tarojs/components';
import clsx from 'clsx';

export default function Countdown({ time, count, isEnd }) {
  return (
    <View className={clsx('flex px-1 py-2 flex-col justify-start gap-1')}>
      <AtProgress
        aria-label='倒计时'
        color='#64748b'
        percent={(count / time) * 100}
        isHidePercent
        className='transition-all duration-1000 ease-linear'
      />
      <Text className='text-center text-white'>
        {isEnd ? '时间到啦!' : count}
      </Text>
    </View>
  );
}
