const {http} = require('../../util/http')
const {app_id , app_secret} = getApp().globalData
  //点击按钮 => 调用小程序原生的 wx.login => 参数 => http.post => 返回 user
  // => 保存user => 返回首页
Page({
  login(event){
    let iv = event.detail.iv
    let encrypted_data = event.detail.encryptedData
    wx.login({
      success (res) {
        let code = res.code
        http.post("/sign_in/mini_program_user",{
          code,
          iv,
          encrypted_data ,
          app_id ,
          app_secret
        })
          .then(response =>{
            wx.setStorageSync('me', response.response.data.resource)
            wx.setStorageSync('X-token', response.response.header["X-token"])
            wx.reLaunch({
              url: "/pages/home/home"
            })
          })
        }
    })
  },
})