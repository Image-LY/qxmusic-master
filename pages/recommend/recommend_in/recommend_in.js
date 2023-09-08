// pages/recommend/recommend_in/recommend_in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songData:[],
    playimgData:[],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1/images/",
    //后台请求路径
    httpUrl: "http://127.0.0.1/"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var listID=options.listID;
    var that = this
      //歌曲信息请求(根据歌单id)
      wx.request({
        url: that.data.httpUrl + 'song/querySongsByListId',
        data:{
          id:listID
        },
        header:{
          "content-type":"application/json"
        },
        success(res){
          if(res.data.code==0){
            console.log(res.data)
            that.setData({
              songData:res.data.data
            })
          }
          else{}
        }
      })
      //播放按钮素材请求
      wx.request({
        url: that.data.httpUrl + 'image/queryImageByType',
        data:{
          imagetype:'play'
        },
        header:{
          'content-type':'application/json'
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  playsong:function(events)
  {
    //console.log(events);
    //console.log(events.currentTarget.dataset.musicurl);
    let m_name=events.currentTarget.dataset.musicname;
    let m_url=events.currentTarget.dataset.musicurl;
    let m_img=events.currentTarget.dataset.musicimg;
    let m_author=events.currentTarget.dataset.author;
    let m_ID=events.currentTarget.dataset.musicid;
    wx.navigateTo({
      //encodeURIComponent()方法使参数忽略，维护地址完整性
      url: '/pages/playpage/playpage?author='+m_author+'&musicID='+m_ID+'&musicName='+m_name+'&musicUrl='+encodeURIComponent(m_url)+'&musicImg='+encodeURIComponent(m_img),
      //url: '/pages/playpage/playpage?musicurl='+m_url,
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