import { Button, Radio, RadioGroup, Text, View } from '@tarojs/components';
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui';
import Taro from '@tarojs/taro';
import { useState } from 'react';

export default function SelectTime({ isOpen, setIsOpen, title, type, desc }) {
  const [radioValue, setRadioValue] = useState('60');
  return (
    <AtModal isOpened={isOpen} className='selectTime'>
      <AtModalContent>
        <View className='flex flex-col justify-around items-start gap-4'>
          <Text className='text-xl'>{title}</Text>
          <Text className='text-base'>{desc}</Text>
          <RadioGroup
            onChange={(change) => {
              setRadioValue(change.detail.value);
            }}
            className='grid grid-cols-3 gap-4'
          >
            <Radio value='60' checked color='#6190E8'>
              60秒
            </Radio>
            {['120', '180', '240', '300', '360'].map((v) => {
              return (
                <Radio value={v} color='#6190E8'>
                  {v}秒
                </Radio>
              );
            })}
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
