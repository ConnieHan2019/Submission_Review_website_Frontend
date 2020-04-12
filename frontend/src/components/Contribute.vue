<template>
<div id="allMeetingPage"  >

  <div id="showArea">
    <el-input
      v-model="inputFullName"  placeholder="请输入会议全名进行搜索"></el-input>
    <el-button icon="el-icon-search" circle @click="searchTheMeeting()"></el-button>
    <div id="searchedArea" v-show="dialog_visible">
      <el-divider  content-position="left"><span>搜索结果</span></el-divider>
      <div class="MeetingBox">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column prop="FullName" label="会议全称" width="180"></el-table-column>
          <el-table-column prop="ShortName" label="会议简称" width="180"></el-table-column>
          <el-table-column prop="BeginTime" label="举办日期" width="180"></el-table-column>
          <el-table-column prop="ContributeDDL" label="投稿截止日期" width="180"></el-table-column>
          <el-table-column prop="ReleaseResultTime" label="结果发布日期" width="180"></el-table-column>

        </el-table>
        <router-link to ="meetingDetail" ><el-button type="primary" class="enterMeetingBt">进入会议</el-button></router-link>

      </div>
    </div>
    <el-divider content-position="left"><span>推荐</span></el-divider>
    <div class="MeetingBox">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column prop="FullName" label="会议全称" width="180"></el-table-column>
        <el-table-column prop="ShortName" label="会议简称" width="180"></el-table-column>
        <el-table-column prop="BeginTime" label="举办日期" width="180"></el-table-column>
        <el-table-column prop="ContributeDDL" label="投稿截止日期" width="180"></el-table-column>
        <el-table-column prop="ReleaseResultTime" label="结果发布日期" width="180"></el-table-column>

      </el-table>
      <router-link to ="meetingDetail" ><el-button type="primary" class="enterMeetingBt">进入会议</el-button></router-link>
    </div>
  </div>




</div>
    
</template>

<script>
  export default {
    name: "Contribute",

    data() {
      return {
        meetings: [],
        inputFullName: '',
        tableData: [{
          FullName:'第32届全国互联网顶尖人才大会',
          ShortName:'互联网大会',
          BeginTime:'2019-10-18',
          ContributeDDL:'2019-11-12',
          ReleaseResultTime:'2019-12-3'
        }],
        dialog_visible:false,
      };
    },
    methods: {
      showDialog(visible) {
        this.dialog_visible = visible;
      },
      searchTheMeeting(){
        this.showDialog(true);
        this.$axios.post('/searchMeeting',{
          fullName:this.inputFullName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("searchMeetingData")){
              this.tableData= resp.data.searchMeetingData
            }
            else{
             // alert('Meeting-search error')
              this.$message({
                showClose: true,
                message: 'Meeting-search error',
                type: 'warning'
              });
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

    }
  };
</script>

<style scoped>
  #allMeetingPage{
    padding-top: 100px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #67809f;
    height: auto;
  }
  .MeetingBox{
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
    margin-bottom: 20px;
  }
  #showArea{
    padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    padding-bottom: 100px;
    background-color: #e4e9ed;
  }
  .enterMeetingBt{
    margin-top: 10px;
    margin-bottom: 10px;
  }
.el-input{
  width: 200px;
}
</style>
