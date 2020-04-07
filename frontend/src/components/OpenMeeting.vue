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
              place: 'China'
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
            //验证是否过时
            this.$message({
                message:'成功',
                type:'success'
            })
        }
    }
}
</script>

<template>
<div id='OpenMeeting'>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>会议基本信息</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click='open'>开启会议</el-button>
  </div>
  <div class="text item">
    <i class="el-icon-s-opportunity"></i>会议简称：{{contactInformation.shortname}}
  </div>
  <div class="text item">
   <i class="el-icon-s-opportunity"></i>会议全称：{{contactInformation.fullname}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i>投稿截止日期：{{contactInformation.deadline}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i>结果发布日期：{{contactInformation.resultReleaseTime}}
  </div>
  <div class="text item">
    <i class="el-icon-date"></i>举办时间：{{contactInformation.organizationTime}}
  </div>
  <div class="text item">
    <i class="el-icon-location"></i>举办地点：{{contactInformation.place}}
  </div>
</el-card>
</div>
</template>

<style>
  .text {
    font-size: 14px;
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
    width: 480px;
  }
</style>