<script>
import OpenMeeting from './OpenMeeting'

export default{
    name: 'Chair',
    props:['contactName'],
    components:{
      OpenMeeting
    },
    data(){
        return{
            activeName:'PCmember',
            fullname:'',
            searchResults:[{
              username:'username',
              fullname:'fullname',
              email:'email',
              country:'China'
          },{
              username:'shortname',
              fullname:'fullname',
              email:'...',
              country:'...'
          }],
            invitedPCmembers:[{
              username:'username',
              fullname:'fullname',
              email:'email',
              country:'country',
              state:'待确认'
          },{
              username:'shortname',
              fullname:'fullname',
              email:'deadline',
              country:'applicant',
              state:'已同意'
          },{
              username:'shortname',
              fullname:'fullname',
              email:'deadline',
              country:'applicant',
              state:'已拒绝'
          }],
            toInvite:[],
            confirmedPCmembers:[],
            confirmedNames:[],
            refusedPCmembers:[],
            waitingPCmembers:[] 
        }
    },
    watch:{
      invitedPCmembers:function(val){
        alert('watch')
        //清空数组
        this.confirmedNames=[]
        this.confirmedPCmembers=[]
        this.refusedPCmembers=[]
        this.waitingPCmembers=[]
        val.forEach(function(item,index,array){
          if(item.state === '已同意'){
            this.confirmedPCmembers.push(item)
            this.confirmedNames.push(item.username)
          }
          else if(item.state === '已拒绝'){
            this.refusedPCmembers.push(item)
          }
          else if(item.state === '待确认'){
            this.waitingPCmembers.push(item)
          }
          else{
            alert('invalid state')
          }
        })
      }
    },
    created:function(){
      this.$axios.post('/PCmember',{
      contactName:this.contactName
    })
    .then(resp => {
      if (resp.status === 200 && resp.data.hasOwnProperty("respPCmembers")){
        this.invitedPCmembers = resp.data.respPCmembers
      }
      else{
        console.log('PCmember加载失败')
        console.log(resp)
      }
    })
    .catch(error => {
      if(error.response){
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response)
      } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      }
      console.log(error.config);
    })
    for(var i = 0; i < this.invitedPCmembers.length; i++){
          var item = this.invitedPCmembers[i]
          if(item.state === '已同意'){
            this.confirmedPCmembers.push(item)
            this.confirmedNames.push(item.username)
          }
          else if(item.state === '已拒绝'){
            this.refusedPCmembers.push(item)
          }
          else if(item.state === '待确认'){
            this.waitingPCmembers.push(item)
          }
          else{
            alert('invalid state')
          }
        }
    },
    methods:{
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      searchUser(){
        this.$axios.post('/searchUser',{
      fullname:this.fullname
    })
    .then(resp => {
      if (resp.status === 200 && resp.data.hasOwnProperty("searchResults")){
        this.searchResults = resp.data.searchResults
        console.log('search success')
      }
      else{
        alert('search error')
        console.log(resp)
      }
    })
    .catch(error => {
      if(error.response){
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.log(error.response)
      } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      }
      console.log(error.config);
    })
    //筛选是否已被同意
    for(var i = 0;i < this.searchResults.length;i++){
      if(this.confirmedNames.indexOf(this.searchResults[i].username) > -1 ){
        this.searchResults.splice(i, 1); 
        i--;
      }
    }
      },
      sendInvitation(){
        if(this.toInvite.length>0){
        this.$axios.post('/sendInvitation',{
      inviter:this.$store.state.userDetails,
      contactName:this.contactName,
      toInvite:this.toInvite
    })
    .then(resp => {
      if (resp.status === 200 && resp.data.hasOwnProperty("respPCmembers")){
        this.invitedPCmembers = resp.data.respPCmembers
        this.$message({
          message: '邀请发送成功',
          type: 'success'
        })
      }
      else{
        this.$message.error('邀请发送失败')
        console.log(resp)
      }
    })
    .catch(error => {
      if(error.response){
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      this.$message.error('请求已发出，但服务器响应的状态码不在 2xx 范围内')
      console.log(error.response)
      } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
      }
      console.log(error.config);
    })
        }
        else{
          this.$message("请选择一名以上用户")
        }
      }
    }
}
</script>

<template>
<div id="Chair">
  <h3 style="margin:10px;">{{contactName}}</h3>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="程序委员会成员" name="PCmember">
    <div style="margin-top: 15px;">
  <el-input placeholder="请输入用户姓名" v-model="fullname" clearable>
    <el-button slot="append" icon="el-icon-search" @click='searchUser'></el-button>
  </el-input>
  <div style="margin-top: 15px;" id="searchResults" v-if="searchResults.length > 0">
  <el-divider content-position="left"><span>搜索结果</span></el-divider>
  <el-checkbox-group v-model="toInvite">
  <el-table
    :data="searchResults"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名">
      <template slot-scope="scope">
      <el-checkbox :label='scope.row.username'></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column
      prop="fullname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="country"
      label="区域">
    </el-table-column>
  </el-table>
  </el-checkbox-group>
  <el-button type="info" icon="el-icon-message" @click='sendInvitation' style='float:right; margin-top:10px'>发送邀请</el-button>
  </div>
</div>
<div style='margin-top:50px;'>
<el-divider content-position="left"><span>邀请状态</span></el-divider>
<el-collapse>
  <el-collapse-item title="已同意" name="confirmed" >
    <el-table
    :data="confirmedPCmembers"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="fullname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="country"
      label="区域">
    </el-table-column>
  </el-table>
  </el-collapse-item>
  <el-collapse-item title="已拒绝" name="refused">
    <el-table
    :data="refusedPCmembers"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="fullname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="country"
      label="区域">
    </el-table-column>
  </el-table>
  </el-collapse-item>
  <el-collapse-item title="待确认" name="waiting">
    <el-table
    :data="waitingPCmembers"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="fullname"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="country"
      label="区域">
    </el-table-column>
  </el-table>
  </el-collapse-item>
</el-collapse>
  
</div>
    </el-tab-pane>
    <el-tab-pane label="开启会议" name="openMeeting" :disabled=false ><OpenMeeting :contactName='contactName'></OpenMeeting></el-tab-pane>
  </el-tabs>
</div>
</template>

<style scoped>
  .el-input {
    width: 70%;
  }
  label{
    margin:0;
  }
  h4{
    margin:10px
  }
  >>> .el-collapse-item__header{
    padding-left:10px;
  }
</style>