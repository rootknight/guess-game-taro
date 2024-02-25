import { Button, Radio, RadioGroup, Text, View } from '@tarojs/components';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtRadio,
  AtDivider,
} from 'taro-ui';
import Taro from '@tarojs/taro';
import { useState } from 'react';

export default function SelectTime({ isOpen, setIsOpen, title, type, desc }) {
  const [radioValue, setRadioValue] = useState('60');
  return (
    <AtModal isOpened={isOpen} className='selectTime'>
      <AtModalHeader>
        <View className='flex flex-col'>
          <Text className='text-xl'>{title}</Text>
          <Text className='text-base'>{desc}</Text>
        </View>
      </AtModalHeader>
      <AtModalContent>
        <View className='flex flex-col gap-2'>
          <Text className='text-base'>请选择时间：</Text>
          <RadioGroup
            onChange={(change) => {
              setRadioValue(change.detail.value);
            }}
            className='grid grid-cols-3 gap-2'
          >
            <Radio value='60' checked>
              60秒
            </Radio>
            <Radio value='120'>120秒</Radio>
            <Radio value='180'>180秒</Radio>
            <Radio value='240'>240秒</Radio>
            <Radio value='300'>300秒</Radio>
          </RadioGroup>
        </View>
      </AtModalContent>
      <AtModalAction>
        <Button
          onClick={() => {
            setIsOpen(false);
            Taro.navigateTo({
              url: `/pages/game/page?category=${type}&time=${radioValue}`,
            });
          }}
        >
          开始游戏
        </Button>
      </AtModalAction>
    </AtModal>
  );
}
