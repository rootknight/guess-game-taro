import { useState } from 'react';
import { Button, View } from '@tarojs/components';
import SelectTime from '@/components/SelectTime';
import CardBgSvg from '@/components/CardBgSvg';

export default function CategoryCard({ type, title, icon, desc }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <View className='relative w-full aspect-square'>
        <Button
          onClick={() => setIsOpen(true)}
          plain={true}
          style={`border:none`}
          className='absolute top-0 left-0 z-10 w-full aspect-square p-0'
        ></Button>
        <CardBgSvg title={title} icon={icon} />
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
