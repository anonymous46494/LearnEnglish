const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl:"",
    title:"",
    episode:"",
    playUrl:[],
    recording: false,
    currentProgress: 0,
    scores:[],
    chinese:[],
    content:[],
    id:'0',
    click:'',
    autoplay:false,
    timer:0,
    show:"",
    power:false
  },

    //判读是否授权
    isShouquan:function(){
      wx.getSetting({
      success:res=>{
        console.log(res)
        if(res.authSetting["scope.record"]){
          this.data.power=true
        }else{
          this.data.power=false
        }
      }
    })
   
  },
    //获取存储的video信息
  getVodeo:function(){
      wx.getStorage({
        key: 'video',
        success:res=> {
          console.log("获取video成功",res)
          console.log(res.data[this.data.id].episode.episode_1.content)
          this.data.seek=res.data[this.data.id].episode.episode_1.content.seek,
          this.setData({
            data:res.data[this.data.id],
            videoUrl:res.data[this.data.id].episode.episode_1.video,
            title:res.data[this.data.id].episode.episode_1.title,
            episode:res.data[this.data.id].episode.episode_1.episode,
            english:res.data[this.data.id].episode.episode_1.content.english,
            chinese:res.data[this.data.id].episode.episode_1.content.chinese,
            size:res.data[this.data.id].episode.episode_1.content.size,
          })
        },
        fail:res=>{
          console.log("获取video失败",res)
        }
      })
  },
   //开始测一测
  startCe:function(e){
    if(this.data.power){
      this.data.click=e.currentTarget.id
      this.setData({
        recording:true,
        click:this.data.click
      })
      wx.showLoading({
        title: '大声读出来吧'
      })
      app.aa(this.data.english[this.data.click],1,3.0,1)
      this.data.ce=true
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
  stopCe: function(e) {
    if(this.data.ce){
      app.globalData.manager.stop()
      this.setData({
        recording:false
      })
      wx.showLoading({
        title: '正在评分...',
      })
      app.globalData.manager.onError((res) => {
      wx.hideLoading()
      wx.showToast({
        title: '出错了!',
        icon: 'error',
  
      })
      console.log("错误",res)
    })
      app.globalData.manager.onSuccess((res) => {
      wx.hideLoading()
      console.log(res)
      this.data.scores[this.data.click]=Math.round(res.SuggestedScore)
      this.data.playUrl[this.data.click]=res.AudioUrl
      this.data.show=e.currentTarget.id
      this.setData({
        scores:this.data.scores,
        playUrl:this.data.playUrl,
        show:this.data.show,
      })
      this.handleSentenceInfo(res)
    })
    }
    
},
  handleSentenceInfo:function(res){
    let words = res.Words || [];
    console.log(words)
    let wordLen = words.length;
    let wordArr = []
    let wordError = []
    let wordCaton = []
    let wordMiss = []
    let wordExtra = []
    for(let i = 0; i < wordLen; i++) {
        let wordItem =  words[i];
        let MatchTag = wordItem.MatchTag;
        let word = wordItem.Word;
        if(MatchTag === 1) { // 多读
            wordExtra.push(word)
        } else if(MatchTag === 2){ // 少读
            wordMiss.push(word)
            wordArr.push({
                word: word,
                type: 'error',
            })
        } else if(MatchTag === 0) { // 匹配
            let phoneType = this.getAccuracyType(wordItem.PronAccuracy)
            if(phoneType == 'error') {
                wordError.push(word)
            }
            let PronFluency=wordItem.PronFluency
            if(PronFluency>0.7){
              wordCaton.push(word)
            }
            wordArr.push({
                word: word,
                type: phoneType,
            })
        }
    }
    this.data.wordArr=wordArr
    this.data.wordError=wordError
    this.data.wordCaton=wordCaton
    this.data.wordMiss=wordMiss
    this.data.wordExtra=wordExtra
    this.setData({
        wordArr: this.data.wordArr,
    })

  },
  // 准确度分级
  getAccuracyType: function(accuracy) {
    let accuracyType = 'normal'
    if(accuracy > 80) {
       accuracyType = 'success'
    }else if(accuracy < 60) {
       accuracyType = 'error'
    } 
    return accuracyType
  },
  //播放原音频
  PlayVideo:function(e){
    clearTimeout(this.data.timer)
    let id=e.currentTarget.id
    var videoplay = wx.createVideoContext('video')
    videoplay.seek(this.data.seek[id])
    videoplay.play()
    this.data.timer=setTimeout(res=>{
      videoplay.pause()
    },this.data.size[id])
  },

  PlayUserAudio: function (e) {
    let id=e.currentTarget.id
    let globalAudioContext = app.globalData.globalAudioContext
    globalAudioContext.stop()
    globalAudioContext.startTime=0
    globalAudioContext.src = this.data.playUrl[id]
    globalAudioContext.play()
     //更新进度条
     var that = this;
     var size = 100;
     that.setData({
       currentProgress: 0
     });
     that.progressTimer = setInterval(function () {
       var num = Math.ceil(2 * 1000);
       var newPro = that.data.currentProgress;
       newPro += size / num * 100;
       if (newPro >= 100) {
         that.setData({
           currentProgress: 100
         });
       } else {
       that.setData({
         currentProgress: newPro
         });
       }
     }, size);
  },
  tapSubmitReadingResult:function(){
    wx.showModal({
      title: '提示',
      content: '请完成所有句子的测评再进行提交',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.isShouquan()

  },


})