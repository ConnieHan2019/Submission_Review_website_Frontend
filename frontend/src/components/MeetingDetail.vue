<template>
  <div id="page">
    <div id="singleMeeting">
      <el-container>
        <el-header><h2 style="color: rgba(0, 25, 52, 0.7);">{{FullName}}</h2>
        </el-header>
        <el-container>
          <el-aside width="300px">
            <p></p>
            <el-collapse v-model="activeNames"  >
              <el-collapse-item title="Chair:" name="1">
                <span class="members" >{{chair}}</span>
              </el-collapse-item>
              <el-collapse-item title="PC Member:" name="2">
                <span class="members" v-for="pcm in pcMembers" v-bind:key="pcm.name" v-bind:index="pcm.name">{{pcm.name}}、</span>

              </el-collapse-item>
              <el-collapse-item title="Author:" name="3">
                <span class="members" v-for="aus in authors" v-bind:key="aus.name" v-bind:index="aus.name">{{aus.name}}、</span>

              </el-collapse-item>
              <el-collapse-item title="State:" name="4">
                <span style="color: red">{{ state }}</span>
              </el-collapse-item>
            </el-collapse>

          </el-aside>
          <el-container>
            <el-main>
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column prop="ShortName" label="会议简称" width="150"></el-table-column>
                <el-table-column prop="BeginTime" label="举办日期" width="150"></el-table-column>
                <el-table-column prop="ContributeDDL" label="投稿截止日期" width="150"></el-table-column>
                <el-table-column prop="ReleaseResultTime" label="结果发布日期" width="150"></el-table-column>
                <el-table-column prop="Place" label="举办地点" width="150"></el-table-column>

              </el-table>
            </el-main>
            <el-footer>


                <router-link to ="upload"><el-button type="warning">投稿</el-button></router-link>
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
      data() {
        return {
          FullName:'第32届全国互联网顶尖人才大会',
          chair:'Root',
          pcMembers:[
            {name:'A'},{name:'B'},{name:'C'}
          ],
          authors:[
            {name:'D'},{name:'F'},{name:'E'}
          ],
          state:'已通过',
          activeNames: ['1'],
          tableData: [{
            ShortName:'互联网大会',
            BeginTime:'2019-10-18',
            ContributeDDL:'2019-11-12',
            ReleaseResultTime:'2019-12-3',
            Place:'上海'
          }],
        };
      },
      methods:{}
    }
</script>

<style scoped>
  #page{
    padding-top: 100px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #52658F;
    height: auto;
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

</style>
