import { CoverImage, Image, Text, View } from '@tarojs/components';

export default function RandomWord() {
  return (
    <View className='flex flex-col justify-around h-full'>
      <Text className='text-white text-xl center'>随机单词</Text>
      <View className='flex justify-between'>
        <View className='flex flex-col items-center'>
          <Text className='text-sm text-white'>跳过 0</Text>
          <Image
            className='w-[64px] h-[32px]'
            src={require('../../public/images/phoneSkip.png')}
          />
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-sm text-white'>成功 0</Text>
          <Image
            className='w-[64px] h-[32px]'
            src={require('../../public/images/phoneSuccess.png')}
          />
        </View>
      </View>
    </View>
  );
}
