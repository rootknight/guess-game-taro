import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import NavCustom from '@/components/NavCustom';
import Records from '@/components/Records';
import getMenuInfo from '@/lib/getMenuInfo';

export default function Index() {
  const { safeTop, menuRight } = getMenuInfo();

  return (
    <View>
      <NavCustom>
        <View className='w-8PX opacity-80'>
          <AtButton
            className='bg-white rounded-full h-full center'
            onClick={() => Taro.redirectTo({ url: '/pages/home/page' })}
          >
            <View className='i-octicon-home-16 text-black'></View>
          </AtButton>
        </View>
        <Text className='flex items-center text-20PX  text-black'>
          游戏记录
        </Text>
        <View className='w-8PX'></View>
      </NavCustom>
      <View
        className='h-100vh bg-gradient-to-b from-gray-200 to-white'
        style={`padding:0px ${menuRight}px`}
      >
        <View style={`height:${safeTop}px`}></View>
        <Records />
      </View>
    </View>
  );
}
