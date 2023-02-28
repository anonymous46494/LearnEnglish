
Page({
  data: {
    current: 0,
        //tabbar
    // "pagePath": "/pages/my/my", 页面路径
    // "text": "thor", 标题
    // "iconPath": "thor_gray.png", 图标地址
    // "selectedIconPath": "thor_active.png", 选中图标地址
    // "hump": true, 是否为凸起图标
    // "num": 2,   角标数量
    // "isDot": true,  角标是否为圆点
    // "verify": true  是否验证  （如登录
    tabBar: [
      {
        "pagePath": "/pages/status/index",
        "text": "打卡",
        "iconPath": "/img/duck.png",
        "selectedIconPath": "/img/duck1.png"
      },
      {
        "pagePath": "/pages/index/index",
        "text": "学习乐园",
        "iconPath": "/img/student.png",
        "hump": true,
        "selectedIconPath": "/img/student1.png"
      },
      {
        "pagePath": "/pages/mine/index",
        "text": "我的",
        "iconPath": "/img/mine.png",
        "selectedIconPath": "/img/mine1.png",
        "isDot": false,
      }
    ]
  },
  onLoad: function(options) {
  },
  tabbarSwitch(e) {
      this.setData({
        current: e.detail.index
      })
  }
})