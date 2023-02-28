// pages/content/index.js
const app = getApp()
Page({
  data: {
    url:"",
    selectContent: [],
    selectedContent: [],
    txt:'',
    pics: [],
    correctTexts: [],
    sorted: [],
    curImgUrl: "",
    curCorrectText: "",
    isTrue: false,
    isComplete: false,
    allSelected:['a','b','c','d','e','f','g','h','i','g','k','l','m','n','w','p','q','r','s','t','u','v','w','x','y','z'],
  },
  playWordAudio: function (e) {
    let globalAudioContext = app.globalData.globalAudioContext
    globalAudioContext.stop()
    globalAudioContext.startTime=0
    globalAudioContext.src = this.data.url
    globalAudioContext.play()
},
playWordAudio1: function (e) {
  console.log(e)
  let globalAudioContext = app.globalData.globalAudioContext
  globalAudioContext.stop()
  globalAudioContext.startTime=0
  globalAudioContext.src ='https://dict.youdao.com/dictvoice?audio='+e+'&type=4'
  globalAudioContext.play()
},
  pai:function(){
  console.log(this.data.correctTexts[0].length)
  if(this.data.correctTexts[0].length==1){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==2){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==3){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==4){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==5){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==6){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
      { "index": 5, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==7){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
      { "index": 5, "content": "" },
      { "index": 6, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==8){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
      { "index": 5, "content": "" },
      { "index": 6, "content": "" },
      { "index": 7, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==9){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
      { "index": 5, "content": "" },
      { "index": 6, "content": "" },
      { "index": 7, "content": "" },
      { "index": 8, "content": "" },
    ]
  }
  else if(this.data.correctTexts[0].length==10){
    this.data.selectedContent=[
      { "index": 0, "content": "" },
      { "index": 1, "content": "" },
      { "index": 2, "content": "" },
      { "index": 3, "content": "" },
      { "index": 4, "content": "" },
      { "index": 5, "content": "" },
      { "index": 6, "content": "" },
      { "index": 7, "content": "" },
      { "index": 8, "content": "" },
      { "index": 9, "content": "" },
    ]
  }

},

//提示
  onPrompt: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        this.data.selectedContent[i].content = this.data.curCorrectText[i];
        break;
      }
    }
    this.updateState();
  },

 //随机生成单词
  generateText: function () {
    //清除上一次数据
    if (this.data.selectContent.length > 0) {
      this.data.selectContent.splice(0, this.data.selectContent.length);
    }
    for (let i = 0; i < this.data.curCorrectText.length; i++) {
      this.data.selectContent.push(this.data.curCorrectText[i]);
    }
    let start = Math.floor(Math.random() * 50);
    for (let i = 0; i < 6 - this.data.curCorrectText.length; i++) {
      let index = (start + i) % this.data.allSelected.length;
      this.data.selectContent.push(this.data.allSelected[index]);
    }
    this.data.selectContent.sort(this.randomSort);
  },

//获取新数据
  generateNewData() {
    if (this.data.sorted.length <= 0) {
      wx.showToast({
        title: '恭喜你,全部答对啦!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      this.data.selectedContent[i].content = "";
    }
    let index = this.data.sorted.shift();
    this.data.curImgUrl = this.data.pics[index];
    this.data.curCorrectText = this.data.correctTexts[index];
    this.generateText();
    //更新数据
    this.setData({
      curImgUrl: this.data.curImgUrl,
      curCorrectText: this.data.curCorrectText,
      selectContent: this.data.selectContent,
      selectedContent: this.data.selectedContent
    });
  },

  // check是否结果
  checkResult: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content != this.data.curCorrectText[i]) {
        return false;
      }
    }
    return true;
  },

  // 是否作答完毕
  isCompleted: function () {
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        return false;
      }
    }
    return true;
  },

  //作答
  onSelect: function (event) {
    console.log(event)
    let content = event.target.dataset.content;
    this.playWordAudio1(event.target.dataset.content)
    if (!content || this.isCompleted()) {
      return;
    }
    for (let i = 0; i < this.data.selectedContent.length; i++) {
      if (this.data.selectedContent[i].content == "") {
        this.data.selectedContent[i].content = content;
        break;
      }
    }
    this.updateState();
  },

  //更新作答状态
  updateState() {
    this.setData({ selectedContent: this.data.selectedContent });
    this.data.isComplete = this.isCompleted();
    if (this.data.isComplete) {
      this.data.isTrue = this.checkResult();
      this.setData({ isTrue: this.data.isTrue });
    }
    this.setData({ isComplete: this.data.isComplete });
  },

 // 修改答案
  onSelected: function (event) {
    console.log(event)
    let content = event.target.dataset.content;
    let index = event.target.dataset.id;
    if (content != "") {
      this.data.selectedContent[index].content = "";
      this.setData({ selectedContent: this.data.selectedContent });
    }
  },
  onrestart: function () {
    this.pai();
    this.setData({ selectedContent: this.data.selectedContent });
},

//随机排序
  randomSort: function (a, b) {
    return Math.random() > 0.5 ? -1 : 1;
  },

  onLoad: function (options) {
    this.setData({
      txt:[options.key3],
      correctTexts:[options.key1],
      pics:[options.key2],
      url:'http://dict.youdao.com/dictvoice?audio='+options.key1+'&type=1'
    })
    this.pai()

    //生成随机排序辅助数组
    for (let i = 0; i < this.data.pics.length; i++) {
      this.data.sorted.push(i);
    }
    this.data.sorted.sort(this.randomSort);
    this.generateNewData();
  },
})