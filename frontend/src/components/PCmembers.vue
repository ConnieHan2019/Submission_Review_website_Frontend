//这个组件包含查看pcmember，发送邀请，开启投稿功能
<script>
export default{
    name:'PCmembers',
    props:{
        contactName:String,
        resultReleaseTime:String,
        state:Number
    },
    data(){
        return{
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
    //筛选已同意的用户
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
      },
      startReview(){
        
                      //this.$emit('startReview')
          if(this.state === 2){
              if(new Date(this.resultReleaseTime).getTime() > new Date().getTime()){
                  if(this.confirmedPCmembers.length >= 3){
                      //上面三个条件都满足才发送请求
              this.$axios.post('startReview',{
                  contactName:this.contactName
              })
              .then(resp => {
                  if (resp.status === 200){
                      this.$message({message: '稿件分配成功，已进入审稿状态，可在【稿件基本情况】查看进度',type: 'success'})
                      //向父组件抛出事件
                      this.$emit('startReview')
                  }
                  else{
                      this.$message({message: '稿件分配失败',type: 'error'})
                  }
              })
              .catch(error => {
                  if(error.response){
                      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                      if(error.response.status === 400){
                          this.$message.error("稿件分配失败，请添加审稿人之后再重试")
                      }
                      console.log(error.response)
                  }
                  else{
                      //Something happened in setting up the request that triggered an Error
                      console.log(error)
                  }
              })
                  }
                  else{
                      this.$message.error("审稿人不足3位，无法进行分配")
                  }
              }
              else{
                  this.$message.error("已过结果发布时间，不能再开启审稿啦，下次记得早点开始哦~")
              }
          }
          else if(this.state > 2){
              this.$message.error("已开启审稿，不能再次开启")
          }
          else{
              this.$message.error("未开启会议，先去开启会议吧~")
          }
      }
    }
}
</script>

<template>
<div id="PCmembers">
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
  <el-button type="info" icon="el-icon-message" @click='startReview' style='float:right; margin-top:10px'>开启审稿</el-button>
</div>
</div>
</template>