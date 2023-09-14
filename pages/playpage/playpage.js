let bgam = wx.createInnerAudioContext();
var totalTime = 0;
var currentTime = 0;
var id = 1;
var loadReady = 0;
var musicIndex = 1;
var app = getApp();
//全局计时器，用于动态渲染
let currentInterval = null;
let musicobservers = 0

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    musicName: "test",
    author: "",
    playState: "play",
    //播放模式：default 列表循环 circle 单曲循环 random 随机播放
    currentplaymode: "default",
    playmodelist: {
      "default": "列表循环",
      "circle": "单曲循环",
      "random": "随机播放"
    },
    //总时间参数
    musicTime1: "",
    musicTime2: "",
    //当前时间参数
    musicTime3: "",
    musicTime4: "",
    //进度条进度参数
    sliderLength: 0,
    sliderCurLength: 0,
    playimgData: [],
    songData: [],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1/images/",
    //后台请求路径
    httpUrl: "http://127.0.0.1/"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType',
      data: {
        imagetype: "player"
      },
      header: {
        "content-type": "application/json"
      },
      success(res) {
        if (res.data.code == 0) {
          that.setData({
            playimgData: res.data.data
          })
        } else {}

      }
    })
    let m_url = decodeURIComponent(options.musicUrl);
    let m_name = options.musicName;
    let m_img = decodeURIComponent(options.musicImg);
    let m_author = options.author;
    musicIndex = parseInt(options.musicID);
    console.log(musicIndex);

    //console.log(options.musicName);
    this.setData({
      musicName: m_name,
      src: m_img,
      author: m_author,
      sliderCurLength: 0
    })
    bgam.src = m_url;
    //默认在页面加载完成后判断是否开始播放
    //console.log("test out.");
    //获取歌曲时间
    bgam.onCanplay(function getDuration() {
      let intervalID = setInterval(function () {
        if (bgam.duration !== 0) {
          //定时器清除
          totalTime = bgam.duration;
          setTime();
          loadReady = 1
          musicobservers = 1;
          clearInterval(intervalID);
          bgam.play()
          bgam.offCanplay()
        }
      }, 500);
    });
    //缓冲加载
    function setTime() {
      var time1 = parseInt(totalTime / 60);
      var time2 = parseInt(totalTime % 60);
      if (time1 < 10) {
        time1 = "0" + time1;
      }
      if (time2 < 10) {
        time2 = "0" + time2;
      }
      var timeToSlider = parseInt(totalTime * 10);
      that.setData({
        //设置总时间及进度条时间帧
        musicTime1: time1,
        musicTime2: time2,
        sliderLength: timeToSlider
      })
    }
    //动态渲染数据
    currentInterval = setInterval(() => {
      if (musicobservers == 1) {
        musicobservers = 0
        console.log("监视器生成")
        bgam.onEnded(res => {
          that.CPMode(that)
          console.log("结束")
          bgam.offEnded()
        })
      }
      currentTime = bgam.currentTime;
      var time3 = parseInt(currentTime / 60);
      var time4 = parseInt(currentTime % 60);
      if (time3 < 10) {
        time3 = "0" + time3;
      }
      if (time4 < 10) {
        time4 = "0" + time4;
      }
      //如果在播放，更新时间戳，进度条
      if (loadReady === 1 && id === 1) {
        if (currentTime < totalTime) {
          that.setData({
            musicTime3: time3,
            musicTime4: time4,
            sliderCurLength: that.data.sliderCurLength + 1
          })
        }
      }
      //如果暂停，只更新时间戳
      else {
        that.setData({
          musicTime3: time3,
          musicTime4: time4,
        })
      }
    }, 100);
  },

  //控制音乐播放暂停的方法
  music: function () {
    //判断id的初始值是多少(id初始值给的是1代表播放)
    if (id == 1) {
      //如果id等于一的话代表正在播放就用.pause的方法暂停，然后再给id赋值为0代表音乐暂停
      bgam.pause();
      this.setData({
        playState: "pause"
      });
      id = 0;
    } else {
      //如果id不等于一的话代表音乐暂停就用.play的方法播放，然后再给id赋值为1代表音乐播放
      //重新生成
      bgam.play();
      this.setData({
        playState: "play"
      });
      id = 1;
    }
  },

  //切歌
  changeMusic: function (e) {
    let that = this
    let action = ""
    //接收请求
    if(e.currentTarget.dataset.action){
    action = e.currentTarget.dataset.action
    }
    else{
      action = "next"
    }

    function next() {
      musicIndex = musicIndex + 1
    }

    function last() {
      musicIndex = musicIndex - 1
    }

    function random() {
      const randomZeroOrOne = Math.round(Math.random());
      let randomInt;
      // 根据随机数的结果选择范围
      if (randomZeroOrOne === 0) {
        const min = 1;
        const max = 6;
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      } else {
        const min = 101;
        const max = 140;
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      musicIndex = randomInt
    }

    function circle() {
      musicIndex = musicIndex
    }

    //切换歌曲
    function change() {
      id = 1
      loadReady = 0
      bgam.stop()
      //异步导致数据不同步的处理
      function fetchSongdata(callback) {
        console.log("要切换的歌曲id:"+musicIndex+",使用模式："+that.data.currentplaymode)
        wx.request({
          url: that.data.httpUrl + 'song/querySongsById',
          data: {
            id: musicIndex
          },
          header: {
            "content-type": "application/json"
          },
          success(res) {
            if (res.data.code == 0) {
              that.setData({
                songData: res.data.data[0]
              })
              callback(that.data.songData)
            } else {}
          }
        })
      }
      //重置数据
      (() => {
        console.log("数据重置")
        that.setData({
          playState: "play",
          musicTime1: "",
          musicTime2: "",
          musicTime3: "",
          musicTime4: "",
          sliderCurLength: 0,
          sliderLength: 0
        })
      })();
      //异步更新
      fetchSongdata(function (songData) {
        bgam.src = songData.songurl;
        that.setData({
          src: songData.image.url,
          musicName: songData.name,
          author: songData.singer
        })
      })

      //获取歌曲时间
      bgam.onCanplay(function getDuration() {
        let intervalID = setInterval(function () {
          if (bgam.duration !== 0) {
            //定时器清除
            totalTime = bgam.duration;
            setTime();
            loadReady = 1
            musicobservers = 1;
            clearInterval(intervalID);
            bgam.play()
            bgam.offCanplay()
          }
        }, 500);
      });
      //缓冲加载
      function setTime() {
        var time1 = parseInt(totalTime / 60);
        var time2 = parseInt(totalTime % 60);
        if (time1 < 10) {
          time1 = "0" + time1;
        }
        if (time2 < 10) {
          time2 = "0" + time2;
        }
        var timeToSlider = parseInt(totalTime * 10);
        that.setData({
          //设置总时间及进度条时间帧
          musicTime1: time1,
          musicTime2: time2,
          sliderLength: timeToSlider
        })
      }
      console.log("结束")
      bgam.offEnded()
    }

    if (action === "next") {
      if(that.data.currentplaymode === "default"){
        if (musicIndex < 6 || (musicIndex >= 101 && musicIndex < 140)) //是否到顶
      {
        next()
        change()
        } else {
        wx.showToast({
          title: "已经是最后一首啦", // 提示的内容
          icon: "none",
          duration: 3000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
        }
      }
      if(that.data.currentplaymode === "circle"){
        circle()
        change()
      }
      if(that.data.currentplaymode === "random"){
        random()
        change()
      }
    } 
    if(action === "last")
    {
      if ((musicIndex > 1 && musicIndex <= 6) || musicIndex > 101) {
        last()
        change()
      } else {
        wx.showToast({
          title: "已经是最后一首啦", // 提示的内容
          icon: "none",
          duration: 3000, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
      }
    }
  },

  //切换播放模式(前端)
  changePlayMode: function () {
    let mode = this.data.currentplaymode
    let keys = Object.keys(this.data.playmodelist)
    switch (mode) {
      case "default":
        mode = keys[1]
        this.setData({
          currentplaymode: mode
        })
        break;
      case "circle":
        mode = keys[2]
        this.setData({
          currentplaymode: mode
        })
        break;
      case "random":
        mode = keys[0]
        this.setData({
          currentplaymode: mode
        })
        break;
    }
    wx.showToast({
      title: this.data.playmodelist[mode], // 提示的内容
      icon: "none",
      duration: 3000, // 提示的延迟时间，默认1500
      mask: false, // 是否显示透明蒙层，防止触摸穿透
    })
  },

  //切换播放模式(业务)
  CPMode: function (forward) {
    forward.changeMusic("next")
  },

  //展开歌曲列表
  checkSongList: function () {

  },

  //滑动条交互
  sliderChange: function (e) {
    var newSlider = e.detail.value;
    var sliderTime = e.detail.value / 10;
    bgam.seek(sliderTime);
    this.setData({
      sliderCurLength: newSlider
    })
  },

  //监听初次渲染
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    //console.log("test out unioad");
    bgam.stop();
    id = 0;
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})