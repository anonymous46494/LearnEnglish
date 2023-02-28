// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //视频详情
    id:'',
    data:{},
    catalogTile: [{caption:'选集'},{caption:'课程简介'},{caption:'声明'}],
    current:0,
    url:'',
    title:'',
    episode:'',
  },
  clickRow1:function(event){
    if(event.target.dataset.content){
      console.log(event.target.dataset.content)
      this.setData({
        url: event.target.dataset.content.video,
        title:event.target.dataset.content.title,
        episode:event.target.dataset.content.episode,
      });
    }else{
      console.log("正在加载中,稍后再试")
    }

  },
  changeMenuEvent: function (e) {
    const index = e.currentTarget.dataset.index
    if(1) {
        this.setData({
            current: index,
        })
    }else {
        this.setData({ current: index })
        this.__getCatalogList(true)
    }
},

  //获取存储的video信息
  getVodeo:function(){
    wx.getStorage({
      key: 'video',
      success:res=> {
        console.log("获取video成功",res)
        this.setData({
          data:res.data[this.data.id],
          url:res.data[this.data.id].episode.episode_1.video,
          title:res.data[this.data.id].episode.episode_1.title,
          episode:res.data[this.data.id].episode.episode_1.episode
        })
      },
      fail:res=>{
        console.log("获取video失败",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({  
      id:options.id
    })
    this.getVodeo()
  },

  
  peiying:function(){
    wx.navigateTo({
      url: '../du/index',
    })

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