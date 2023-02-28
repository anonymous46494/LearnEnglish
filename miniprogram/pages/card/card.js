const app = getApp()

let plugin1=app.globalData.plugin
let manager1=app.globalData.manager

Page({
  data: {
    url:'https://dict.youdao.com/dictvoice?audio=',
    url1:"https://en-letter.xiao84.com/kidsletter/data/",
    word: {},
    globalAudioContext: null,
    current: 0,
    currentPageColor: "3",
    title: "",
    src: [],
    isRecordPlaying: false,
    Recording:false,
    flage:'',
    scores:-1,
    scores1:0,
    playUrl:[],
    status1:false,
    status:false,
    time:"",
    power:false,
    hasCollected:[],
  },
  //获取单词分类列表
  card_list:function(){
    wx.getStorage({
      key: 'card_list',
      success:res=> {
        console.log("获取card_list成功",res)
        this.setData({
          word:res.data[this.data.flage-1].content,
          currentPageColor:res.data[this.data.flage-1].currentPageColor,
          title:res.data[this.data.flage-1].chinese
        })
        setTimeout(res=>{
          this.PlayAudio()
        },1000)
        },
      fail:res=>{
        console.log("获取card_list失败",res)
      }
    })
  },
  getcard:function(id){
    wx.cloud.callFunction({
      name: 'getCard_search',
      data: {
        id:id
      },
    success:res=>{
      console.log(res)
        this.setData({
          word:res.result.data.content
        })
    },
    fail:res=>{
      console.log("获取word失败",res)
    },
  })

  },

 //开始测一测
  startCe:function(){
    this.data.Recording=true
    this.setData({
      Recording:this.data.Recording
    })
    if(this.data.power){
      this.PlayAudio2()
        wx.showLoading({
          title: '大声读出来吧!',
          icon:'none'
        })
        app.aa(this.data.word[this.data.current].word,0,4.0,1)
        setTimeout(res=>{
          this.data.ce=true
        },300)
       
    }else{
      wx.authorize({
        scope: 'scope.record',
        success:res=>{
          console.log(res)
        },

      })
      this.data.ce=false
      wx.showModal({
        title: '提示',
        content: '您未授权录音，功能将无法使用',
        showCancel: true,
        confirmText: "授权",
        confirmColor: "#52a2d8",
        success: function(res) {
          if (res.confirm) {
            wx.openSetting({
              success:res => {
                if (!res.authSetting['scope.record']) {
                  wx.showToast({
                    title: '麦克风未授权',
                    icon: 'error',
                    duration: 800,
                   })
                } else {
                  wx.showToast({
                    title: '麦克风已授权',
                    icon: 'success',
                    duration: 800,
                    mask:true
                   })
                }
              },
            })
          } else if (res.cancel) {
            console.log("cancel");
          }
        },
      })
    }
    
  },

  //结束测一测
  stopCe: function() {
    this.data.Recording=false
    this.setData({
      Recording:this.data.Recording
    })
    if(this.data.ce){
      app.globalData.manager.stop()
      wx.showLoading({
        title: '正在评分...',
      })
      app.globalData.manager.onError((res) => {
        wx.showToast({
          title: '出错了!',
          icon: 'error',
        })
        console.log("错误",res)
      })
      app.globalData.manager.onSuccess((res) => {
        console.log(res)
        wx.hideLoading()
        this.data.scores=Math.round(res.SuggestedScore)
        this.data.scores1=Math.round(res.SuggestedScore/20) 
        this.data.playUrl[this.data.current]=res.AudioUrl
        this.setData({
          scores:this.data.scores,
          scores1:this.data.scores1,
        })
      })
    }
  },
  //判读是否授权
  isShouquan:function(){
      wx.getSetting({
      success:res=>{
        if(res.authSetting["scope.record"]){
          this.data.power=true
        }else{
          this.data.power=false
        }
      }
    })
   
  },

  onLoad: function (options) {
    if(options.id){
      this.getcard(options.id)
    }else{
      this.setData({  
        flage:options.flage,
      }) 
      this.card_list()
    }

  },

  onReady: function () {
    wx.setNavigationBarTitle({
        title: this.data.title
    }) 
  },

  onShow:function(){
    this.isShouquan()
   
  },

  onUnload: function () {
    this.PlayAudio2()
  },

  //完全播放
  PlayAudio:function(){
    clearTimeout(this.data.time)
    let globalAudioContext = app.globalData.globalAudioContext
    globalAudioContext.stop()
    if(this.data.flage==1){
      globalAudioContext.startTime=0
      globalAudioContext.src =this.data.url1+this.data.word[this.data.current]["word"]+'.mp3'
      globalAudioContext.play()
      globalAudioContext.onPlay(res=>{
        this.setData({
          status:true
         })
         this.data.time=setTimeout(res=>{
          this.setData({
            status:false,
            status1:true
           })
        },5000)
        
       })
      globalAudioContext.onEnded(res=>{
        clearTimeout(this.data.time)
        this.setData({
          status:false,
            status1:false
          })
       })
      globalAudioContext.onStop(res=>{
      clearTimeout(this.data.time)
      this.setData({
        status:true,
        status1:false
        })
      })
    }else{
      globalAudioContext.startTime=0
      globalAudioContext.src = this.data.url+this.data.word[this.data.current]["word"]+'&type=1'
      globalAudioContext.play()
      globalAudioContext.onPlay(res=>{
       this.setData({
        status1:true
       })
      })
      globalAudioContext.onEnded(res=>{
        setTimeout(res=>{
          this.setData({
            status1:false
           })
        },700)
       })
    }

  },
  //字母模块相关播放
  PlayAudio1: function () {
    let globalAudioContext = app.globalData.globalAudioContext
    globalAudioContext.stop()
    globalAudioContext.startTime=5
    globalAudioContext.src = this.data.url1+this.data.word[this.data.current]["word"]+'.mp3'
    globalAudioContext.play()
  },
  //停止播放
  PlayAudio2: function (e) {
    this.setData({
      status:false,
      status1:false
      })
    console.log("音频停止")
    let globalAudioContext = app.globalData.globalAudioContext
    globalAudioContext.stop()
  },

  //解锁卡片
  Unlock:function(){
    if(app.globalData.userData.study_Status.card_learned==this.data.flage){
      wx.cloud.callFunction({
        name: 'upCard_learned',
        data: {
          id:app.globalData.userData._id,
        },
        success:res=>{
          console.log("解锁card成功",res)
          wx.showToast({
            title: '恭喜已解锁下一个卡片',
            icon: 'none',
            duration: 1500,
           })
           app.globalData.userData.study_Status.card_learned=app.globalData.userData.study_Status.card_learned+1
        },
        fail:res=>{
          console.log("解锁card失败",res)
        },
      })  
    
    }

  },

  //滑动卡片
  changeItem: function (e) {
    console.log(e.detail.current)
    if(e.detail.current==this.data.word.length-1){
       if(this.data.playUrl.length==this.data.word.length){
        this.Unlock()
      }else{
        wx.showToast({
          title: '测完所有单词发音才能解锁下一个卡片',
          icon: 'none',
          duration: 1500,
         })
      }
    }
    this.setData({
      scores:-1,
      current: e.detail.current,
      status:false,
      status1:false
    })
    this.PlayAudio()
  },

  //播放录音
  playRecording: function (e) {
    this.PlayAudio2()
    let globalAudioContext = app.globalData.globalAudioContext
    if (!this.data.playUrl[this.data.current]) {
      wx.showToast({
        title: '还没有读过这个单词哦',
        icon: 'none',
        duration: 1500
      })
      return
    }else{
      globalAudioContext.stop()
      globalAudioContext.src =this.data.playUrl[this.data.current];
      globalAudioContext.play()
      globalAudioContext.onPlay(res=>{
        this.data.isRecordPlaying=true
        this.setData({
          isRecordPlaying:this.data.isRecordPlaying
        })
      },
      globalAudioContext.onEnded(res=>{
        this.data.isRecordPlaying=false
        this.setData({
          isRecordPlaying:this.data.isRecordPlaying
        })
       })) 
    }
  },
  /*
  //1.收藏单词,判断该单词是否被收藏
  toggleCollect: function (e) {
    let user_id=app.globalData.userData._id
    console.log(user_id)
    let cont=this.data.word[this.data.current]
    console.log(cont)
    wx.cloud.callFunction({
      name: 'searchCollect',
      data: {
        user_id:user_id,
        cont:cont
      },
    success:res=>{
      if(res.result.data.length==0){
        console.log("该单词未收藏过",res)
        this.upCollect(user_id,cont)
      }else{
        console.log("该单词已经收藏过",res)
      }
      
    },
    fail:res=>{
      console.log(res)
      wx.showToast({
        title: '请检查网络连接',
        icon:"error",
      })
    },
  })
  },
*/
  //2.如未收藏添加至数据库
  upCollect:function(){
    if(this.data.hasCollected[this.data.current]!=true){
      let user_id=app.globalData.userData._id
      let cont=this.data.word[this.data.current]
      wx.cloud.callFunction({
        name: 'upNetbook',
        data: {
          user_id:user_id,
          cont:cont
        },
      success:res=>{
        wx.showToast({
          title: '已添加至生词本',
        })
        this.data.hasCollected[this.data.current]=true
        this.setData({
          hasCollected:this.data.hasCollected
        })
      },
      fail:res=>{
        console.log("收藏单词出错",res)
        wx.showToast({
          title: '请检查网络连接',
          icon:"error",
        })
      },
    })
    }else{
      wx.showToast({
        title: '该单词已在生词本',
      })
    }
   
  },

  toWrite: function () {
    var key=this.data.word[this.data.current].write
    wx.navigateTo({
      url: '../write/index?key='+key,
    })
  },

  toPing: function () {
    var key1=this.data.word[this.data.current].word
    var key2=this.data.word[this.data.current].img
    var key3=this.data.word[this.data.current].chinese
    wx.navigateTo({
      url: '../cai/index?key1='+key1+'&key2='+key2+'&key3='+key3
    })
  },

})
