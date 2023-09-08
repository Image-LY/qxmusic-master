// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
		login: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //获取本地缓存的用户信息
      wx.getStorage({
        key: "userInfo",
        success: res =>{
          this.setData({
            userInfo: res.data,
            login:true
          })
          console.log(this.data.userInfo)
        },
        fail:  res => {
          console.log('获取本地缓存失败')
          console.log(res)
          console.log(res.data)
        }
      })
  },
  //登录
  getUserProfile(e) {
    wx.getUserProfile({
    desc: '用于完善会员资料',
    success: (res) => {
      console.log("用户信息：",res.userInfo);
      wx.setStorage({
        key:"userInfo",
        data:res.userInfo
      })
      setTimeout(() => {
        wx.getStorage({
          key: "userInfo",
          success: res =>{
            this.setData({
              userInfo: res.data,
              login:true
            })
          },
          fail:  res => {
            console.log('获取本地缓存失败')
          }
        })
      }, 1000)
    }
    })
    },
  //登出
  exitUserAccount(){
    this.setData({
      login:false,
      userInfo:{}
    })
    wx.clearStorage()
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