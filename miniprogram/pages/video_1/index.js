// miniprogram/pages/index/pages/navigationBar/navigationBar.js
let navigationBar
Page({
  data: {
    othersList:[],
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
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../video/index?id='+e.currentTarget.dataset.id,
    })
  },

  xiangqing:function(){
    wx.navigateTo({
      url: '../video/index?id='+4,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    navigationBar = this.selectComponent("#navigationBar")
    this.getVodeo()
  },

  back2home(){
    wx.navigateBack({
      delta: 1,
    })
  },
  
  onPageScroll: function (e) {
    var scrollTop = e.scrollTop
    navigationBar.setOpacity(scrollTop,200)
  },

})