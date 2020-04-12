<template>
  <div>
    <el-divider content-position="left"><span>My Essay</span></el-divider>
    <div class="essayBlock">
      <h5>会议主题：<span style="color:#5b25ff;">{{contactName}}</span></h5><br>
      <h5>审核状态：<span style="color:#ff1e1a;">{{myEssayState}}</span></h5>

      <el-divider></el-divider>
      <el-button type="primary" class="enterMeetingBt" @click="seeDetail()">进入会议</el-button>
    </div>
  </div>

</template>

<script>
    export default {
        name: "MyEssayState",
      data(){
        return{
          //这个会议的状态： 审核中、已通过、已驳回
          myEssayState:'审核中',
        }
      },
      props:['contactName'],
      created: function () {
        this.$axios.post('/userEssayState', {
          username: this.$store.state.userDetails,
          contactName:this.contactName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("myEssayStateDelivered")) {
              this.myEssayState = resp.data.myEssayStateDelivered
            } else {
              this.essayStateError(),
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
        essayStateError() {
          this.$message({
            showClose: true,
            message: 'essayState error',
            type: 'warning'
          });
        },
      }
    }
</script>

<style scoped>
.essayBlock{
  padding: 20px;
  border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
  background-color: white;
  margin: 20px;
}
.enterMeetingBt{
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
