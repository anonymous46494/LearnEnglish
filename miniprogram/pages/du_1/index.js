// pages/du_1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
    //获取存储的video信息
    getVodeo:function(){
      wx.getStorage({
        key: 'video',
        success:res=> {
          console.log("获取video成功",res)
          this.setData({
            othersList:res.data,
          })
        },
        fail:res=>{
          console.log("获取video失败",res)
        }
      })
   
    },
    clickRow:function(e){
      wx.navigateTo({
        url: '../du-list/index?id='+e.currentTarget.dataset.id,
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVodeo()
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