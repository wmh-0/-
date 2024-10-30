
const logindata = require("../../logindata");
Page({
  data: {
    allmatch:[],
    match: [],
    logindata,
    name:"",
  },
  onLoad({id}) {
    console.log(id);
    const nickname = wx.getStorageSync('nickname') || "";
    const storedMatch = wx.getStorageSync('match') || [];
    const match= storedMatch.find(s => s.id == id);
    this.setData({
      logindata: {
        name: nickname,
        },
      match: match,
      allmatch:storedMatch,
    });
    
    
  },
  join(e) {
    const matchId = this.data.match.id; 
    const name = this.data.logindata.name; 
    if (this.data.match.id === matchId) {
      let joinedValues = this.data.match.joined || [];
      if (!joinedValues.includes(name)) {
        joinedValues.push(name);
        const updatedMatch = {
          ...this.data.match,
          joined: joinedValues
        };
        this.setData({
          match: updatedMatch
        });
        let storedMatches = wx.getStorageSync('match') || [];
        const matchIndex = storedMatches.findIndex(s => s.id == matchId);
        if(this.data.logindata.name==""){
          wx.showToast({
            title:'请先登入',
            icon: 'none'
          });
        }else if (matchIndex !== -1) {
          storedMatches[matchIndex] = updatedMatch;
          wx.setStorageSync('match', storedMatches);
          wx.navigateTo({
            url: "/pages/index/index"
          });
          wx.showToast({
            title:'已成功报名',
          });
        }
      } else {
        wx.showToast({
          title:'你已经加入了',
          icon: 'none'
        });
      }
    }

  }

}) 
