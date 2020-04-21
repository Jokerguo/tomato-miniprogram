// pages/home/home.js
Page({
  data: {
    lists:[
      {id: 1, text : "我完成了这个", finished: true},
      {id: 2, text : "我在写测试", finished: true},
      {id: 3, text : "嘻嘻嘻", finished: false},
      {id: 4, text : "哈哈哈", finished: false},
      {id: 5, text : "你好啊", finished: false},
    ],
    visibleConfirm : false
  },
  showConfirm(){
    this.setData({visibleConfirm : true})
  },
  confirm(event){
    let content = event.detail
    console.log(event)
    if(content){
      console.log(2)
      let todo = [{id: 6, text : content, finished: false}]
      this.data.lists = todo.concat(this.data.lists)
      this.setData({lists : this.data.lists})
      this.hideConfirm()
    }
  },
  destoryTodo(event){
    let index = event.currentTarget.dataset.index
    this.data.lists[index].finished = true
    this.setData({lists: this.data.lists})
    
  },
  hideConfirm(){
    this.setData({visibleConfirm : false})
  },
  
})