<script>
import Information from './Information'
import Invite from './Invite'
import ContactState from './ContactState'
export default {
  name: 'Personal',
  components:{
    Information,
    Invite,
    ContactState
  },
  data(){
    return{
      currentComponent:Information
    }
  },
  methods:{
    information(){
      this.currentComponent = Information
    },
    contactState(){
      this.currentComponent = ContactState
    },
    invite(){
      this.currentComponent = Invite
    },
    logoff(){
      //注销
      this.$store.commit('logout')
    }
  }
}
</script>

<template>
<div id = "Personal">
    <el-container>
  <el-header></el-header>
  <el-container>
    <el-aside width="200px">
        <el-menu :default-openeds="['1']">
        <el-menu-item index="4" @click='information'>我的个人信息</el-menu-item>
          <el-submenu index="1">
        <template slot="title">我参加的会议</template>
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
        <el-menu-item index="2" @click='contactState'>我申请的会议</el-menu-item>
        <el-menu-item index="3" @click='invite'>PCmember邀请通知</el-menu-item>
        <el-menu-item index="5" @click='logoff'>注销账号</el-menu-item>
      
    </el-menu>
    </el-aside>
    <el-main><component v-bind:is="currentComponent"></component></el-main>
  </el-container>
  <el-footer>Footer</el-footer>
</el-container>
</div>
</template>

<style scoped>
    .el-header,.el-footer {
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
  
  .el-container {
    height:580px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>