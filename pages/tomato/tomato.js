// pages/tomato/tomato.js
Page({
  data: {
    defaultSecond : 5,
    time : undefined,
    timer : null,
    status : "stop",
    visibleConfirm : false,
    againButton : false
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
  onShow(){   //钩子
    this.startTimer()
  },
  showConfirm(){
    this.setData({ visibleConfirm : true})
  },
  confirmAbandon(){
    this.cancel()
  },
  cancel(){
    this.setData({ visibleConfirm : false})
  }
})