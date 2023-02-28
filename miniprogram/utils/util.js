
// 格式化时间 传入毫秒，输出分秒
function formatTime(time) {
  time = new Date(time);

  function _formatNumber(number) {
    // 方法一：数值处理
    return number / 10 < 1 ? "0" + number : number;
    // 方法二：字符串处理
    // number = number.toString();
    // return number[1] ? number : '0' + number;
  }
  return `${_formatNumber(time.getMinutes())}:${_formatNumber(time.getSeconds())}`;
}

// 格式化时间 传入毫秒，输出年月日
function formatDate(time) {
  let date = new Date(time);
  return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}

// 格式化歌词 输入字符串，输出数组
function formatLyric(content) {
  let newArr = new Array();
  let rowArr = content.split('\n');
  for (var row of rowArr) {
    if (row.indexOf(']') == "-1" && row) {
      row && newArr.push({
        lrc: row
      });
    } else if (row.indexOf(']') != "-1") {
      let time = row.split(']').shift().substr(1, 8);
      if (row.split(']').pop()) {
        row && newArr.push({
          lrc: row.split(']').pop(),
          sec: parseInt(time.split(':')[0] * 60 + time.split(':')[1] * 1)
        });
      };
    };
  };
  return newArr;
}

// 格式化播放量 输入数字数组，输出带单位的数组
function formatPlayCount(countArr) {
  let newCountArr = new Array();
  if (countArr instanceof Array) {
    countArr.forEach(count => {
      if (count >= 1000000000) {
        newCountArr.push(`${(count / 100000000).toFixed(0)}亿`);
      } else if (count >= 100000000) {
        newCountArr.push(`${(count / 100000000).toFixed(1)}亿`);
      } else if (count >= 100000) {
        newCountArr.push(`${(count / 10000).toFixed(0)}万`);
      } else {
        newCountArr.push(count);
      };
    });
    return newCountArr;

  } else {
    let count = countArr;
    if (count > 300000000) {
      count = `${(count / 100000000).toFixed(0)}亿`;
    } else if (count >= 100000000) {
      count = `${(count / 100000000).toFixed(1)}亿`;
    } else if (count >= 100000) {
      count = `${(count / 10000).toFixed(0)}万`;
    } else {
      count = count;
    };
    return count;
  };
}

// 格式化歌手 输入数组，输出字符串
function formatArtists(arr) {
  let singers = '';
  arr.forEach((value, index) => {
    if (index > 0) {
      singers += '/' + value.name;
    } else {
      singers = value.name;
    };
  });
  return singers;
}

// 数组切割 [{},{},{},{},{},{}] => [[{},{},{}],[{},{},{}]]
function arrSlice(arr, subGroupLength, index = 0) {
  let arr_new = new Array();
  while (index < arr.length) {
    arr_new.push(arr.slice(index, index += subGroupLength));
  };
  return arr_new;
}

// 数组展开 [[{},{},{}],[{},{},{}]] => [{},{},{},{},{},{}] 
function arrUnfold(arr) {
  let arr_new = new Array();
  arr.forEach(item => {
    arr_new.push(...item);
  });
  return arr_new;
}

module.exports = {
  // --------------------------------- 自定义处理
  formatTime, // 格式化分秒
  formatDate, // 格式化年月日
  formatLyric, // 格式化歌词
  formatPlayCount, // 格式化单位
  formatArtists, // 格式化歌手
  arrSlice, // 数组切割
  arrUnfold, // 数组展开
  redirectTo, // 关闭当前页面，跳转到应用内的某个页面
  showToast, // 显示消息提示框
  setNavigationBarTitle, // 动态设置当前页面的标题
  pageScrollTo, // 将页面滚动到目标位置
}

// 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
function redirectTo(url) {
  wx.redirectTo({
    url: url,
  });
}

// 显示消息提示框
function showToast(title, icon = 'none', duration = 1500) {
  wx.showToast({
    title,
    icon,
    duration,
  });
}



// 动态设置当前页面的标题
function setNavigationBarTitle(title) {
  wx.setNavigationBarTitle({
    title,
  });
}


// 将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
function pageScrollTo(scrollTop, duration) {
  return () => {
    wx.pageScrollTo({
      scrollTop: scrollTop ? scrollTop : 0,
      duration: duration ? duration : 3000,
    });
  }
}
