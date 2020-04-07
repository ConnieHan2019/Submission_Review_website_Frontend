<script>
export default {
  name: 'Information',
  data(){
    return{
      personalInformation:{
              username:'ZZYYRR',
              fullname:'张育茹',
              email:'zhangyuru@fudan.edu.cn',
              sector:'Fudan',
              country:'China'
      }
    }
  },
    created:function(){
        this.$axios.post('/personalInformation',{
            username:this.$store.state.userDetails
        })
        .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("personalInformation")){
                this.personalInformation = resp.data.personalInformation
            }
            else{
                console.log('会议信息加载失败')
            }
        })
        .catch(error => {
            console.log(error)
        })
    },
  methods:{
    
  }

}
</script>

<template>
<div id = "Information">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span><b><i class="el-icon-postcard"></i>基本信息</b></span>
  </div>
  <div class="text item">
    <i class="el-icon-user-solid"></i>用户名：{{personalInformation.username}}
  </div>
  <div class="text item">
   <i class="el-icon-user"></i>姓名：{{personalInformation.fullname}}
  </div>
  <div class="text item">
    <i class="el-icon-message"></i>邮箱：{{personalInformation.email}}
  </div>
  <div class="text item">
    <i class="el-icon-place"></i>单位：{{personalInformation.sector}}
  </div>
  <div class="text item">
    <i class="el-icon-location-information"></i>区域：{{personalInformation.country}}
  </div>
</el-card>
</div>
</template>

<style scoped>
  .text {
    font-size: 14px;
    text-align:left;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .clearfix{
    font-size:20px;
  }
  .box-card {
    width:350px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);
    margin:auto
  }
</style>