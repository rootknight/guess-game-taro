import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export default function Records() {
  const storedWordsJSON = Taro.getStorageSync('words');
  const storedWords = JSON.parse(storedWordsJSON || '[]');

  const records =
    storedWords.map(({ title, time, successWords, endTime }) => {
      const score = successWords ? successWords.length : 0;
      const gameTime = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
      return { title, time, score, gameTime };
    }) || [];

  return (
    <View className='flex flex-col gap-2'>
      {records.map(({ title, time, score, gameTime }) => {
        return (
          <View className='bg-white h-144 flex justify-between items-center px-4 rounded-2 shadow-sm'>
            <View className='flex flex-col'>
              <Text className='text-base'>
                {title} {time}秒
              </Text>
              <Text className='text-gray-500 text-sm'>{gameTime}</Text>
            </View>
            <View className='text-2xl'>{score} 分</View>
          </View>
        );
      })}
    </View>
  );
}
