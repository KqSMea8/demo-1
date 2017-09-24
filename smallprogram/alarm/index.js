const app = getApp()

// console.log(app)
// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
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