<template>
  <div id="allMeetingPage"  >

    <div id="showArea">
      <el-input
        v-model="inputFullName"  placeholder="请输入会议全名进行搜索"></el-input>
      <el-button icon="el-icon-search" circle @click="searchTheMeeting()"></el-button>
      <div id="searchedArea" v-show="dialog_visible">
        <el-divider  content-position="left"><span>搜索结果</span></el-divider>
        <div class="MeetingBox">
          <div class="text item">
            <b>会议简称</b><span class="para">{{contactInformation.shortname}}</span>
          </div>
          <div class="text item">
            <b>会议全名</b><span class="para">{{contactInformation.fullname}}</span>
          </div>
          <div class="text item">
            <b>投稿截止日期</b><span class="para">{{contactInformation.deadline}}</span>
          </div>
          <div class="text item">
            <b>结果发布日期</b><span class="para">{{contactInformation.resultReleaseTime}}</span>
          </div>
          <div class="text item">
            <b>会议举办日期</b><span class="para">{{contactInformation.organizationTime}}</span>
          </div>
          <el-button type="primary" class="enterMeetingBt" @click="seeDetail()">进入会议</el-button>
        </div>
      </div>
      <el-divider content-position="left"><span>推荐</span></el-divider>

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
        contactInformation:{},
        allActiveMeeting:{

        },
        dialog_visible:false,
      };
    },
    methods: {
      seeDetail(){
        this.$router.push({path: '/meetingDetail',query:{name:this.contactInformation.fullname}});
      },
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
              this.contactInformation= resp.data.searchMeetingData
              console.log(this.inputFullName)
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
    background-color: #52658F;
    height: 630px;
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
    background-color: #F7F5E6;
    height: 630px;
  }
  .enterMeetingBt{
    margin-top: 10px;
    margin-bottom: 10px;
    background:#feac00;
    border-color:#feac00;
  }
  .el-input{
    width: 200px;
  }
  .text item{
    margin-top: 20px;
  }
  .para{
    margin-left: 30px;
    font-family: "Comic Sans MS";
    color: #c69500;
  }
</style>
