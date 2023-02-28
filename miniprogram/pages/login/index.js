const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    step: 'one',
    click:false,
    power:false
  },

  //登录
  Login:function(){
    if(!this.data.click){
      this.data.click=true
      this.setData({
        click:this.data.click
       })
      this.getUserInfo()
    }
    this.isShouquan()

  },

  //1.弹窗获取用户信息
  getUserInfo(){
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success:(res) => {
        app.globalData.userInfo=res.userInfo
        this.exits()
      },
      fail:()=>{
        wx.showToast({
          title: '已取消登录',
          icon: 'error',
          duration: 800,
          mask:true
         })
         this.data.click=false
         this.setData({
          click:this.data.click
         })
      }
    })

  },

  //2.判断用户是否存在
  exits: function(){
    app.getCard_1()
    app.getVideo()
    app.getMusic()
    wx.login({
      success:res=>{
        wx.cloud.callFunction({
          name: 'autoLogin',
          data: {
            openid:app.globalData.openid
          },
        }).then(res=>{
          console.log('查询用户成功:',res)
          if(res.result.data==''){
            wx.showToast({
              title: '欢迎新用户体验!',
              icon: 'success',
              duration: 800,
              mask:true
             })
             setTimeout(res=>{
              this.data.click=false
              this.setData({
               click:this.data.click
              })
              this.writeUser()
            },800)
          }else{
          app.globalData.checkSession=true
          app.globalData.userData=res.result.data[0]
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 800,
            mask:true
           }).then(res=>{
            if(!app.globalData.power){
              this.data.step="two"
            }else{
              wx.navigateBack({
                delta: 0,
              })
            }
            this.data.click=false
            this.setData({
              step:this.data.step,
              click:this.data.click
           })
            this.upDate()
         })
          }
        })

      },
      fail:res=>{
        console.log(res)
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

  //2.2 写入用户信息
  writeUser: function(){
    console.log(app.globalData.openid)
    const db=wx.cloud.database();
    const collection=db.collection("userData");
    collection.add({
      data: {
        openid:app.globalData.openid,
        userInfo:{
          nickName:app.globalData.userInfo.nickName,
          gender:app.globalData.userInfo.gender,
          language:app.globalData.userInfo.language,
          city:app.globalData.userInfo.city,
          province:app.globalData.userInfo.province,
          country:app.globalData.userInfo.country,
          avatarUrl:app.globalData.userInfo.avatarUrl,
        },
        register_Date:new Date(new Date),
        login_Date:new Date(new Date),
        backgroundUrl:'https://img2.baidu.com/it/u=3909934192,3347022419&fm=26&fmt=auto&gp=0.jpg',
        study_Status:{
        card_learned:2,
        }
      },
      success:res=>{
        console.log('新用户写入数据库成功:',res)
        this.getUserInfo1()
      },
      fali:res=>{
        console.log('新用户写入数据库失败:',res)
        app.globalData.checkSession=false
      }
    })
  },

  //3.1 注册后的获取用户信息
  getUserInfo1:function(){
    wx.cloud.callFunction({
      name: 'autoLogin',
      data: {
        openid:app.globalData.openid
      },
    }).then(res=>{
      console.log('注册后查询用户成功:',res)
      app.globalData.userData=res.result.data[0]
      app.globalData.checkSession=true
      wx.showToast({
        title: '登陆成功',
        icon: 'success',
        duration: 800,
        mask:true
       }).then(res=>{
        if(!app.globalData.power){
          this.data.step="two"
        }else{
          wx.navigateBack({
            delta: 0,
          })
        }
        this.setData({
          step:this.data.step
       })

     })
      
    })
  },
  
  //麦克风授权
  doSomeThingsNeedRecord() {
    this.setData({
      click:true
     })
    var that = this
    wx.authorize({
      scope: 'scope.record',
      success() {
        console.log("录音授权成功");
        wx.showToast({
          title: '麦克风已授权',
          icon: 'success',
          duration: 800,
          mask:true
         })
         setTimeout(res=>{
          wx.navigateBack({
            delta: 0,
          })
        },800)
      },
      fail() {
        console.log("第一次录音授权失败");
        wx.showModal({
          title: '提示',
          content: '您未授权录音，功能将无法使用',
          showCancel: true,
          confirmText: "授权",
          confirmColor: "#52a2d8",
          success: function(res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (!res.authSetting['scope.record']) {
                    //未设置录音授权
                    console.log("未设置录音授权");
                    that.doSomeThingsNeedRecord()
                  } else {
                    console.log("设置录音授权成功");
                    wx.showToast({
                      title: '麦克风已授权',
                      icon: 'success',
                      duration: 800,
                      mask:true
                     })
                     setTimeout(res=>{
                      wx.navigateBack({
                        delta: 0,
                      })
                    },800)
                  }
                },
                fail: function() {
                  console.log("授权设置录音失败");
                }
              })
            } else if (res.cancel) {
              console.log("cancel");
              wx.showToast({
                title: '后续也可再次进行授权',
                icon: 'none',
                duration: 800,
               })
               setTimeout(res=>{
                wx.navigateBack({
                  delta: 0,
                })
              },800)
            }
          },
          fail: function() {
            console.log("openfail");
          }
        })
      
      }
    })
  
  },
  //判读是否授权
  isShouquan:function(){
    wx.getSetting({
    success (res){
      if(res.authSetting["scope.record"]){
        app.globalData.power=true
        console.log("已经获权限")
      }else{
        console.log("暂未获权限")
      }
    }
  })
 
  },
  
  //取消授权
  quixiao:function(){
    wx.showToast({
      title: '后续也可再次进行授权',
      icon: 'none',
      duration: 800,
     })
     setTimeout(res=>{
      wx.navigateBack({
        delta: 0,
      })
    },800)
  },

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
   
  },


})