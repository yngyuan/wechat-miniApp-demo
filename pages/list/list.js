// pages/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {
    list:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/listarea',
      method: 'GET',
      data: {},
      success: function(res){
        var list = res.data.areaList;
        if(list==null){
          var toastText = 'get area list faied';
          wx.showToast({
            title: toastText,
            icon:'',
            duration: 2000,
          });
        } else{
          that.setData({
            list: list
          })
        }
      }
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  addArea: function(){
    wx.navigateTo({
      url: '../operation/operation',
    })
  },

  deleteArea: function(e){
    var that = this;
    wx.showModal({
      title: 'Note',
      content: 'are you sure to delete ['+e.target.dataset.areaname+']?',
      success: function(sm) {
        if(sm.confirm){
          wx.request({
            url:'http://127.0.0.1:8080/demo/superadmin/removearea',
            data:{"areaId": e.target.dataset.areaid},
            method: 'GET',
            success: function(res){
              var result = res.data.success;
              var toastText = "delete success!";
              if (result != true){
                toastText="delete failed!";
              } else{
                that.data.list.splice(e.target.dataset.index, 1)
                that.setData({
                  list: that.data.list
                });
              }
              wx.showToast({
                title: toastText,
                icon:'',
                duration: 2000
              });
            }
          })
        }
      }
    })
  }
})