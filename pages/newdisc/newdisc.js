// pages/newdisc/newdisc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    httpUrl:'http://127.0.0.1/',
    httpImageUrl:'http://127.0.0.1/images/',
    songlistData:[],
    bannerData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    //轮播图请求
    wx.request({
      url: that.data.httpUrl + 'image/queryImageByType', //发送请求
      data: {
      imagetype: 'diskbanner'//传递数据
      },
      header: {
      'content-type': 'application/json' // 默认值
      },
      success(res) {
      if (res.data.code == 0) { //说明请求成功，把返回的数据，
        that.setData({
        //设置给data中的bannerData
        bannerData: res.data.data
        })
        } else { //失败 提示 失败原因
        }
        }
        })
    //歌曲分类信息请求
    wx.request({
      url: that.data.httpUrl + 'newdisk/getAllListInfo',
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        if(res.data.code==0){
          that.setData({
            songlistData:res.data.data
          })
        }
        else{}
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  more:function(events)
  {
    console.log(events)
    let listID=events.currentTarget.dataset.newdisc.diskid;
    wx.navigateTo({
      url: '/pages/newdisc/newdisc_in/newdisc_in?listID='+listID,
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