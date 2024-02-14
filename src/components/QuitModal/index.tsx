import { Button, Text, Radio, RadioGroup } from '@tarojs/components';
import {
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtRadio,
  AtFab,
} from 'taro-ui';
import { useState } from 'react';
import Taro from '@tarojs/taro';

export default function QuitModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AtFab>
        <Text className='at-fab__icon at-icon at-icon-menu'>测试</Text>
      </AtFab>
      <AtModal isOpened={isOpen} className='selectTime'>
        <AtModalHeader>中国成语</AtModalHeader>
        <AtModalContent>
          <AtRadio
            options={[
              { label: '60秒', value: '60' },
              { label: '120秒', value: '120' },
              { label: '180秒', value: '180' },
              { label: '240秒', value: '240' },
              { label: '300秒', value: '300' },
            ]}
            value='60'
            onClick={() => {}}
          />
        </AtModalContent>
        <AtModalAction>
          <Button
            onClick={() => {
              setIsOpen(false);
              Taro.redirectTo({ url: '/pages/game/index' });
            }}
          >
            开始游戏
          </Button>
        </AtModalAction>
      </AtModal>
    </>
  );
}
