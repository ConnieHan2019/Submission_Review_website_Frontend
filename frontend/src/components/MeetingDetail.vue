<template>
  <div id="page">
    <div id="singleMeeting">
      <el-container>
        <el-header><h2 style="color: rgba(0, 25, 52, 0.7);">{{this.$route.query.name}}</h2>
        </el-header>
        <el-container>
          <el-aside width="300px">
            <p></p>
            <el-collapse>
              <el-collapse-item title="Chair:" name="1">
                <span class="members" >{{verDetailContactData.chair}}</span>
              </el-collapse-item>
              <el-collapse-item title="PC Member:" name="2">
                <p class="members" v-for="pcm in verDetailContactData.pcMembers" v-bind:key="pcm" v-bind:index="pcm">{{pcm}}</p>

              </el-collapse-item>
              <el-collapse-item title="Author:" name="3">
                <p class="members" v-for="aus in verDetailContactData.authors" v-bind:key="aus" v-bind:index="aus">{{aus}}</p>

              </el-collapse-item>
              <el-collapse-item title="State:" name="4">
                <span style="color: red">{{ verDetailContactData.state }}</span>
              </el-collapse-item>
            </el-collapse>

          </el-aside>
          <el-container>
            <el-main>
              <div id="meeting">
                <p><label>会议简称:</label><span class="tableDT">{{verDetailContactData.ShortName}}</span></p>

                <p> <label>举办日期:</label><span class="tableDT">{{verDetailContactData.BeginTime}}</span></p>

                <p><label>投稿截止日期:</label><span class="tableDT">{{verDetailContactData.ContributeDDL}}</span></p>

                <p><label>结果发布日期:</label><span class="tableDT">{{verDetailContactData.ReleaseResultTime}}</span></p>

                <p><label>举办地点:</label><span class="tableDT">{{verDetailContactData.Place}}</span></p>

              </div>


            </el-main>
            <el-footer>


              <el-button type="warning" @click="up()">投稿</el-button>
              <router-link to ="contribute" >  <el-button type="primary">返回搜索页面</el-button></router-link>



            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>

</template>

<script>
  export default {
    name: "MeetingDetail",
    created: function () {
      this.$axios.post('/meetingDetail', {
        fullname:this.$route.query.name
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty("veryDetailContactData")) {
            this.verDetailContactData = resp.data.veryDetailContactData
            console.log(this.verDetailContactData)
          } else {
            this.$message({
              showClose: true,
              message: 'detail error',
              type: 'warning'
            });
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
    data() {
      return {
        verDetailContactData:{},

      };
    },
    methods:{
      up(){
        this.$router.push({path: '/upload',query:{name:this.$route.query.name}});
      }
    }
  }
</script>

<style scoped>
  #page{
    padding-top: 100px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #52658F;
    min-height: auto;
    padding-bottom: 30px;
  }
  #singleMeeting{
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    background-color: white;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
  }
  .members{
    color: rgba(0, 25, 52, 0.7);
    font-family: "Comic Sans MS";
  }
  .member{
    margin-top: 20px;

  }
  .el-header{
    padding: 10px;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;

  }
  .el-footer {
    padding: 10px;
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    padding: 20px;
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;
  }

  .el-main {
    padding: 10px;
    background-color: #F7F5E6;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .el-button{
    margin-right: 100px;
  }
  .el-collapse-item{
    padding: 15px;

  }
  .tableDT{
    color: #c69500;
    font-family: "Comic Sans MS";
    align-items: center;
  }
  #meeting{
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
    margin: 20px;
  }
  >>> .el-collapse-item__content{
    padding:0;
  }
</style>
