// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankData:[],
    rankimgData:[],
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
    //请求排行榜信息
      wx.request({
        url: that.data.httpUrl + 'rank/queryByContentId',
        header:{
          "content-type":"application/json"
        },
        success(res){
          if(res.data.code==0){
            that.setData({
              rankData:res.data.data
            })
          }
          else{}
        }
      })
    //请求排行榜图片(上方)
      wx.request({
        url: that.data.httpUrl+ 'rank/getAllListInfo',
        header:{
          "content-type":"application/json"
        },
        success(res){
          that.setData({
            rankimgData:res.data.data
          })
        }
      })
  },
  more:function(events){
    console.log(events)
    let listID=events.currentTarget.dataset.listid.rankid;
    wx.navigateTo({
      url: '/pages/rank/rank_in/rank_in?listID='+listID,
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