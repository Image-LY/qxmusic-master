// pages/recommend/recommend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl:'http://127.0.0.1/',
    httpImageUrl:'http://127.0.0.1/images/',
    songlistData:[],
    moreimgData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    //歌单信息请求
    wx.request({
      url: that.data.httpUrl + 'songlist/getAllListInfo',
      header:{
        "content-type":"application/json"
      },
      success(res){
        if(res.data.code==0){
          console.log(res.data)
          that.setData({
            songlistData:res.data.data
          })
        }
        else{}
      }
    })
    //歌单展开按钮图片请求
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType',
      data:{
        imagetype:"more"
      },
      header:{
        "content-type":"application/json"
      },
      success(res){
        that.setData({
          moreimgData:res.data.data
        })
      }
    })
  },

more:function(events){
  let listID=events.currentTarget.dataset.songlistdata.listid;
  wx.navigateTo({
    url: '/pages/recommend/recommend_in/recommend_in?listID='+listID,
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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