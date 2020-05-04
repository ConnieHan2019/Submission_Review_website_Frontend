<template>
  <div>
    <el-divider content-position="left"><span>我的投稿</span></el-divider>
    <div class="essayBlock">
      <h5>会议主题：<span style="color:#5b25ff;">{{contactName}}</span></h5><br>
      <div v-for='essay in essays' v-bind:key="essay.title" v-bind:index="essay.title" class="passageBlock">
      <b class="tit">{{essay.title}}</b>
<el-input
  type="textarea"
  :autosize="{ minRows: 2}"
  v-model="essay.summary"
  :disabled="true"
  style="margin-bottom:10px;">
</el-input>
        <div>
          <b style="margin-right: 40px;color: #c69500">论文状态：<span>{{essay.status}}</span></b>
          <el-button @click="edit(essay.title)">编辑</el-button>
        </div>

      </div>
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
          essays:[
            {
              title:'专门为牛会写的文章',
              summary:'牛牛的会议',
              status:'待审核'
            },
            {
              title:'专门为牛会写的第二篇文章',
              summary:'牛牛的会议',
              status:'已驳回',
            }
          ],
        }
      },
      props:['contactName'],
      created: function () {
        this.$axios.post('/userEssayState', {
          username: this.$store.state.userDetails,
          contactName:this.contactName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("userEssayStateInformation")) {
              this.essays = resp.data.userEssayStateInformation
            } else {
              this.essayStateError(),
                console.log(resp)
            }
          })
          .catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              if(error.response.status === 404){
                this.$message('你还没有在这个会议投稿哦~')
              }
              console.log(error.response)
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
            console.log(error.config);
          })
      },
      methods: {
          edit(essayTitle){
            this.$router.push({path: '/editMyEssay',query:{name:this.contactName,title:essayTitle}});
          },
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
.passageBlock{
  padding: 20px;
  background-color: white;
  margin: 0 auto;
  margin-bottom: 25px;
  border:1px solid lightgrey;
  border-radius: 4px;
}
  .tit{
    margin-bottom: 10px;
    color:#0c5460 ;
  }
</style>
