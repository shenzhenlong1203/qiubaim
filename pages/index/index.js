//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto:  '天王盖地虎, ' +
            '小鸡炖蘑菇\n' +
            '宝塔镇河妖, ' +
            '蘑菇放辣椒\n' +
            '河妖使大招, ' +
            '二楼弯下腰\n' +
            '莫愁不开怀, ' +
            '二楼多人才\n' + 
            '铝钛合金眼,' +
            '贞操已走远\n' +
            '屌丝变色狼,' +
            '色狼变流氓\n' +
            '宅男寻腐女,' +
            '腐女多有郎\n' +
            '恨未逢时生,' +
            '前路何凄凉\n' +
            '寻她千百度,' +
            '千里聚一堂\n' +
            '只因梦太短,' +
            '起来洗把脸\n' +
            '工作一天天,' +
            '如厕赛神仙\n' +
            '若问哥乐啥,' +
            '糗友遍天涯',
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              that.setData({
                userInfo: res.userInfo
              })
              console.log(that.data.userInfo)
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      this.onLoad()
    } else {
      //用户按了拒绝按钮
    }
  }
})
