const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkSession:false
  },

  goLogin() {
    wx.navigateTo({
      url: '../login/index',
    })
  
  },
  getCollect_num:function(){
    let user_id=app.globalData.userData._id
    wx.cloud.callFunction({
      name: 'getCollect_num',
      data: {
        user_id:user_id,
      },
    success:res=>{
      app.globalData.userData=res.result.data[0]
      this.setData({
        userData:res.result.data[0]
      })
    }
    })
  },

  interestEvent:function(){
    wx.navigateTo({
      url: '../about/index',
    }) 
  },
  t:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../test/index',
    }) 
    else{
      app.islogon()
    }

  },

  getCourseEvent:function(){
    wx.switchTab({
      url: '../status/index',
    })
  },
  getCollectEvent:function(){
    wx.navigateTo({
      url: '../netbook/index',
    }) 
  },

  goToGuidesEvent:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../setting/index',
    }) 
    else{
      app.islogon()
    }
  },
  getTicketEvent:function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'error',
      duration: 800,
     })
  },
  getMessageEvent:function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'error',
      duration: 800,
     })
  },

  //获取单词分类列表
  card_list:function(){
      wx.getStorage({
        key: 'card_list',
        success:res=> {
          this.data.word_length=res.data.length
          this.setData({
            precent:Math.round(this.data.userData.study_Status.card_learned / this.data.word_length * 100)
          })
          this.getCollect_num()
          },
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
      current: 2,
    })
    }
    this.setData({
      checkSession:app.globalData.checkSession,
      userData:app.globalData.userData
    })
    if(this.data.checkSession){
      this.card_list()
    }
  },

})