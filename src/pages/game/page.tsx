import { View, Text, Button } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import Taro, { useDidHide, useLoad, useRouter } from '@tarojs/taro';
import { getWordsByCategory } from '@/lib/fetchers/data';
import RandomWord from '@/components/RandomWord';
import QuitModal from '@/components/QuitModal';
import NavCustom from '@/components/NavCustom';
import { useEffect, useState } from 'react';
import useCountdown from '@/hooks/useCountdown';
import countdown from '@/public/sounds/countdown.mp3';
import countdownEnd from '@/public/sounds/countdownEnd.mp3';
import getRandomWord from '@/public/sounds/getRandomWord.mp3';
import skip from '@/public/sounds/skip.mp3';
import success from '@/public/sounds/success.mp3';
import menuInfo from '@/lib/getMenuInfo';

export default function Index() {
  const router = useRouter();
  const { time } = router.params;
  const [bgColor, setBgColor] = useState('#3b82f6');
  const [words, setWords] = useState([]);
  const [type, setType] = useState();
  const [categoryTitle, setCategoryTitle] = useState();
  const [isStartCountDown, setIsStartCountDown] = useState(false);
  const [count, isEnd] = useCountdown(time, isStartCountDown);
  const [isEarlyEnd, setIsEarlyEnd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sounds, setSounds] = useState<any>({});
  const { safeTop, menuRight } = menuInfo;

  useLoad((options) => {
    // 保持屏幕常亮
    Taro.setKeepScreenOn({
      keepScreenOn: true,
    });
    Taro.setScreenBrightness({ value: 1 });
    Taro.hideHomeButton();
    Taro.stopPullDownRefresh();

    const countDownSound = Taro.createInnerAudioContext();
    countDownSound.src = countdown;
    const countDownEndSound = Taro.createInnerAudioContext();
    countDownEndSound.src = countdownEnd;
    const getRandomWordSound = Taro.createInnerAudioContext();
    getRandomWordSound.src = getRandomWord;
    const successSound = Taro.createInnerAudioContext();
    successSound.src = success;
    const skipSound = Taro.createInnerAudioContext();
    skipSound.src = skip;
    setSounds({
      countDownSound,
      countDownEndSound,
      getRandomWordSound,
      successSound,
      skipSound,
    });

    const { category = '' } = options;
    setType(() => category);
    getWordsByCategory(category).then((res) => {
      const resault = res.data.words || [];
      setCategoryTitle(() => resault[0]?.categoryTitle);
      setWords(() => resault.map((item: any) => item.word));
    });
  });

  useDidHide(() => {
    Taro.setKeepScreenOn({
      keepScreenOn: false,
    });
    Taro.setScreenBrightness({ value: 0.5 });
  });

  //最后10秒倒计时
  useEffect(() => {
    if (count <= 10) {
      sounds.countDownSound.play();
      // Taro.vibrateShort({ type: 'heavy' }); // 震动
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <View>
      <NavCustom>
        <View className='w-8 opacity-60'>
          <AtButton
            className='bg-white rounded-full h-full center'
            onClick={() => setIsOpen(true)}
          >
            <View className='i-octicon-x text-14PX text-black'></View>
          </AtButton>
        </View>
        <QuitModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setIsEarlyEnd={setIsEarlyEnd}
        />
      </NavCustom>
      <View
        className={`h-100vh bg-blue-500 relative ${bgColor}`}
        style={`padding:${safeTop}px ${menuRight}px`}
      >
        <RandomWord
          type={type}
          title={categoryTitle}
          words={words}
          count={count}
          time={time}
          isEnd={isEnd}
          isEarlyEnd={isEarlyEnd}
          setBgColor={setBgColor}
          setIsStartCountDown={setIsStartCountDown}
          sounds={sounds}
        />
      </View>
    </View>
  );
}
