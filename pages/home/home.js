const {http} = require('../../util/http')
// pages/home/home.js
Page({
  data: {
    lists:[],
    visibleConfirm : false
  },
  showConfirm(){
    this.setData({visibleConfirm : true})
  },
  confirm(event){
    let content = event.detail
    if(content){
      http.post('/todos',{
        description: content
      })
        .then(response =>{
          console.log(response.response.data.resource)
          let todo = [response.response.data.resource]
          this.data.lists = todo.concat(this.data.lists)
          this.setData({lists : this.data.lists})
          this.hideConfirm()
        })
    }
  },
  destoryTodo(event){
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed : true
    }).then(response =>{
      let todo = response.response.data.resource
      this.data.lists[index] = todo
      this.setData({lists : this.data.lists})
    })
    
  },
  hideConfirm(){
    this.setData({visibleConfirm : false})
  },

  onShow(){
    http.get('/todos')
      .then(response=>{
        this.setData({lists : response.response.data.resources})
      })
  }
})