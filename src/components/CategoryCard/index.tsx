import { AtButton } from 'taro-ui';
import { useState } from 'react';
import SelectTime from '@/components/SelectTime/index';

export default function CategoryCard({ type, title, desc }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AtButton
        onClick={() => setIsOpen(true)}
        type='primary'
        className='w-full h-sm text-xl align-middle flex flex-col justify-center'
      >
        {title}
      </AtButton>
      <SelectTime isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
