const {http} = require('../../util/http')
// pages/home/home.js
Page({
  updatedId : '',
  updatedIndex : '',
  data: {
    lists:[],
    visibleConfirm : false,
    visibleUpdatedConfirm : false,
    updatedContent : "",
  },
  updatedText(event){
     let {id,index,content} = event.currentTarget.dataset
     this.updatedId = id
     this.updatedIndex = index
    this.setData({visibleUpdatedConfirm : true,updatedContent : content})
  },
  updatedConfirm(event){
    let content = event.detail
    http.put(`/todos/${this.updatedId}`,{
      description : content
    })
      .then(response =>{
        this.data.lists[this.updatedIndex] =  [response.response.data.resource]
          this.setData({lists: this.data.lists})
        this.hideUpdatedConfirm()
      })
  },
  hideUpdatedConfirm(){
    this.setData({visibleUpdatedConfirm : false})
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