import { Button, Text } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalAction } from 'taro-ui';
import Taro from '@tarojs/taro';

export default function QuitModal({ isOpen, setIsOpen, setIsEarlyEnd }) {
  return (
    <AtModal isOpened={isOpen}>
      <AtModalHeader>
        确定要<Text className='text-red-500'>提前结束</Text>游戏吗？
      </AtModalHeader>
      <AtModalAction>
        <Button onClick={() => setIsOpen(false)}>取消</Button>
        <Button
          onClick={() => {
            setIsOpen(false);
            setIsEarlyEnd(true);
            Taro.redirectTo({ url: '/pages/settlement/index' });
          }}
        >
          确定
        </Button>
      </AtModalAction>
    </AtModal>
  );
}
