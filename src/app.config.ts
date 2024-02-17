export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/game/index',
    'pages/records/index',
    'pages/settlement/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  debug: true,
  resizable: true,
  lazyCodeLoading: 'requiredComponents',
});
