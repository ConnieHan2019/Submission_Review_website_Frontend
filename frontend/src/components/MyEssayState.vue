<template>
  <div>
    <el-divider content-position="left"><span style="font-family: 'Comic Sans MS'">My Essay</span></el-divider>
    <div class="essayBlock">
      <h5>会议主题：<span style="color:#5b25ff;">{{FullName}}</span></h5><br>
      <h5>审核状态：<span style="color:#ff1e1a;">{{contactState}}</span></h5>

      <el-divider></el-divider>
      <router-link to ="meetingDetail" ><el-button type="primary" class="enterMeetingBt">进入会议</el-button></router-link>
    </div>
  </div>

</template>

<script>
    export default {
        name: "MyEssayState",
      data(){
        return{
          //这个会议的状态： 审核中、已通过、已驳回
          contactState:'审核中',
          FullName:'第32届全国互联网顶尖人才大会',


        }
      },
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
