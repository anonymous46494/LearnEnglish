// pages/words_index/words_index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    precent: 0,
    winWidth: 0,
    card_learned: 0,
    card_unlearn: 0,
    word_learned: 0,
    calculation:true,
  },

  //1.获取card信息
  card_list:function(){
    wx.getStorage({
      key: 'card_list',
      success:res=> {
        console.log("获取card_list成功",res)
        this.data.card_list=res.data
        this.getData()
      },
      fail:res=>{
        console.log("获取card_list失败",res)
      }
    })
  },

  //2.设置数值
  getData:function(){
    this.data.card_learned=app.globalData.userData.study_Status.card_learned
    this.data.card_unlearn=this.data.card_list.length-this.data.card_learned
    this.setData({
      card_learned:this.data.card_learned,
      card_unlearn:this.data.card_unlearn
    })
    if(this.data.calculation){
      this.count_word_learned()
    }
    this.paintCircle()
  },
  //3.计算数值
  count_word_learned:function(){
    this.data.calculation=false
    for(let i=0;i<this.data.card_learned;i++){
      this.data.word_learned=this.data.card_list[i].number+this.data.word_learned
    }
    this.setData({
      word_learned:this.data.word_learned
    })
  },

  //画圆
  paintCircle(){
    var that = this;
    var data = this.data;
    var precent = data.card_learned / (data.card_list.length) * 100
    precent = Math.round(precent)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth
        })
      }
    })
    that.setData({
      precent: precent
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {

  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        current: 0
      })
    }
    if(!app.globalData.checkSession){
      wx.showModal({
        title: '提示',
        content: '需要登录才能显示数据哦',
        success: function (res) {
          if (res.confirm) {
            app.islogon()
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      this.card_list()
    }
  },

  //开始学习入口
  clickStudy: function() {
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../card_1/index',
    })
    else{
      app.islogon()
    }

  },
})