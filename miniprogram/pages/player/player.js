const util = require("../../utils/util.js");
const common = require("../../utils/common.js");
const app = getApp();
const backgroundAudioManager = app.globalData.backgroundAudioManager;

Page({
  // 公共事件
  togglePlayingCut: common.togglePlayingCut, // 列表切歌
  togglePlayingState: common.togglePlayingState, // 播放状态
  togglePlaying: function(event) { // 上一首&下一首
    app.globalData.playIndex=app.globalData.playIndex+1
    const that = this;
    let id = parseInt(event.currentTarget.dataset.id);
    common.togglePlaying.call(that,id);
  },

  // 局部事件
  dragProgressBar: function(event) { // 拖动进度条
    const position = event.detail.value;
    backgroundAudioManager.seek(position);
    this.setData({
      currentTime: util.formatTime(position * 1000), // 进度时长
      sliderValue: position, // 当前滑块值
    });
  },


  /**
   * 页面的初始数据
   */
  data: {
    singerImg:"",
    playing: {
      id: '', // 歌曲ID
      url: '', // 音乐地址
      image: null, // 图片地址
      title: '', // 歌名
      singer: '', // 歌手
    }, // 当前播放的歌曲
    playlist: [], // 播放列表
    isPlayState: false, // 播放&暂停
    currentTime: '00:00', // 进度时长
    duration: '00:00', // 总时长
    sliderValue: 0, // 当前滑块值
    sliderMax: 0, // 滑块最大值
    curLrcStartHeight: 0, // 滑动初始高度
    curLrcScrolledHeight: 0, // 滑动高度
  },
  //获取音乐
  getMusic:function(){
    wx.getStorage({
      key: 'music',
      success:res=> {
        console.log("获取music成功",res)
        app.globalData.playlist=res.data[this.data.flage].content
        app.globalData.playing.url=res.data[this.data.flage].content[0].url
        app.globalData.playing.image=res.data[this.data.flage].content[0].image
        app.globalData.playing.title=res.data[this.data.flage].content[0].title
        app.globalData.playing.singer=res.data[this.data.flage].content[0].singer
        app.globalData.playing.id=res.data[this.data.flage].content[0].id
        this.chu()
        wx.setNavigationBarTitle({
          title: res.data[this.data.flage].title
        })
        },
      fail:res=>{
        console.log("获取music失败",res)
      }
    })
  },
  searchMusic:function(id){
    wx.cloud.callFunction({
      name: 'getMusic',
      data: {
        id:id
      },
    success:res=>{
      let data=res.result.data
      console.log(data)
      app.globalData.playlist=data
      app.globalData.playing.url=data.url
      app.globalData.playing.image=data.image
      app.globalData.playing.title=data.title
      app.globalData.playing.singer=data.singer
      app.globalData.playing.id=data.id
      this.chu()
      wx.setNavigationBarTitle({
        title: app.globalData.playing.title=data.title
      })
    },
    fail:res=>{
      console.log(res)
    },
  })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if(options.id){
      this.searchMusic(options.id)
    }else{
      this.setData({  
        flage:options.flage-1,
      }) 
      this.getMusic()
    }

    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


  },
  chu:function(){
    const that = this;
    app.initAudio(that);
    backgroundAudioManager.onTimeUpdate(function() {
      that.setData({
        currentTime: util.formatTime(backgroundAudioManager.currentTime * 1000), // 进度时长
        duration: util.formatTime(backgroundAudioManager.duration * 1000), // 总时长
        sliderValue: backgroundAudioManager.currentTime, // 当前滑块值
        sliderMax: backgroundAudioManager.duration, // 滑块最大值
      });
    });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
  
    
  },




})