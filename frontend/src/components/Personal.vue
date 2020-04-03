<script>
export default {
  name: 'Personal'
}
</script>

<template>
<div id = "Personal">
    <el-container>
  <el-header></el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
        <template slot="title">会议事务处理</template>
        <el-submenu index="1-1">
          <template slot="title">会议一</template>
          <el-menu-item index="1-1">角色1</el-menu-item>
          <el-menu-item index="1-2">角色2</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">会议二</template>
          <el-menu-item index="1-1">角色1</el-menu-item>
          <el-menu-item index="1-2">角色2</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title">会议三</template>
          <el-menu-item index="1-1">角色1</el-menu-item>
          <el-menu-item index="1-2">角色2</el-menu-item>
        </el-submenu>
      </el-submenu>
        <el-menu-item index="2">会议申请状态</el-menu-item>
        <el-menu-item index="3">PCmember邀请通知</el-menu-item>
      
    </el-menu>
    </el-aside>
    <el-main>根据左边的选择确定右边的任务面板</el-main>
  </el-container>
</el-container>
</div>
</template>

<style scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
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
</style>