let globalData = getApp().globalData;
Page({
  data: {
  },

  sava:function(){
    wx.showModal({
      itle: '提示',
      content: '是否保存图片至手机?',
      success:res=>{
        if (res.confirm) {
          this.savePosterPath()
        }
      }
    })
  },

  // 点击保存图片
  savePosterPath:function(e) {
  let that = this;
  var imgSrc = 'https://6368-children-7gvrxtym1a4de9ef-1302133509.tcb.qcloud.la/erweima.jpg?sign=7016661a6215ddbc62e0e7ffa732ea9d&t=1622115255';
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            console.log('授权成功');
            that.img(imgSrc)
          }
        })
      }else{
        that.img(imgSrc)
      }
    }
  })
},

  img: function (imgSrc){
  var imgSrc = imgSrc;
  wx.downloadFile({
    url: imgSrc,
    success: function (res) {
      console.log(res); //图片保存到本地
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          console.log(data);
          wx.showToast({
            title: '保存成功，快去分享小程序吧！',
            icon: 'none',
            duration: 1000
          })
        },
        fail: function (err) {
          console.log(err);
          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  wx.showToast({
                    title: '图片已保存',
                    icon:'success',
                    duration:1000
                  })
                } else {
                  wx.showToast({
                    title: '图片未保存',
                    icon:'error',
                    duration:1000
                  })
                }
              }
            })
          }
        }
      })
    }
  })

  },


  copy: function (e) {
    let text=e.currentTarget.dataset.text;
    wx.setClipboardData({
      data: text,
      success(res) {
        wx.getClipboardData({
          success(res) {
          }
        })
      }
    })
  },
  
  kefu:function(){
    wx.navigateTo({
      url: '../chatPage/chatPage'
    })
  }
})