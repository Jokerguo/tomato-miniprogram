// pages/me/me.js
Page({
  data: {
    tab : "tomato",
    lists : {
      "本周四" : [
        {id :1, text : '我干了什么啊', time : "14:00"},
        {id :2, text : '嘿嘿', time : "15:00"}
      ],
      "本周五" : [
        {id :3, text : '震惊', time : "14:00"}
      ],
      "本周六" : [
        {id :4, text : '啥也不是，不要问我', time : "15:00"}
      ]
    },
  },

  changeTab(event){
    this.setData({tab : event.currentTarget.dataset.name})
  },
})