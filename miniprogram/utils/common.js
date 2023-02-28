const util = require("./util.js");

// 上一首&下一首
function togglePlaying(direction = 1,id) { // 1 next & -1 prev
  const that = this;
  const app = getApp();
  let {
    playlist,
    playIndex,
  } = app.globalData;
    if (playIndex >= playlist.length-1 ) {
      playIndex = 0;
      app.globalData.playIndex=-1
    } else if (playIndex <= 0) {
      playIndex = playlist.length - 1;
    } 
    util.showToast(direction == -1 ? '上一首' : '下一首', 'success');
    app.globalData.playing.url=app.globalData.playlist[playIndex].url
    app.globalData.playing.image=app.globalData.playlist[playIndex].image
    app.globalData.playing.title=app.globalData.playlist[playIndex].title
    app.globalData.playing.singer=app.globalData.playlist[playIndex].singer
    app.globalData.playing.id=app.globalData.playlist[playIndex].id
    app.initAudio(that);
  
}

// 列表切歌
function togglePlayingCut(event) {
  const that = this;
  const app = getApp();
  // let id = event.currentTarget.dataset.id;
  let id = event.detail;
  // console.log(event);
  // debugger;
  let {
    playIndex,
    playlist,
  } = app.globalData;
  if (playIndex == id) return;
  getSongUrl(playlist[id].id, url => {
    let playing = {
      ...playlist[id],
      url,
    };
    // that.setData({
    //   playIndex: id,
    //   playing,
    // });
    app.globalData.playIndex = id;
    app.globalData.playing = playing;
    if (app.globalData.isShowLyric) {
      getLyric.call(that, playing.id);
    };
    app.initAudio(that);
  });
}

// 播放状态
function togglePlayingState(event) {
  const that = this;
  const app = getApp();
  let {
    isPlayState
  } = app.globalData;
  if (!isPlayState) {
    app.globalData.backgroundAudioManager.play();
  } else {
    app.globalData.backgroundAudioManager.pause();
  };
  that.setData({
    isPlayState: !isPlayState
  });
  app.globalData.isPlayState = !isPlayState;
}


// 播放顺序
function toggleModeIndex(event) {
  const that = this;
  const app = getApp();
  let {
    modeIndex,
    modeList,
  } = that.data;
  modeIndex++;
  modeIndex = modeIndex != (modeList.length + 1) ? modeIndex : 1;
  util.showToast(modeList[modeIndex - 1].name);
  that.setData({
    modeIndex,
  });
  app.globalData.modeIndex = modeIndex;
}


module.exports = {
  // --------------------------------- 播放操作
  togglePlaying, // 下一首&下一首
  togglePlayingCut, // 切歌
  togglePlayingState, // 播放状态
  toggleModeIndex, // 播放顺序
}

