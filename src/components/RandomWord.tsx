/* eslint-disable react-hooks/exhaustive-deps */
import { Image, Text, View } from '@tarojs/components';
import phoneSkip from '@/public/images/phoneSkip.png';
import phoneSuccess from '@/public/images/phoneSuccess.png';
import { useState, useEffect, useRef } from 'react';
import useCountdown from '@/hooks/useCountdown';
import Countdown from '@/components/Countdown';
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export default function RandomWord({
  type,
  title,
  words,
  count,
  time,
  isEnd,
  isEarlyEnd,
  setBgColor,
  setIsStartCountDown,
  sounds,
}) {
  const [disText, setDisText] = useState<any>('准备');
  const [isExtractedOver, setIsExtractedOver] = useState<boolean>(false);
  const [readyCount, isReadyEnd] = useCountdown(6, true);

  let extractedWord = useRef<string>('');
  let extractedWords = useRef<string[]>([]);
  let successWords = useRef<string[]>([]);
  let skipWords = useRef<string[]>([]);

  // 获取过去1小时的记录以过滤后使用
  useEffect(() => {
    const res = Taro.getStorageSync('words');
    const storedWordsJSON = res.data;
    const storedWords = JSON.parse(storedWordsJSON || '[]');
    const nowUNIX = dayjs().valueOf();
    const filteredWords = storedWords.filter(
      (item: any) => nowUNIX - item.endTime < 3600000
    );
    const last1HourWords = filteredWords.reduce((result: any[], item: any) => {
      result.push(...item.successWords, ...item.skipWords);
      return result;
    }, []);
    extractedWords.current = last1HourWords;
  }, []);

  //准备6秒
  useEffect(() => {
    if (readyCount >= 4) {
      //准备提示
      setDisText('请横向举在头顶');
    } else if (readyCount <= 3 && readyCount > 0) {
      //准备倒计时
      sounds.countDownSound.play();
      setDisText(`准备: ${readyCount}`);
    }

    //准备结束
    if (isReadyEnd) {
      sounds.countDownEndSound.play();
      Taro.vibrateShort({ type: 'heavy' }); // 重震动
      getRandomWord();
      setIsStartCountDown(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyCount, isReadyEnd]);

  // 从剩余可选词组随机抽词
  const getRandomWord = () => {
    setBgColor('bg-blue-500');
    sounds.getRandomWordSound.play();
    // 从剩余可选词组中随机抽取一个
    const remainingWords = words.filter(
      (word) => !extractedWords.current.includes(word)
    );
    if (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);
      extractedWord.current = remainingWords[randomIndex];
      setDisText(remainingWords[randomIndex]);
    } else {
      // 如果所有词都已选完，可以进行一些处理，例如重新洗牌词汇数组
      setDisText('所有词都抽完了🤣');
      setTimeout(() => {
        setIsExtractedOver(() => {
          return true;
        });
      }, 2000);
    }
  };

  const onSuccess = (word: string) => {
    // 播放成功音效
    sounds.successSound.play();
    //设置背景颜色为绿色
    setDisText('正确');
    setBgColor('bg-green-500');
    successWords.current = [...successWords.current, word];
    extractedWords.current = [...extractedWords.current, word];
  };

  const onSkip = (word: string) => {
    // 播放跳过音效
    sounds.skipSound.play();
    //设置背景颜色为红色
    setDisText('跳过');
    setBgColor('bg-rose-500');
    skipWords.current = [...skipWords.current, word];
    extractedWords.current = [...extractedWords.current, word];
  };

  const forToggle = useRef<boolean>(true);
  const resToggle = useRef<boolean>(false);
  const bacToggle = useRef<boolean>(true);

  //翻转手机动作
  const handleOrientation = (event: any) => {
    const gamma = Math.round(event.gamma);
    // 向前翻转
    if (forToggle.current && gamma >= 135 && gamma < 180) {
      Taro.vibrateShort({ type: 'heavy' }); // 震动
      onSuccess(extractedWord.current);
      forToggle.current = false;
      resToggle.current = true;
      bacToggle.current = false;
    }
    //翻转回原位
    if (resToggle.current && gamma >= 55 && gamma <= 125) {
      getRandomWord();
      forToggle.current = true;
      resToggle.current = false;
      bacToggle.current = true;
      // Taro.vibrateShort({ type: 'heavy' }); // 震动
    }
    // 向后翻转
    if (bacToggle.current && gamma > 0 && gamma <= 45) {
      Taro.vibrateShort({ type: 'heavy' }); // 震动
      onSkip(extractedWord.current);
      forToggle.current = false;
      resToggle.current = true;
      bacToggle.current = false;
    }
  };

  // 添加陀螺仪事件监听器
  useEffect(() => {
    const startDeviceMotionListening = () => {
      Taro.startDeviceMotionListening({ interval: 'game' });
      Taro.onDeviceMotionChange(handleOrientation);
    };

    if (!isEnd && isReadyEnd) {
      startDeviceMotionListening();
    }

    // 在组件卸载时停止监听陀螺仪事件
    return () => {
      Taro.stopDeviceMotionListening();
      Taro.offDeviceMotionChange(handleOrientation);
    };
  }, [isEnd, isReadyEnd, handleOrientation]);

  //结束后保存记录到LocalStorage
  useEffect(() => {
    if (isEnd || isExtractedOver || isEarlyEnd) {
      // 播放gameover音效
      sounds.countDownEndSound.play();
      //将抽取过的词存入LocalStorage
      // 获取之前的数据
      const res = Taro.getStorageSync('words');
      const storedWordsJSON = res.data;
      const parsedwords = JSON.parse(storedWordsJSON || '[]');
      // 新的数据
      const newData = {
        title: title,
        type: type,
        time: isEarlyEnd ? time - count : time,
        endTime: Date.now(),
        successWords: successWords.current,
        skipWords: skipWords.current,
      };
      // 追加新的数据
      const updatedwords = [newData, ...parsedwords];
      // 保存到localStorage中
      Taro.setStorageSync('words', JSON.stringify(updatedwords));
      //跳转至结果页
      Taro.redirectTo({
        url: '/pages/settlement/page',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnd, isEarlyEnd, isExtractedOver]);

  return (
    <View className='flex flex-col justify-between h-full'>
      <Countdown time={time} count={count} isEnd={isEnd} />
      <Text className='text-white text-xl center'>{disText}</Text>
      <View className='flex justify-between pb-8'>
        <View className='flex flex-col items-center'>
          <Text className='text-sm text-white'>
            跳过 {skipWords.current.length}
          </Text>
          <Image className='w-128PX h-64PX' src={phoneSkip} />
        </View>
        <View className='flex flex-col items-center'>
          <Text className='text-sm text-white'>
            成功 {successWords.current.length}
          </Text>
          <Image className='w-128PX h-64PX' src={phoneSuccess} />
        </View>
      </View>
    </View>
  );
}
