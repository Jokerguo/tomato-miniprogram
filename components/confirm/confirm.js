Component({
  properties:{
    placeholder:{
      type: String,
      value: ''
    },
    visible:{
      type : Boolean,
      value : false
    },
    content :{
      type : String,
      value : ""
    }
  },
  data:{
    value: ''
  },
  lifetimes : {
    attached(){
      if(this.properties.content){
        this.properties.content = this.data.value
      }
    }
  },
  methods:{
    confirm(){
      if(this.properties.content){
      this.triggerEvent('confirm',this.properties.content)
      }
      this.triggerEvent('confirm',this.data.value)
    },
    cancel(){
      this.triggerEvent('cancel')
    },
    watchValue(event){
      this.data.value = event.detail.value
    }
  }
})