const logindata = require("../../logindata");

Page({
  data:{
    item:0,
    tab:0,
    tabsIndex: 0,
    match: [],
    logindata,
    showDialog: false,
    showDialog1: false,
    newMatch: {
      name: "",
      startmonth: "",
      startday: "",
      information: "",
      address:"",
      manager:"",
      joined:[],
    },
    avatarUrl: ""
  },
  onLoad() {
    const nickname = wx.getStorageSync('nickname') || "";
    const avatarUrl = wx.getStorageSync('avatarUrl') || "";
    const storedMatch = wx.getStorageSync('match') || [];
    this.setData({
      logindata: {
      name: nickname,
      },
      avatarUrl: avatarUrl,
      match: storedMatch,
      'newMatch.manager': nickname,
    });
    
  },

  banner1(e){
    this.setData({
      showDialog1: !this.data.showDialog1
    });
  },
  banner2(e){
    this.setData({
      showDialog2: !this.data.showDialog2
    });
  },
  banner3(e){
    this.setData({
      showDialog3: !this.data.showDialog3
    });
  },

  outlogin(){
    this.setData({
      logindata: {
        name: "",
        },
        avatarUrl: null,
    }),
    wx.setStorageSync('avatarUrl',null);
    wx.setStorageSync('nickname', );
  },

  changeItem(e) {
    this.setData({
      item: e.target.dataset.item
    });
	},
	handleTabsChange(e) {
     this.setData({
       tab:e.detail.current
     })
  },

  handleGoDetail(e) {
    const id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
      
    }); 
  },
  handleGoLogin() {
    wx.navigateTo({
      url: "/pages/login/login"
    }); 
  },
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },

  onInput: function(event) {
    const value = event.detail.value; 
    const dataType = event.currentTarget.dataset.type;
    let newMatch = this.data.newMatch;

    switch (dataType) {
      case 'name':
        newMatch.name = value;
        break;
      case 'startmonth':
        newMatch.startmonth = value;
        break;
      case 'startday':
        newMatch.startday = value;
        break;
      case 'information':
        newMatch.information = value;
        break;
        case 'address':
          newMatch.address = value;
          break;
      default:
        break;
    }

    this.setData({
      newMatch
    });
  },

  addItemToList() {
    if(this.data.logindata.name==""){
      wx.showToast({
        title:"请先登入",
        icon: 'none'
      })
    }else{
    let newMatch = this.data.newMatch;

    const newEvent = {
      ...newMatch,
      id: this.data.match.length + 1 
    };

  const updatedMatch = [...this.data.match, newEvent];

  wx.setStorageSync('match', updatedMatch);
    this.setData({
      showDialog: false, 
      newMatch: { 
        name: "",
        startmonth: "",
        startday: "",
        address:"",
        information: "",
        manager: this.data.logindata.name,
      },
      match: updatedMatch,
    });
  }
  }
});