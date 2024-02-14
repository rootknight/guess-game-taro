import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import './index.scss';

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View>
      <Text>Hello world!</Text>
      <AtButton type='primary' size='normal'>
        按钮文案
      </AtButton>
    </View>
  );
}
