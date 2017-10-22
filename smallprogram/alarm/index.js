const app = getApp()

// console.log(app)
// pages/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    timer: null, // 定时器
    // poster: 'http://p1.music.126.net/BJgUd9aD9gpougZFASRTTw==/18548761162235571.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0',
    // poster: 'http://musicdata.baidu.com/data2/pic/73a3804e1b971cbebc63d99260278136/173971/173971.jpg@s_1,w_300,h_300',
    // name: '成都',
    // name: '伤心太平洋',
    // author: '赵雷',
    // author: '任贤齐',
    src: 'http://yinyueshiting.baidu.com/data2/music/64362772/64362772.mp3?xcode=5644ad4ab28d77dce23725bcf113dbcd',
    // src: 'http://m10.music.126.net/20171001234757/79b9d71eb75367fe52bada6ce0832522/ymusic/3198/cc71/ccb0/0cb79ae167ff29be89846b699b3c4792.mp3'
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

    if (this.data.timer) {
      clearInterval(this.data.timer);
    }

    this.data.timer = setInterval(function() {
        if (self.data.time <= 0) {
          clearInterval(self.data.timer);
          self.setData({
            timer: null
          });
        }

        self.handlerTimeData();

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

  timePause: function () {
    clearInterval(this.data.timer);
    this.data.timer = null;
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