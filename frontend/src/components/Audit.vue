<template>
    <div id="audit">
      <div class="meetingBlock">
        <h5>会议主题：<span style="color:#5b25ff;">{{contactName}}</span></h5><br>
        <el-divider></el-divider>
        <div  v-for="aus in authors" v-bind:key="aus.name" v-bind:index="aus.name">
        <h3 style='margin-top:20px'>Title:{{aus.title}}</h3>
          <p ><i class="el-icon-user"></i><span >Author:</span>{{aus.name}} <el-link type="primary" :href='aus.link'>文章链接</el-link></p>
<el-input
  type="textarea"
  :autosize="{ minRows: 2}"
  placeholder="请输入内容"
  v-model="aus.extract"
  :disabled="true"
  style="margin-bottom:10px">
</el-input>

          <el-button-group>
            <el-button type="success" @click='passEssay(aus.name,aus.title)'>通过</el-button>
            <el-button type="danger" @click='refuseEssay(aus.name,aus.title)'>驳回</el-button>
          </el-button-group>
        </div>

        <el-divider></el-divider>
        <el-button type="primary" class="enterMeetingBt" @click="seeDetail">进入会议</el-button>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Audit",
      props:['contactName'],
      data() {
        return {
          authors: [
                {name: 'Sam', extract:'xxxxxxxxxxxxxxx',link: '',title:'wsl'},
                {name: 'Joe',extract:'xxxxxxxxxxxxxxx',link: '',title:'wsl'},
                {name: 'Eden',extract:'xxxxxxxxxxxxxxx',link: '',title:'wsl'},
              ]
        }
      },
      created: function () {
        this.$axios.post('/audit', {
          username: this.$store.state.userDetails,
          contactName:this.contactName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("essayNeedHandle")) {
              this.authors = resp.data.essayNeedHandle
            } else {
              this.auditError(),
                console.log(resp)
            }
          })
          .catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.log(error.response)
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
            console.log(error.config);
          })
      },
      methods: {
        seeDetail(){
          this.$router.push({path: '/meetingDetail',query:{name:this.contactName}});
        },
        auditError() {
          this.$message({
            showClose: true,
            message: 'audit error',
            type: 'warning'
          });
        },
        passEssay(name,title){
          this.$axios.post('/passEssay',{
          username: this.$store.state.userDetails,
          contactName:this.contactName,
          authorName:name,
          essayTitle:title
          })
          .then(resp => {
            if(resp.status === 200){
          this.$message({
            showClose: true,
            message: '已通过该论文',
            type: 'success'
          });
            }
            else{
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });              
            }
          })
          .catch(error => {         
            this.$message({
            showClose: true,
            message: '请求失败r',
            type: 'error'
          });
            console.log(error)
          })
        },
        refuseEssay(name,title){
          this.$axios.post('/refuseEssay',{
          username: this.$store.state.userDetails,
          contactName:this.contactName,
          authorName:name,
          essayTitle:title
          })
          .then(resp => {
            if(resp.status === 200){
          this.$message({
            showClose: true,
            message: '已驳回该论文',
            type: 'success'
          });
            }
            else{
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });              
            }
          })
          .catch(error => {         
            this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });
            console.log(error)
          })
        }
      }
    }
</script>

<style scoped>
  .meetingBlock{
    margin: 20px;
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
  }

</style>

