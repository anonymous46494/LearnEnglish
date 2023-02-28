const app = getApp()
Page({


  data: {
    card_list:[],
    card_learned:"",
  },


  aa:function(){
      this.data.card_learned=this.data.card_list.length+1
      this.setData({
        card_learned:this.data.card_learned
      })
      wx.showToast({
        title: '解锁完成咯',
      })

  },

  //获取单词分类列表
  card_list:function(){
  wx.getStorage({
    key: 'card_list',
    success:res=> {
      console.log("获取card_list成功",res)
      this.setData({
        card_list:res.data
      })
    },
    fail:res=>{
      console.log("获取card_list失败",res)
    }
  })
  },

  //进入搜索框
  search:function(event){
    wx.navigateTo({
      url: '../search/index?flage=card'
    })
  },

  //跳转到card页面
  goCard(res){
    console.log(res.currentTarget.dataset.id)
    if(this.data.card_learned>=res.currentTarget.dataset.id){
      wx.navigateTo({
        url: '../card/card?flage='+res.currentTarget.dataset.id,
      })
    }else{
      wx.showToast({
        title: '当前分类未解锁哦',
        icon: 'error',
        duration: 1000,
        mask:true
       })
    }
 },


  onShow: function () {
    this.setData({
      card_learned:app.globalData.userData.study_Status.card_learned
    })
  },

  onLoad: function (options) {
    this.card_list()
  },


})