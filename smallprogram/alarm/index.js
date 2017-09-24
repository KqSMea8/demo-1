const app = getApp()

// console.log(app)
// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    poster: 'http://musicdata.baidu.com/data2/pic/cd8dcc4f40cbb37c7dcf0e6c151fbcc6/275347355/275347355.jpg@s_1,w_180,h_180',
    name: '成都',
    author: '赵雷',
    src: 'http://yinyueshiting.baidu.com/data2/music/82a5d9fa53a8dc3b8961d4375d5bf9f9/540728459/2748413261506258061128.mp3?xcode=e85d89e6292ffc8a6f333bb99c6701d9'
  },

  //事件处理函数
  bindViewTap: function() {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  startTime25: function (event) {
    this.startTime(25);
  },

  startTime15: function (event) {
    this.startTime(15);
  },

  startTime5: function (event) {
    this.startTime(5);
  },

  // 设置倒计时时间
  startTime: function (num) {

    if (typeof num == 'number') {
      console.log(num);
      this.setData({
        time: num * 60
      });
      this.countDownTime();
    }
    else {
      throw new Error('不是数字');
    }

  },

  countDownTime: function () {
    var self = this;

    this.interval = setInterval(function() {
        if (self.data.time <= 0) {
          clearTimeout(self.interval);
          self.interval = null;
        }

        self.handlerTimeData()

      }, 1000);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function(e) {

    // 创建闹钟声音
    this.audioCtx = wx.createAudioContext('myAudio');
  },

  // 倒计时
  handlerTimeData: function() {
    if (this.data.time <= 0) {
      this.audioPlay();
    }
    else {
      this.setData({
        time: --this.data.time
      });
    }
  },

  audioPlay: function() {
    this.audioCtx.play();
  },

  audioPause: function() {
    this.audioCtx.pause();
  },

  audio14: function() {
    this.audioCtx.seek(14);
  },

  audioStart: function() {
    this.audioCtx.seek(0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})