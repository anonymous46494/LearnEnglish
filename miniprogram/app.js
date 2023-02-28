
let plugin = requirePlugin("myPlugin");
let manager = plugin.getSoeRecorderManager({
 secretId: "AKID2uXu0pOgiTyDDvMXR4QWMvDDxQ0KOCjz",
 secretKey: "1lEQKyMTJtCEzVlkSt3wYtzoMdeNp1wa"
});
App({
  // 初始化背景音频
  initAudio(that) {
    const {
      playing,
      backgroundAudioManager,
    } = this.globalData;
    console.log(that);
    console.log(`%c初始开始, %cplaying.url => ${playing.url}`, `color: #74b9ff;`, `color: inherit;`);
    this.update(that);
    if (playing.url && (playing.url != backgroundAudioManager.src)) {
      console.log(`%c初始成功, %cplaying.id => ${playing.id} `, `color: #0984e3;`, `color: inherit;`);
      // 音频的数据源（2.2.3 开始支持云文件ID）。默认为空字符串，当设置了新的 src 时，会自动开始播放，目前支持的格式有 m4a, aac, mp3, wav
      backgroundAudioManager.src = playing.url;
      // 音频标题，用于原生音频播放器音频标题（必填）。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值
      backgroundAudioManager.title = playing.title;
      // 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
      backgroundAudioManager.epname = ` - ${playing.album}`;
      // 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值
      backgroundAudioManager.singer = playing.singer;
      // 封面图 URL，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图
      backgroundAudioManager.coverImgUrl = playing.image;
    };
    // 监听背景音频进入可播放状态事件。 但不保证后面可以流畅播放
    backgroundAudioManager.onCanplay(() => {
      backgroundAudioManager.play();
    });

    // 监听背景音频播放事件
    backgroundAudioManager.onPlay(() => {
      that.setData({
        isPlayState: true
      });
      this.globalData.isPlayState = true;
      console.log(`%c播放成功, %c音频长度 => ${backgroundAudioManager.duration}s, 音频数据源 => ${backgroundAudioManager.src}`, `color: #0f0;`, `color: inherit;`);
    });

    // 监听背景音频暂停事件
    backgroundAudioManager.onPause(() => {
      that.setData({
        isPlayState: false
      });
      this.globalData.isPlayState = false;
      console.log(`%c暂停成功, %c缓冲时间 => ${backgroundAudioManager.buffered}s, 是否暂停&停止 => ${backgroundAudioManager.paused}`, `color: #f00;`, `color: inherit;`);
    });
;
    // 监听背景音频停止事件
    backgroundAudioManager.onStop(() => {
      console.log(`%c停止成功`, `color: red;`);
      backgroundAudioManager.pause();
      that.setData({
        isPlayState: false,
      });
      this.globalData.isPlayState = false;
    });

    // 监听背景音频播放错误事件
    backgroundAudioManager.onError(() => {
      wx.showToast({
        title: '呀.出现错误了.请检查网络连接哦',
        icon: 'none',
        duration: 2000
      })
    });
  },

  // 跳转音频指定位置
  skipAudio(that, position) {
    const {
      playing,
      backgroundAudioManager,
    } = this.globalData;
    wx.seekBackgroundAudio({
      position: Math.floor(position / 1000),
      success: () => {
        this.initAudio(that);
      }
    });
  },

  // 更新播放数据
  update(that) {
    let {
      playing, // 当前播放的歌曲
      playlist, // 当前播放的歌曲列表
      isPlayState, // 播放&暂停
    } = this.globalData;
    if (!playing.url) return false;
    that.setData({
      playing, // 当前播放的歌曲
      playlist, // 当前播放的歌曲列表
      isPlayState, // 播放&暂停
    });
    console.log(`%c更新成功, %cdata => `, `color: #00cec9;`, `color: inherit;`, {
      playing, // 当前播放的歌曲
      playlist, // 当前播放的歌曲列表
      isPlayState, // 播放&暂停
    });

  },

  //判断是否需要进入welcome页面
  welcome:function(){
      wx.getStorage({
        key: 'welcome',
        success:res=> {
          this.globalData.welcome=!res.data
          if(!res.data){
            wx.navigateTo({
              url: '/pages/welcome/welcome',
            })
          }
        },
        fail(res){
          wx.navigateTo({
            url: '/pages/welcome/welcome',
          })
        }
      })
  },

  //当前是否需要登录
  islogon(){
    if (!this.globalData.checkSession){
      wx.showToast({
          title: '请先登录哟!',
          icon: 'error',
          duration: 600,
          mask:true
        }).then(res=>{
        setTimeout(res=>{
            wx.navigateTo({
              url: '/pages/login/index',
           }) 
        },500)  
        })
    }
  },

  
  //写入openid
  writeOpenid(){
    wx.getStorage({
      key: 'openid',
      success :res=> {
        console.log("储存openid成功")
        this.globalData.openid=res.data
      },
      fail(res){
        console.log("储存openid失败")
        console.log(res)
      }
    })
  },

  //1.获取openid
  gologin:function(){
  wx.cloud.callFunction({
    name: 'getOpenid',
    success:res=>{
      wx.setStorage({
        key: "openid", 
        data: res.result.OPENID,
        success:res=>{
          console.log("获取openid成功")
          this.checkSession()
          this.writeOpenid()
        },
        fail:res=>{
          console.log('储存openid失败',res)
        }
        }) 
    },
    fail:res=>{
      console.log(res)
      wx.showToast({
        title: '获取用户凭证失败',
      })
    },
  })
  },

  //2.判断登录是否过期
  checkSession:function(){
    if(!this.globalData.welcome){
      wx.checkSession({
        success:res=> {
         console.log(res)
         console.log('判断登录是否过期'+this.globalData.checkSession)
         wx.navigateTo({
           url: '/pages/autoLogin/index',
         })
        },
         // session_key 已经失效，需要重新执行登录流程
        fail :res=> {
          console.log('session_key 已经失效，需要重新执行登录流程',res)
        }
      })
    }
  },

  //存储card分类
  getCard_1: function(){
    wx.cloud.callFunction({
      name: 'getCard_1',
      data: {
        basename:'card'
      },
      success:res=>{
        wx.setStorage({
          key:"card_list", 
          data:res.result.data,
          success:res=>{
            console.log('储存card_list成功',res)
          },
          fail:res=>{
            console.log('储存card_list失败',res)
          }
        })
      },
      fail:res=>{
        console.log("获取card_list失败",res)
      }
      
    })
  
      
  },
  
  //存储video信息
  getVideo: function(){
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        basename:'voide'
      },
      success:res=>{
        wx.setStorage({
          key:"video", 
          data:res.result.data,
          success:res=>{
            console.log('储存video成功',res)
          },
          fail:res=>{
            console.log('储存video失败',res)
          }
        })
      },
      fail:res=>{
        console.log("获取video失败",res)
      }
  
    })
  
      
  },

  //存储music信息
  getMusic: function(){
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        basename:'music'
      },
      success:res=>{
        console.log(res)
        wx.setStorage({
          key:"music", 
          data:res.result.data,
          success:res=>{
            console.log('储存music成功',res)
          },
          fail:res=>{
            console.log('储存music失败',res)
          }
        })
      },
      fail:res=>{
        console.log("获取video失败",res)
      }
  
    })
  
      
  },




  onLaunch: function () {
    wx.cloud.init({
      env:"children-7gvrxtym1a4de9ef"
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'children-7gvrxtym1a4de9ef',
        traceUser: true,
      })
    }

    this.welcome()
    this.gologin()
  

    let that = this
    // 全局播放器
    that.globalData.globalAudioContext = wx.createInnerAudioContext()
    // 登录
  },

  //评测开始
  aa:function(content,evalMode,scoreCoeff,storageMode){
    this.globalData.manager.start({
      content:content,
      evalMode:evalMode,
      scoreCoeff:scoreCoeff,
      storageMode:storageMode
  })
  },

  globalData: {
    globalAudioContext: null,
    plugin:plugin,
    manager:manager,
    userData:{
    },
    userInfo:{},
    openid:'',
    user_id:'',
    login_Date:'',
  //  isOverdue:false,
    flage:false,
    welcome:true,
    checkSession:false,
    power:false,
    backgroundAudioManager: wx.getBackgroundAudioManager(), // 全局唯一的背景音频管理器
    videoContext: wx.createVideoContext('video'), // 创建 video 上下文 VideoContext 对象
    playing: {
      id: '', // 歌曲ID
      url: '', // 音乐地址
      image: '', // 图片地址
      title: '', // 歌名
      singer: 'null', // 歌手
    }, // 当前播放的歌曲
    playlist: [""], // 播放列表
    isPlayState: false, // 播放&暂停
    playIndex:-1

  }
})