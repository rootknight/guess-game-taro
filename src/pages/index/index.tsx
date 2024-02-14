import { View, Swiper, SwiperItem } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import CategoryCard from '@/components/CategoryCard';
import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className='p-2'>
      <View className='flex flex-col gap-2 w-full'>
        <Swiper
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <View>你比划我猜使用说明</View>
          </SwiperItem>
        </Swiper>
        <View className='grid grid-cols-2 gap-2'>
          {[
            '中国成语',
            '日用品',
            '动物',
            '植物',
            '中国成语',
            '日用品',
            '动物',
            '植物',
            '中国成语',
            '日用品',
            '动物',
            '植物',
            '中国成语',
            '日用品',
            '动物',
            '植物',
            '中国成语',
            '日用品',
            '动物',
            '植物',
          ].map((item) => {
            return (
              <CategoryCard
                key={item}
                type='idiom'
                title='中国成语'
                desc='中国成语'
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
