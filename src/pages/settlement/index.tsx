import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import { AtButton } from 'taro-ui';
import SelectTime from '@/components/SelectTime/index';

export default function Index() {
  const [latestRecord, setLatestRecord] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useLoad(() => {
    // 获取数据
    const storedWordsJSON = Taro.getStorageSync('words');
    // 如果 localStorage 中没有 selectedWords 数据，则跳转到指定页面
    const storedWords = JSON.parse(storedWordsJSON || '[]');
    // 获取最新一条记录
    setLatestRecord(storedWords[0]);
  });

  const { successWords, skipWords, time, title, type } = latestRecord || {};

  return (
    <View className='h-full flex flex-col p-4 gap-4 relative'>
      <View
        className='
        w-280 h-280 rounded-full
        border-dashed border-8 border-yellow-500 bg-white shadow-lg
        flex flex-col justify-center items-center  gap-2
        absolute left-1/2 -translate-x-[140rpx] top-16
        md:w-400 md:h-400 md:top-32 md:-translate-x-[200rpx]'
      >
        <Text className='text-3xl font-bold md:text-4xl text-orange-500'>
          得分{successWords?.length || 0}
        </Text>
        <Text className=' text-sm text-gray-500 md:text-xl'>{title}</Text>
        <Text className='text-sm text-gray-500 md:text-xl'>{time}s</Text>
      </View>
      <View className='h-[calc(100vh-440rpx)] grid grid-cols-2 gap-2 text-xl mt-[240rpx]'>
        <View className='text-emerald-500 flex flex-col'>
          <Text className='py-4 bg-gray-700 rounded-t-xl text-center'>
            正确：{successWords?.length || 0}
          </Text>
          <View className='h-full flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'>
            {successWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </View>
        </View>
        <View className='text-amber-500 flex flex-col'>
          <Text className='py-4 bg-gray-700 rounded-t-xl text-center text-xl'>
            跳过：{skipWords?.length || 0}
          </Text>
          <View className='h-full line-through flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'>
            {skipWords?.map((item: any, index: any) => (
              <p key={index}>{item}</p>
            ))}
          </View>
        </View>
      </View>
      <View className='grid grid-cols-2 gap-2'>
        <AtButton
          type='secondary'
          className='w-full'
          onClick={() =>
            Taro.redirectTo({
              url: '/pages/home/index',
            })
          }
        >
          返回首页
        </AtButton>
        <AtButton
          type='primary'
          className='w-full'
          onClick={() => setIsOpen(true)}
        >
          再玩一局
        </AtButton>
        {/* <SelectTime
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={title}
          type={type}
          desc=''
        /> */}
      </View>
    </View>
  );
}
