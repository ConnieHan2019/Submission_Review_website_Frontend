<template>
<div id="allMeetingPage"  >

  <div id="showArea">
    <el-autocomplete
      v-model="state" :fetch-suggestions="querySearchAsync" placeholder="请输入会议" @select="handleSelect" ></el-autocomplete>
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
      <el-button type="primary" class="enterMeetingBt">进入会议</el-button>
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
        state: '',
        timeout:  null,
        tableData: [{
          FullName:'第32届全国互联网顶尖人才大会',
          ShortName:'互联网大会',
          BeginTime:'2019-10-18',
          ContributeDDL:'2019-11-12',
          ReleaseResultTime:'2019-12-3'
        }, ]
      };
    },
    methods: {
      loadAll() {
        return [
          { "value": "物理大佬会", "address": "北京市宣武区" },
          { "value": "高数大佬会", "address": "上海市杨浦区" },
          { "value": "程设大佬会", "address": "上海市虹口区" },
        ];
      },
      querySearchAsync(queryString, cb) {
        var meetings = this.meetings;
        var results = queryString ? meetings.filter(this.createStateFilter(queryString)) : meetings;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
      this.meetings = this.loadAll();
    }
  };
</script>

<style scoped>
  #allMeetingPage{
    padding-top: 100px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #0badff;
    height: 1000px;
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
    background-color: white;
  }
  .enterMeetingBt{
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
