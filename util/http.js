const {host,t_app_id,t_app_secret} = getApp().globalData

const ajax = (method,url,data)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `${host}${url}`,
      data: data,
      method: method,
      header: {
        Authorization : `Bearer ${wx.getStorageSync('X-token')}`,
        "t-app-id":t_app_id,
        "t-app-secret":t_app_secret,
      },
      dataType : 'json',
      success (response) {
        let statusCode = response.statusCode
        if(statusCode >= 400){
          if(statusCode === 401){
            wx.redirectTo({
              url: "/pages/login/login",
            })
          }
          reject({statusCode,response})
        }else{
          resolve({statusCode,response})
        }
      },
      fail(error){
        wx.showToast({title: '请求失败', icon : "none"})
        reject(error)
      },
    })
  })
}

const http = {
  get: (url, params) => ajax('GET', url, params),
  post: (url, data) => ajax('POST',url, data),
  put: (url,data) =>  ajax('PUT',url, data),
  delete: (url, data) =>  ajax('DELETE', url, data) 
}

module.exports = {http}