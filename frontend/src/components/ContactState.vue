<script>
export default {
  name: 'ContactState',
  data(){
    return{
      //这个会议的状态： 审核中、已通过、已驳回
      myContactState:[
        {
          contactState:'审核中',
          tableData: [{
            FullName:'第32届全国互联网顶尖人才大会',
            ShortName:'互联网大会',
            BeginTime:'2019-10-18',
            ContributeDDL:'2019-11-12',
            ReleaseResultTime:'2019-12-3',
            Place:'Asia,ShangHai'
          }],
        },
        {
          contactState:'已通过',
          tableData: [{
            FullName:'第3届消费者大会',
            ShortName:'消费者大会',
            BeginTime:'2016-10-18',
            ContributeDDL:'2017-9-12',
            ReleaseResultTime:'2017-12-3',
            Place:'中国'
          }],
        }],

    }
  },
  created: function () {
    this.$axios.post('/userContactState', {
      username: this.$store.state.userDetails
    })
      .then(resp => {
        if (resp.status === 200 && resp.data.hasOwnProperty("myContactStateDelivered")) {
          this.myContactState = resp.data.myContactStateDelivered
        } else {
          this.contactStateError(),
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
    contactStateError() {
      this.$message({
        showClose: true,
        message: 'contactState error',
        type: 'warning'
      });
    },
  }


}
</script>

<template>
<div id = "ContactState">
  <el-divider content-position="left"><span>My Contribution</span></el-divider>
  <div class="myContribution" v-for="conState in myContactState" v-bind:key="conState.contactState" v-bind:index="conState.contactState">
    <el-table
      :data="conState.tableData"
      stripe
      style="width: 100%">
      <el-table-column prop="FullName" label="会议全称" width="150"></el-table-column>
      <el-table-column prop="ShortName" label="会议简称" width="150"></el-table-column>
      <el-table-column prop="BeginTime" label="举办日期" width="150"></el-table-column>
      <el-table-column prop="ContributeDDL" label="投稿截止日期" width="150"></el-table-column>
      <el-table-column prop="ReleaseResultTime" label="结果发布日期" width="150"></el-table-column>
      <el-table-column prop="Place" label="举办地点" width="180"></el-table-column>
    </el-table>

<b class="state">审核状态：<span style="color: blue">{{conState.contactState}}</span></b>
  </div>

</div>
</template>
<style scoped>
  .myContribution{
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
    margin: 20px;
  }
  .state{
    margin: 10px;
  }
</style>

