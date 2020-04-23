const {http} = require("../../util/http")
// pages/me/me.js
Page({
  data: {
    tab : "task",
    tomatoes:{},
    todos:{},
    me : {}
  },

  changeTab(event){
    this.setData({tab : event.currentTarget.dataset.name})
  },
  fetchTomatoes(){
    http.get('/tomatoes',{is_group : "yes"})
      .then(response => {
        console.log(response)
        this.setData({ tomatoes: response.response.data.resources })
      })
  },
  fetchTodos(){
    http.get('/todos',{is_group : "yes"})
      .then(response => {
        this.setData({ todos: response.response.data.resources })
      })
  },
  onShow(){
    this.setData({me : wx.getStorageSync('me')}) 
    this.fetchTomatoes()
    this.fetchTodos()
  },
})