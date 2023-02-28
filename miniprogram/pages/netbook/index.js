const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"",
    toggle: false,
    actions: [
      {
        name: '移除生词本',
        color: '#fff',
        fontsize: '22',
        width: 80,
        //icon: 'like.png',//此处为图片地址
        background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);'
      }
    ]
  },

  getCollect:function(){
    let user_id=app.globalData.userData._id
    wx.cloud.callFunction({
      name: 'getCollect',
      data: {
        user_id:user_id,
      },
    success:res=>{
      console.log("查询收藏单词成功",res)
      this.setData({
        word:res.result.data[0].study_Status.Collection
      })
    },
    fail:res=>{
      console.log("查询收藏单词出错",res)
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
  handlerCloseButton(e) {
    console.log(e.detail.item._id)
    setTimeout(()=>{
       this.setData({
        toggle: this.data.toggle ? false : true
      });
    },200)
    wx.showToast({
      title: '正在移出生词本',
    })
   
  },
  //跳转到card
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
    this.getCollect()
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