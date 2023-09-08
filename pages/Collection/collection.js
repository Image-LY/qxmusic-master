// pages/Collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    height:0,
    httpUrl:'http://127.0.0.1/',
    httpImageUrl:'http://127.0.0.1/images/',
    coimgData:[],
    content: [
      {text: "歌曲"},
      {text: "专辑"},
      {text: "歌单"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this;
    wx.request({
      url: that.data.httpUrl + '/image/queryImageByType',
      data:{
        imagetype:"coimg"
      },
      header:{
        "content":"application/json"
      },
      success(res){
        if(res.data.code==0){
          that.setData({
            coimgData:res.data.data
          })
        }
        else{}
      }
    })
    wx.getSystemInfo({
      success (res) {
        that.setData({
          height :res.windowHeight
        })
      }
    })
  },

  checkItem(e) {
    const that = this;
    if (this.data.currentIndex === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentIndex: e.target.dataset.index
      })
    }
  },

  changeTab(e) {
    const that = this;
    that.setData({
      currentIndex:e.detail.current
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