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
    if(event.currentTarget.dataset.id>=0){
      let id=event.currentTarget.dataset.id
      console.log(event)
      if(id<1){
        wx.navigateTo({
          url: '../du/index?id='+this.data.id,
        })
      }else{
        wx.showToast({
          title: '完成上一任务个即可解锁',
          duration: 700,
          icon: 'none',
        })
      }
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

})