var bgam = wx.createInnerAudioContext();
var totalTime=0;
var currentTime=0;
var id = 1;
var loadReady=0;
var musicIndex=1;
var app=getApp();
//全局计时器，用于动态渲染
let currentInterval = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src:"",
    musicName:"test",
    author:"",
    playState:"play",
    //总时间参数
    musicTime1:"",
    musicTime2:"",
    //当前时间参数
    musicTime3:"",
    musicTime4:"",
    //进度条进度参数
    sliderLength:0,
    sliderCurLength:0,
    playimgData:[],
    songData:[],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1/images/",
    //后台请求路径
    httpUrl: "http://127.0.0.1/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) 
  {
    let that = this
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType',
      data:{
        imagetype:"playmusic"
      },
      header:{
        "content-type":"application/json"
      },
      success(res){
        if(res.data.code==0)
        {
          that.setData({
            playimgData:res.data.data
          })
        }
        else{}
        
      }
    })
    let m_url=decodeURIComponent(options.musicUrl);
    let m_name=options.musicName;
    let m_img=decodeURIComponent(options.musicImg);
    let m_author=options.author;
    musicIndex=parseInt(options.musicID);
    console.log(musicIndex);
    
    //console.log(options.musicName);
    this.setData({
      musicName:m_name,
      src:m_img,
      author:m_author,
      sliderCurLength:0
    })
    bgam.src = m_url;
  //默认在页面加载完成后判断是否开始播放
  //console.log("test out.");
  //获取歌曲时间
  bgam.onCanplay(function getDuration()
  {
    let intervalID =setInterval(function()
    {
      if(bgam.duration!==0)
    {
      //定时器清除
      loadReady=1;
      totalTime=bgam.duration;
      clearInterval(intervalID);
    }
    },500);  
  }
  );

  //缓冲加载
  let setTime=setTimeout(()=>
  {
    //console.log("settime");
    var time1 = parseInt(totalTime/60);
    var time2 = parseInt(totalTime%60);
    if(time1<10){time1="0"+time1;}
    if(time2<10){time2="0"+time2;}
    var timeToSlider = parseInt(totalTime*10);
    this.setData({
      //设置总时间及进度条时间帧
      musicTime1:time1,
      musicTime2:time2,
      sliderLength:timeToSlider
    })
    clearTimeout(setTime);
  }, 1500);
  //动态渲染数据
  currentInterval = setInterval(()=>
{
  currentTime=bgam.currentTime;
  var time3 = parseInt(currentTime/60);
  var time4 = parseInt(currentTime%60);
  if(time3<10){time3="0"+time3;}
  if(time4<10){time4="0"+time4;}
  if(loadReady===1&&id===1)
  {
    if(currentTime<totalTime)
    {
    this.setData({
     musicTime3:time3,
     musicTime4:time4,
     sliderCurLength:this.data.sliderCurLength+1
        })
    }
    else
    { 
      this.setData({
        playState:"pause"
      })
    }
  }
    }, 100);
  bgam.play();
},
	//控制音乐播放暂停的方法
	music: function () {
	//判断id的初始值是多少(id初始值给的是1代表播放)
    if (id == 1) {
      //如果id等于一的话代表正在播放就用.pause的方法暂停，然后再给id赋值为0代表音乐暂停
      //清除计时器，停止渲染
      clearInterval(currentInterval);
      bgam.pause();
      this.setData({
        playState:"pause"
      });
      id = 0;
    } else {
      //如果id不等于一的话代表音乐暂停就用.play的方法播放，然后再给id赋值为1代表音乐播放
      //重新生成
      currentInterval = setInterval(()=>
      {
        currentTime=bgam.currentTime;
        var time3 = parseInt(currentTime/60);
        var time4 = parseInt(currentTime%60);
        if(time3<10){time3="0"+time3;}
        if(time4<10){time4="0"+time4;}
        if(loadReady===1)
        {
          if(currentTime<totalTime)
          {
          this.setData({
           musicTime3:time3,
           musicTime4:time4,
           sliderCurLength:this.data.sliderCurLength+1
              })
          }
          else
          { 
            this.setData({
              playState:"pause"
            })
          }
        }
          }, 100);
      bgam.play();
      this.setData({
        playState:"play"
      });
      id = 1;
  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  nextMusic:function()
  {
    let that = this
    if(musicIndex!==36)    //是否到顶
    {
    musicIndex=musicIndex+1;
    //根据id请求下一曲
    wx.request({
      url: that.data.httpUrl + 'song/querySongsById',
      data:{
        id:musicIndex
      },
      header:{
        "content-type":"application/json"
      },
      success(res)
      {
        if(res.data.code==0){
          that.setData({
            songData:res.data.data
          })
          console.log(that.songdata)
        }
        else{}
      }
    })
    console.log(that.data.songData)
    clearInterval(currentInterval);
    bgam.stop();
    bgam.src = that.data.songData.songurl;
    //获取歌曲时间
    bgam.onCanplay(function getDuration()
    {
      let intervalID =setInterval(function()
      {
        if(bgam.duration!==0)
      {
        //定时器清除
        loadReady=1;
        totalTime=bgam.duration;
        clearInterval(intervalID);
      }
      },500);  
    }
    );
    //缓冲加载
    let setTime=setTimeout(()=>
    {
      //console.log("settime");
      var time1 = parseInt(totalTime/60);
      var time2 = parseInt(totalTime%60);
      if(time1<10){time1="0"+time1;}
      if(time2<10){time2="0"+time2;}
      var timeToSlider = parseInt(totalTime*10);
      this.setData({
        //设置总时间及进度条时间帧
        musicTime1:time1,
        musicTime2:time2,
        sliderLength:timeToSlider
      })
      clearTimeout(setTime);
    }, 1500);
    //动态渲染数据
    currentInterval = setInterval(()=>
  {
    currentTime=bgam.currentTime;
    var time3 = parseInt(currentTime/60);
    var time4 = parseInt(currentTime%60);
    if(time3<10){time3="0"+time3;}
    if(time4<10){time4="0"+time4;}
    if(loadReady===1&&id===1)
    {
      if(currentTime<totalTime)
      {
      this.setData({
       musicTime3:time3,
       musicTime4:time4,
       sliderCurLength:this.data.sliderCurLength+1
          })
      }
      else
      { 
        this.setData({
          playState:"pause"
        })
      }
    }
      }, 100);
    that.setData({
      src:that.data.songData.image.url,
      musicName:nextName,
      author:nextAuthor,
      playState:"play",
      sliderCurLength:0
    });
    bgam.play();
  }
  },

  lastMusic:function() 
  {
    if(musicIndex!==1)    //是否到底
    {
    musicIndex=musicIndex-1;
    clearInterval(currentInterval);
    bgam.stop();
    var lastName=app.globalData.song_detail[musicIndex+1].musicName;
    var lastSrc=app.globalData.song_detail[musicIndex+1].musicUrl;
    var lastAuthor=app.globalData.song_detail[musicIndex+1].name;
    var lastImg=app.globalData.song_detail[musicIndex+1].src;
    bgam.src = lastSrc;
    //获取歌曲时间
    bgam.onCanplay(function getDuration()
    {
      let intervalID =setInterval(function()
      {
        if(bgam.duration!==0)
      {
        //定时器清除
        loadReady=1;
        totalTime=bgam.duration;
        clearInterval(intervalID);
      }
      },500);  
    }
    );
    //缓冲加载
    let setTime=setTimeout(()=>
    {
      //console.log("settime");
      var time1 = parseInt(totalTime/60);
      var time2 = parseInt(totalTime%60);
      if(time1<10){time1="0"+time1;}
      if(time2<10){time2="0"+time2;}
      var timeToSlider = parseInt(totalTime*10);
      this.setData({
        //设置总时间及进度条时间帧
        musicTime1:time1,
        musicTime2:time2,
        sliderLength:timeToSlider
      })
      clearTimeout(setTime);
    }, 1500);
    //动态渲染数据
    currentInterval = setInterval(()=>
  {
    currentTime=bgam.currentTime;
    var time3 = parseInt(currentTime/60);
    var time4 = parseInt(currentTime%60);
    if(time3<10){time3="0"+time3;}
    if(time4<10){time4="0"+time4;}
    if(loadReady===1&&id===1)
    {
      if(currentTime<totalTime)
      {
      this.setData({
       musicTime3:time3,
       musicTime4:time4,
       sliderCurLength:this.data.sliderCurLength+1
          })
      }
      else
      { 
        this.setData({
          playState:"pause"
        })
      }
    }
      }, 100);
    this.setData({
      src:lastImg,
      musicName:lastName,
      author:lastAuthor,
      playState:"play",
      sliderCurLength:0
    });
    bgam.play();
  }
  },
  sliderChange: function(e)
  {
    var newSlider = e.detail.value;
    var sliderTime=e.detail.value/10;
    console.log(sliderTime);
    bgam.seek(sliderTime);
    this.setData({
      sliderCurLength:newSlider
    })
  },

  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    //console.log("test out unioad");
    bgam.stop();
    id=0;
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