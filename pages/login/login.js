const logindata = require("../../logindata");
const defaultAvatar = '/images/avatar.png'
Page({
  data: {
  logindata,
  avatarUrl: defaultAvatar,
  nickname: "",
  },
  onChooseAvatar: function (e) {
    const {avatarUrl} = e.detail 
    this.setData({avatarUrl})
    wx.setStorageSync('avatarUrl', avatarUrl);
  },

  onLoad() {
    const storedAvatarUrl = wx.getStorageSync('avatarUrl');
    if (storedAvatarUrl) {
      this.setData({
        avatarUrl: storedAvatarUrl
      });
    }
  },
  handleInputNickname: function (e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  handleGoIndex: function () {
    const nickname = this.data.nickname;
    
    if (nickname) {
      wx.setStorageSync('nickname', nickname);
      
      wx.navigateTo({
        url: "/pages/index/index"
      });
      
    } else {
      wx.showToast({
        title: '请输入昵称',
        icon: 'none'
      });
    }
  },

})