// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flage:"",
    click:false,
    content:"",
    result:"",
    num:1,
    
  },

  searchMusic:function(event){
    wx.cloud.callFunction({
      name: 'searchMusic',
      data: {
        title:event.detail.value
      },
    success:res=>{
      console.log(res.result.data)
      if(res.result.data.length==0){
        this.setData({
          num:-1
        })
      }else{
        this.setData({
          result:res.result.data,
          num:1
        })
      }
    },
    fail:res=>{
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
  searchMusic1:function(cont){
    this.setData({
      num:0
    })
    wx.cloud.callFunction({
      name: 'searchMusic',
      data: {
        title:cont
      },
    success:res=>{
      console.log(res.result.data)
        if(res.result.data.length==0){
          this.setData({
            num:-1
          })
        }else{
          this.setData({
            result:res.result.data,
            num:1
          })
        }
    },
    fail:res=>{
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
  searchCard:function(event){
    wx.cloud.callFunction({
      name: 'searchCard',
      data: {
        word:event.detail.value
      },
    success:res=>{
      if(res.result.data.length==0){
        this.setData({
          num:-1
        })
      }else{
        this.setData({
          result:res.result.data,
          num:1
        })
      }
    },
    fail:res=>{
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
  searchCard1:function(cont){
    this.setData({
      num:0
    })
    wx.cloud.callFunction({
      name: 'searchCard',
      data: {
        word:cont
      },
    success:res=>{
      console.log(res.result.data)
      if(res.result.data.length==0){
        this.setData({
          num:-1
        })
      }else{
        this.setData({
          result:res.result.data,
          num:1
        })
      }
      
    },
    fail:res=>{
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
  
  search:function(){
    if(this.data.content==""){
      this.setData({
        content:"",
        click:false,
      })
    }else{
      this.setData({
        click:true,
        num:1
      })
    }
  },
  //输入值时触发
  searching:function(event){
    this.setData({
      click:true,
      content:event.detail.value,
      result:""
    })
    if(event.detail.value!=""){
      if(this.data.flage=="music"){
        this.searchMusic1(event.detail.value)
      }else{
        this.searchCard1(event.detail.value)
      }
      
    }else{
      this.setData({
        result:""
      })
    }
    
  },
  searched:function(event){
    this.setData({
      click:false
    })

  },
  onToggle:function(event){
    this.setData({
      content:""
    })
  },
  goMusic:function(event){
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../player/player?id='+event.currentTarget.dataset.id,
    })
  },
  goCard:function(event){
    console.log(event.currentTarget.dataset)
    wx.navigateTo({
      url: '../card/card?id='+event.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      flage:options.flage
    })
    if(options.flage=='music'){
      wx.setNavigationBarTitle({
        title: "歌曲搜索"
      }) 
      this.setData({
        content:"wiggly woo"
      })
    }else{
      wx.setNavigationBarTitle({
        title: "单词搜索"
    }) 
    this.setData({
      content:"red"
    })
    }

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})