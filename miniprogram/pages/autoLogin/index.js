const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //自动登录
  autoLogin:function(){
    wx.login({
      success:res=>{
        wx.cloud.callFunction({
          name: 'autoLogin',
          data: {
            openid:app.globalData.openid
          },
        }).then(res=>{
          console.log(res)
          if(res.result.data==''){
            wx.showToast({
              title: '登录失败咯!',
              icon: 'error',
              duration: 900,
              mask:true
            })
            setTimeout(res=>{
              wx.navigateTo({
                url: '../login/index',
              })
            },1000)
          }else{
            app.globalData.checkSession=true,
            app.globalData.userData=res.result.data[0]
            console.log("自动登录成功",res)
            this.upDate()
            wx.switchTab({
              url: '../index/index',
            })
          }
        })
      }
    })
  },

  //更新登录时间
  upDate:function(){
    console.log(app.globalData.userData._id)
    var d = new Date();
    wx.cloud.callFunction({
      name: 'upData',
      data: {
        id:app.globalData.userData._id,
        time:d
      },
      success:res=>{
        console.log("更新登录时间成功",res)
      },
      fail:res=>{
        console.log("更新登录时间失败",res)
      },
    })
  
     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var animation = wx.createAnimation({
      duration: 400,
    })

    //描述动画步骤
    animation.top(-500).scale(0.8).step()

    //导出动画数据传递给组件的animation属性,否则动画不会执行
    this.setData({
      animationData: animation.export()
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getStorage({
      key: 'openid',
      success:res=> {
          app.globalData.openid=res.data
          console.log(app.globalData.openid)
          this.autoLogin()

      },
    })
    app.getVideo()
    app.getCard_1()
    app.getMusic()
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