// pages/player_1/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    music:"",

  },
  //获取music
  getMusic:function(){
      wx.getStorage({
        key: 'music',
        success:res=> {
          console.log("获取music成功",res)
          this.setData({
            music:res.data
          })
          },
        fail:res=>{
          console.log("获取music失败",res)
        }
      })
  },

  //进入搜索框
  search:function(event){
    wx.navigateTo({
      url: '../search/index?flage=music'
    })
  },

  //跳转到card页面
  goMusic(res){
    console.log(res.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../player/player?flage='+res.currentTarget.dataset.id,
    })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMusic()
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