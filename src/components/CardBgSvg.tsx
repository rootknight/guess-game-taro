import { View, Image, Text } from '@tarojs/components';
import card from '@/components/card.svg'; // 你的 SVG 组件路径

export default function CardComponent({
  width,
  height,
  icon,
  title,
}: {
  width?: number;
  height?: number;
  icon?: string;
  title?: string;
}) {
  return (
    <View className='relative w-full h-full'>
      {/* 背景图 */}
      <Image src={card} className='w-full h-full' />

      {/* title */}
      <Text
        style={{
          position: 'absolute',
          bottom: '20rpx',
          left: '40rpx',
          color: 'white',
          fontSize: '40rpx',
        }}
      >
        {title}
      </Text>

      {/* image */}
      <Image
        style={{
          position: 'absolute',
          top: '60rpx',
          left: '60rpx',
          width: '96rpx',
          height: '96rpx',
        }}
        src={icon!}
      />
    </View>
  );
}
