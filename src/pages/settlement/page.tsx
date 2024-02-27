import { View, Text } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { useState } from 'react';
import { AtButton } from 'taro-ui';
import SelectTime from '@/components/SelectTime';
import NavCustom from '@/components/NavCustom';
import getMenuInfo from '@/lib/getMenuInfo';

export default function Index() {
  const [latestRecord, setLatestRecord] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { safeTop, menuRight } = getMenuInfo();

  useLoad(() => {
    Taro.hideHomeButton();
    // 获取数据
    const storedWordsJSON = Taro.getStorageSync('words');
    // 如果 localStorage 中没有 selectedWords 数据，则跳转到指定页面
    const storedWords = JSON.parse(storedWordsJSON || '[]');
    // 获取最新一条记录
    setLatestRecord(storedWords[0]);
  });

  const { successWords, skipWords, time, title, type } = latestRecord || {};

  return (
    <View>
      <NavCustom>
        <View></View>
        <Text className='flex items-center text-20PX  text-black'>
          游戏结束
        </Text>
        <View></View>
      </NavCustom>
      <View
        className='h-full flex flex-col gap-2 bg-gradient-to-b from-gray-200 to-white h-100vh'
        style={`padding:0 ${menuRight}px`}
      >
        <View className='center'>
          <View
            className='
            w-280 h-280 rounded-full
            border-dashed border-8 border-yellow-500 bg-white shadow-lg
            flex flex-col justify-center items-center  gap-2
            fixed'
            style={`top:${safeTop}px;`}
          >
            <Text className='text-3xl font-bold md:text-4xl text-orange-500'>
              得分{successWords?.length || 0}
            </Text>
            <Text className=' text-sm text-gray-500 md:text-xl'>{title}</Text>
            <Text className='text-sm text-gray-500 md:text-xl'>
              {time || 0}s
            </Text>
          </View>
          {/* 占位 */}
          <View style={`height:calc(${safeTop}px + 260rpx)`}></View>
        </View>
        <View className='grid grid-cols-2 gap-2 text-xl'>
          <View className='text-emerald-500 flex flex-col'>
            <Text className='py-4 bg-gray-700 rounded-t-xl text-center'>
              正确：{successWords?.length || 0}
            </Text>
            <View
              className='flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'
              style={`height:calc(100vh - ${safeTop}px - 600rpx)`}
            >
              {successWords?.map((item: any, index: any) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
          <View className='text-amber-500 flex flex-col'>
            <Text className='py-4 bg-gray-700 rounded-t-xl text-center text-xl'>
              跳过：{skipWords?.length || 0}
            </Text>
            <View
              className='line-through flex flex-col items-center overflow-y-auto p-4 rounded-b-xl bg-gray-500'
              style={`height:calc(100vh - ${safeTop}px - 600rpx)`}
            >
              {skipWords?.map((item: any, index: any) => (
                <Text key={index}>{item}</Text>
              ))}
            </View>
          </View>
        </View>
        <View className='h-92 grid grid-cols-2 gap-2'>
          <AtButton
            type='secondary'
            className='w-full'
            onClick={() =>
              Taro.redirectTo({
                url: '/pages/home/page',
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
          <SelectTime
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={`再玩一局 ${title}`}
            type={type}
            desc=''
          />
        </View>
      </View>
    </View>
  );
}
