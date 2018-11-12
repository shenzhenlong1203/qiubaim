//news.js
var util = require('../../utils/util.js')
Page({
  data: {
    hideHeader: true,
    hideBottom: true,
    refreshTime: '', // 刷新的时间 
    contentlist: [], // 列表显示的数据源
    allPages: '',    // 总页数
    currentPage: 1,  // 当前页数  默认是1
    loadMoreData: '加载更多……'
  },
  onLoad: function () {
    var date = new Date();
    this.setData({
      refreshTime: date.toLocaleTimeString()
    })
    this.getData()
  },
  /*获取信息*/
  getData: function () {
    var self = this;
    var pageIndex = self.data.currentPage || 1;
    wx.request({
      header: {
        'Content-Type': 'application/json'
      },
      url: "https://m2.qiushibaike.com/article/list/text",
      data: { page: pageIndex, count: 30},

      success: function (res) {
        if (pageIndex == 1) { // 下拉刷新
          self.setData({
            allPages: res.data.total / res.data.count,
            contentlist: res.data.items,
            hideHeader: true
          })
        } else { // 加载更多
          self.setData({
            allPages: res.data.total / res.data.count,
            contentlist: res.data.items,
            hideBottom: true
          })
        }
      }
    })
  },
  // 上拉加载更多
  loadMore: function () {
    var self = this;
    // 当前页是最后一页
    if (self.data.currentPage == self.data.allPages) {
      self.setData({
        loadMoreData: '已经到顶'
      })
      return;
    }
    setTimeout(function () {
      var tempCurrentPage = self.data.currentPage;
      tempCurrentPage = tempCurrentPage + 1;
      self.setData({
        currentPage: tempCurrentPage,
        hideBottom: false
      })
      self.getData();
    }, 300);
  },
  // 下拉刷新
  refresh: function (e) {
    var self = this;
    setTimeout(function () {
      var date = new Date();
      self.setData({
        currentPage: 1,
        refreshTime: date.toLocaleTimeString(),
        hideHeader: false
      })
      self.getData();
    }, 300);
  }
})