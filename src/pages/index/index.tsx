import { View, Swiper, SwiperItem } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import CategoryCard from '@/components/CategoryCard';
import { getCategories } from '@/lib/fetchers/data';
import { useState } from 'react';

export default function Index() {
  const [categories, setCategories] = useState([]);
  useLoad(() => {
    const fetchData = async () => {
      const result: any = await getCategories();
      const categories = result.data.categories;
      setCategories(categories);
    };

    fetchData();
  });

  console.log(categories);

  return (
    <View className='p-2'>
      <View className='flex flex-col gap-2 w-full'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
          className='bg-blue-500 rounded'
        >
          <SwiperItem>
            <View className='text-white center'>你比划我猜使用说明</View>
          </SwiperItem>
        </Swiper>
        <View className='grid grid-cols-2 gap-2'>
          {categories.map((item: any) => {
            return (
              <CategoryCard
                key={item.id}
                type={item.type}
                title={item.title}
                desc={item.description}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
