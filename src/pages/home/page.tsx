import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro, { useLoad } from '@tarojs/taro';
import CategoryCard from '@/components/CategoryCard';
import NavCustom from '@/components/NavCustom';
import { getCategories } from '@/lib/fetchers/data';
import { useState } from 'react';
import menuInfo from '@/lib/getMenuInfo';

export default function Index() {
  const [categories, setCategories] = useState([]);
  const { safeTop, menuRight } = menuInfo;

  useLoad(() => {
    getCategories().then((res: any) => {
      setCategories(res.data.categories);
    });
  });

  return (
    <View>
      <NavCustom>
        <View className='w-8PX opacity-80'>
          <AtButton
            className='bg-white rounded-full h-full center'
            onClick={() => Taro.redirectTo({ url: '/pages/records/page' })}
          >
            <View className='i-octicon-history-16 text-14PX text-black'></View>
          </AtButton>
        </View>
        <Text className='flex items-center text-20PX  text-black'>
          你比我猜
        </Text>
        <View className='w-8PX'></View>
      </NavCustom>
      <View
        className='h-100vh bg-gradient-to-b from-gray-200 to-white'
        style={`padding:0px ${menuRight}px`}
      >
        <View style={`height:${safeTop}px`}></View>
        <View className='grid grid-cols-2 gap-2'>
          {categories.map((item: any) => {
            return (
              <View>
                <CategoryCard
                  key={item.id}
                  type={item.type}
                  title={item.title}
                  icon={item.icon}
                  desc={item.description}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
