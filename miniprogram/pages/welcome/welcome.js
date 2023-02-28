let navigationBar
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  currentIndex:'',
  imgs:[],
  i:0
  },
  start(){
    wx.switchTab({
      url:'../index/index',
    })
},
changeSwiper: function (e) {
  this.setData({
    currentIndex: e.detail.current
  })
  if(e.detail.current==this.data.imgs.length-1){
    this.data.i+=1
    if(this.data.i==2){
      setTimeout(res=>{
        wx.setStorage({
          key:"welcome", 
          data:true,
          success:res=>{
            this.start()
          },
          fail:res=>{
            console.log('储存welcome失败',res)
          }
        })
      },1000)
    }
  }
  
},
queryDataToDB: function(){
  const db=wx.cloud.database();
  const collection=db.collection("etc");
  collection
  .doc('79550af2609299f01483dc0d4f3d14eb')
  .get()
  .then(res=>{
    this.setData({
      imgs:res.data.wecome
    })

  })

},
  wecome:function(){
    wx.setStorage({
      key:"welcome", 
      data:false,
      success:res=>{
        console.log("储存welcome成功",res)
      },
      fail:res=>{
        console.log("储存welcome失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryDataToDB()
    navigationBar = this.selectComponent("#navigationBar")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.wecome()

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

})