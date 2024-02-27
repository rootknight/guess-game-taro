import { useState } from 'react';
import { Button, View, Image, Text } from '@tarojs/components';
import SelectTime from '@/components/SelectTime';
import card from '@/components/card.svg';

export default function CategoryCard({ type, title, icon, desc }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View className='relative w-full aspect-square'>
        <Button
          onClick={() => setIsOpen(true)}
          plain={true}
          style={`border:none`}
          className='w-full aspect-square p-0'
        >
          <View className='relative w-full h-full'>
            <Text className='absolute bottom-20rpx left-40rpx text-white'>
              {title}
            </Text>
            <Image
              className='absolute top-60rpx left-60rpx w-88rpx h-88rpx'
              src={icon!}
            />
            <Image src={card} className='w-full h-full' />
          </View>
        </Button>
      </View>
      <SelectTime
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        type={type}
        desc={desc}
      />
    </>
  );
}
