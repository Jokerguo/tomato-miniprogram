Page({
  data: {
    account: "",
    password: "",
  },
  watchAccount(event){
    this.setData({ account: event.detail.value })
  },
  watchPassword(event){
    this.setData({ password: event.detail.value })
  },
})