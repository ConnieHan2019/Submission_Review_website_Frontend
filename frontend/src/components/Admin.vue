<script>
export default {
  name: 'Admin',
  data(){
      return{
          contactData:[{
              shortname:'shortname',
              fullname:'fullname',
              deadline:'deadline',
              applicant:'applicant'
          },{
              shortname:'shortname',
              fullname:'fullname',
              deadline:'deadline',
              applicant:'applicant'
          }]
      }
  },
  methods:{
      pass(row){
          alert("pass");
          console.log(row);
      },
      refuse(row){
          alert("refuse");
          console.log(row);
      }
  }
}
</script>

<template>
<div id = "Admin">
    <el-container>
  <el-header></el-header>
  <el-main>
  <h3>管理员--会议申请处理</h3>
  <el-table
    :data="contactData"
    height="400"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="shortname"
      label="会议简称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="fullname"
      label="会议全称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="deadline"
      label="投稿截止日期">
    </el-table-column>
    <el-table-column
      prop="applicant"
      label="申请人">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
        <el-button @click="refuse(scope.row)" type="text" size="small">驳回</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-main>
</el-container>
</div>
</template>

<style scoped>
    .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding:30px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  h3{
      margin:10px;
      text-align:left;
  }
</style>