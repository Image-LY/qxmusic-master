// pages/songlist_more/songlist_more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchText:'',
    songData:[],
    playimgData:[],
    searchingData:[],
    //后台图片路径
    httpImageUrl: "http://127.0.0.1/images/",
    //后台请求路径
    httpUrl: "http://127.0.0.1/"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  test:function(){
  },

  onLoad(options) {
    let that = this
    //歌曲信息请求
    wx.request({
      url: that.data.httpUrl + 'song/getAllSongInfo',
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
        if(res.data.code==0){
          that.setData({
            songData:res.data.data
          })
        }
        else{
        }
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
    //搜索按钮素材请求
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType',
      data:{
        imagetype:'search'
      },
      header:{
        'content-type':'application/json'
      },
      success(res){
        if(res.data.code==0)
        {
          that.setData({
            searchimgData:res.data.data
          })
        }
        else{}
      }
    })
  },


  playsong:function(events)
  {
    console.log(events);
    let m_url = events.currentTarget.dataset.item.songurl
    let m_name = events.currentTarget.dataset.item.name
    let m_img = events.currentTarget.dataset.item.image.url
    let m_author = events.currentTarget.dataset.item.singer
    let m_ID = events.currentTarget.dataset.item.songid
    wx.navigateTo({
      //encodeURIComponent()方法使参数忽略，维护地址完整性
      url: '/pages/playpage/playpage?musicUrl='+encodeURIComponent(m_url)+'&musicName='+m_name+'&musicImg='+encodeURIComponent(m_img)+'&author='+m_author+'&musicID='+m_ID,
      //url: '/pages/playpage/playpage?musicurl='+m_url,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  search(){
    let that = this.data.searchText
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