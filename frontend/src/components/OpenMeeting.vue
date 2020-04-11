<script>
export default{
    name:'OpenMeeting',
    props:['contactName'],
    data(){
        return{
            contactInformation:{
              shortname:'shortname',
              fullname:'fullname',
              deadline:'2020-12-08',
              resultReleaseTime:'2021-1-1',
              organizationTime: '2021-2-1',
              place: 'China',
              state:false
            }
        }
    },
    created:function(){
        this.$axios.post('/contactInformation',{
            contactFullName:this.contactName
        })
        .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("contactInformation")){
                this.contactInformation = resp.data.contactInformation
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
        open(){
        if(new Date(this.contactInformation.deadline).getTime() > new Date().getTime()){
            this.$axios.post('/openMeeting',{
            contactFullName:this.contactName
        })
        .then(resp => {
            if (resp.status === 200){
                this.$message({
                message:'开启会议成功',
                type:'success'
                })
                this.contactInformation.state = true
            }
            else{
              this.$message.error('开启会议失败')
              console.log(resp)
            }
        })
        .catch(error => {
              this.$message.error('开启会议失败')
            console.log(error)
        })
          }
          else{
            this.$message.error('已过投稿截止时间，无法再开启会议')
          } 
        }
    }
}
</script>

<template>
<div id='OpenMeeting'>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>会议基本信息</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click='open' :disabled='contactInformation.state'>开启会议</el-button>
  </div>
  <div class="text item">
    <i class="el-icon-s-opportunity"></i><b>会议简称：</b>{{contactInformation.shortname}}
  </div>
  <div class="text item">
   <i class="el-icon-s-opportunity"></i><b>会议全称：</b>{{contactInformation.fullname}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i><b>投稿截止日期：</b>{{contactInformation.deadline}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i><b>结果发布日期：</b>{{contactInformation.resultReleaseTime}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i><b>举办时间：</b>{{contactInformation.organizationTime}}
  </div>
  <div class="text item">
    <i class="el-icon-location"></i><b>举办地点：</b>{{contactInformation.place}}
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

  .box-card {
    width: 350px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);
    margin:auto;
    margin-top:30px;
  }
</style>