import { Button, Radio, RadioGroup, Text } from '@tarojs/components';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtRadio,
} from 'taro-ui';
import Taro from '@tarojs/taro';
import { useState } from 'react';

export default function SelectTime({ isOpen, setIsOpen, title, type, desc }) {
  const [radioValue, setRadioValue] = useState('60');
  return (
    <AtModal isOpened={isOpen} className='selectTime'>
      <AtModalHeader>{title}</AtModalHeader>
      <AtModalContent>
        <Text>{desc}</Text>
        <AtRadio
          options={[
            { label: '60秒', value: '60' },
            { label: '120秒', value: '120' },
            { label: '180秒', value: '180' },
            { label: '240秒', value: '240' },
            { label: '300秒', value: '300' },
          ]}
          value={radioValue}
          onClick={(value) => {
            setRadioValue(value);
          }}
        />
      </AtModalContent>
      <AtModalAction>
        <Button
          onClick={() => {
            setIsOpen(false);
            Taro.redirectTo({
              url: `/pages/game/index?category=${type}&time=${radioValue}`,
            });
          }}
        >
          开始游戏
        </Button>
      </AtModalAction>
    </AtModal>
  );
}
