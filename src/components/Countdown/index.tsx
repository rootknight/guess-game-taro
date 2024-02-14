import { AtProgress } from 'taro-ui';
import { Text, View } from '@tarojs/components';

export default function Countdown({ time, count, isStartCountDown, isEnd }) {
  if (!isStartCountDown) {
    return null;
  }

  return (
    <View className='flex px-1 py-2 flex-col justify-start gap-1'>
      <AtProgress
        aria-label='倒计时'
        color='#64748b'
        percent={(count / time) * 100}
        isHidePercent
      />
      <Text className='text-center text-white'>
        {isEnd ? '时间到啦!' : count}
      </Text>
    </View>
  );
}
