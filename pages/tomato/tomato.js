const {http} = require('../../util/http')
// pages/tomato/tomato.js
Page({
  data: {
    defaultSecond : 1500,
    time : undefined,
    timer : null,
    status : "stop",
    visibleConfirm : false,
    againButton : false,
    tomato : {}
  },
  getTime(){
    let {defaultSecond} = this.data
    let m = Math.floor(defaultSecond / 60)
    let s = Math.floor(defaultSecond % 60)
    if(s === 0){
      s += "0"
    }
    if((s+"").length === 1){
      s = "0" + s
    }
    if((m+"").length === 1){
      m = "0" + m
    }
    return `${m}:${s}`
  },
  startTimer(){
    if(this.data.defaultSecond === 0){return}
    this.setData({status: 'stop'})
    this.data.timer = setInterval(() => {
      this.data.defaultSecond --
      this.setData({time : this.getTime()})
      if(this.data.defaultSecond === 0){
        this.stopTimer()
        this.setData({againButton: true})
      }
    }, 1000);
  },
  stopTimer(){
    this.setData({status: 'start'})
    clearInterval(this.data.timer)
  },
  againTimer(){
    this.setData({defaultSecond : 1500})
    this.startTimer()
    this.setData({againButton: false})
  },
  showConfirm(){
    this.setData({ visibleConfirm : true})
    this.stopTimer()
  },
  confirmAbandon(event){
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`,{
        description: content, 
        aborted: true 
      })
      this.setData({ visibleConfirm : false})
    wx.navigateBack({
      to : -1
    })
  },
  cancelAbandon(){
    this.setData({ visibleConfirm : false})
    this.startTimer()
  },
  onShow(){   //钩子
    this.startTimer()
    http.post('/tomatoes')
      .then(response =>{
        console.log(response)
        this.setData({tomato : response.response.data.resource})
      })
  },
  onHide(){
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description: "退出放弃", 
      aborted: true 
    })
    clearInterval(this.data.timer)
  },
  onUnload(){
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description: "退出放弃", 
      aborted: true 
    })
    clearInterval(this.data.timer)
  }
})