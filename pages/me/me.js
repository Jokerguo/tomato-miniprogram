const {http} = require("../../util/http")
// pages/me/me.js
Page({
  data: {
    tab : "tomato",
    tomatoes:{},
    todos:{}
  },

  changeTab(event){
    this.setData({tab : event.currentTarget.dataset.name})
  },
  fetchTomatoes(){
    http.get('/tomatoes',{is_group : "yes"})
      .then(response => {
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
    this.fetchTomatoes()
    this.fetchTodos()
  },
})