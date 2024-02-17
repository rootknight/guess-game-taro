import { View } from '@tarojs/components';
import Taro, { useLoad, useRouter } from '@tarojs/taro';
import Countdown from '@/components/Countdown/index';
import RandomWord from '@/components/RandomWord/index';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useCountdown from '@/hooks/useCountdown';

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

  useLoad((options) => {
    // 保持屏幕常亮
    Taro.setKeepScreenOn({
      keepScreenOn: true,
    });
    Taro.setScreenBrightness({ value: 1 });
    Taro.hideHomeButton();
    Taro.stopPullDownRefresh();
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3b82f6',
    });
    const { category = '' } = options;
    setType(() => category);
    Taro.request({
      url: `${process.env.TARO_APP_API}/getWordsByCategory?category=${category}`,
      dataType: 'json',
      header: {
        'content-type': 'application/json',
      },
      success: (res) => {
        const { data } = res.data;
        const resault = data.words || [];
        setCategoryTitle(() => resault[0]?.categoryTitle);
        setWords(() => resault.map((item: any) => item.word));
      },
      fail: (err) => {
        console.error('请求失败', err);
      },
    });
  });

  useEffect(() => {
    let navBgColor = '#3b82f6';
    if (bgColor === 'bg-blue-500') {
      navBgColor = '#3b82f6';
    } else if (bgColor === 'bg-red-500') {
      navBgColor = '#ef4444';
    } else if (bgColor === 'bg-rose-500') {
      navBgColor = '#f43f5e';
    } else if (bgColor === 'bg-green-500') {
      navBgColor = '#22c55e';
    }
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: navBgColor,
    });
  }, [bgColor]);

  return (
    <View
      className={clsx(
        'h-100vh flex flex-col justify-between px-4 bg-blue-500',
        bgColor
      )}
    >
      <Countdown time={time} count={count} isEnd={isEnd} />
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
      />
    </View>
  );
}
