import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { AtButton } from 'taro-ui';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

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
          得分
        </Text>
        <Text className=' text-sm text-gray-500 md:text-xl'>中国成语</Text>
        <Text className='text-sm text-gray-500 md:text-xl'>130s</Text>
      </View>
      <View className='h-[calc(100vh-440rpx)] grid grid-cols-2 gap-2 text-xl mt-[240rpx]'>
        <View className='text-emerald-500 flex flex-col'>
          <Text className='py-4 bg-gray-700 rounded-t-xl text-center'>
            正确：
          </Text>
          <View className='h-full flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'></View>
        </View>
        <View className='text-amber-500 flex flex-col'>
          <Text className='py-4 bg-gray-700 rounded-t-xl text-center text-xl'>
            跳过：
          </Text>
          <View className='h-full line-through flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'></View>
        </View>
      </View>
      <View className='grid grid-cols-2 gap-2'>
        <AtButton type='secondary' className='w-full'>
          返回首页
        </AtButton>
        <AtButton type='primary' className='w-full'>
          再玩一局
        </AtButton>
      </View>
    </View>
  );
}
