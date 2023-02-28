const app = getApp()
Page({
  data: {
    currentIndex: 0,
    list:[],

    imgList: [{
      title:"今日更新"
    },
    {
      title:"欢乐配音"
    },
    {
      title:"晚安故事"
    }
    ],
  },
  more_video:function(e){
    console.log(e)
    if(e.currentTarget.dataset.id=="欢乐配音"){
      wx.navigateTo({
        url: '../du_1/index',
      })
    }else{
      wx.navigateTo({
        url: '../video_1/index',
      })
    }

  },
  swape:function(){
    wx.showToast({
      title: '暂时就这些资源咯!',
      icon: 'none',
      duration: 500,
     })
  },
  changeSwiper: function (e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  
  jidanci:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../card_1/index',
    })
    else{
      app.islogon()
    }

  },
  donghua:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../video_1/index',
    })
    else{
      app.islogon()
    }

  },
  music:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../player_1/index',
    })
    else{
      app.islogon()
    }
  },

  catalog:function(){
    if(app.globalData.checkSession)
    wx.navigateTo({
      url: '../du_1/index',
    })
    else{
      app.islogon()
    }
  },

    //视频入口
  clickRow:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../video/index?id='+e.currentTarget.dataset.id,
    })
  },
  //配音入口
  clickRow1:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../du/index?id='+e.currentTarget.dataset.id,
    })
  },
  queryDataToDB: function(){
    wx.cloud.callFunction({
      name: 'getCard_1',
      data: {
        basename:'animation'
      },
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        list:res.result.data
      })
    })
    wx.cloud.callFunction({
      name: 'getCard_1',
      data: {
        basename:'animation1'
      },
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        list1:res.result.data
      })
    })
    wx.cloud.callFunction({
      name: 'getCard_1',
      data: {
        basename:'animation2'
      },
    }).then(res=>{
      console.log(res.result.data)
      this.setData({
        list2:res.result.data
      })
    })

  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryDataToDB();
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
        current: 1,
        verify:app.globalData.checkSession
      })
    }
  },

})