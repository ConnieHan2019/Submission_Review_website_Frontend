<script>
export default {
  name: 'Invite',
  data(){
    return{
      inviteCount: 12,
      chair:'root',
      fullname:'全国互联网大会',
    }
  },
  methods:{

  }

}
</script>

<template>
<div id = "Invite">
  <el-badge :value=inviteCount class="item" >
    <el-button size="big" v-on:click="inviteCount = 0"><span style="font-family: 'Comic Sans MS'">New Invitation</span></el-button>
  </el-badge>

  <div class="invitation">
    <p><i class="el-icon-user"></i><span class="ivt">Chair:</span>{{chair}}</p>
    <p><i class="el-icon-notebook-1"></i><span class="ivt">Meeting's FullName:</span>{{fullname}}</p>
    <router-link to ="meetingDetail" ><el-button type="warning" class="goTo">去投稿</el-button></router-link>
  </div>

  <div class="invitation">
    <p><i class="el-icon-user"></i><span class="ivt">Chair:</span>{{chair}}</p>
    <p><i class="el-icon-notebook-1"></i><span class="ivt">Meeting's FullName:</span>{{fullname}}</p>
    <router-link to ="meetingDetail" ><el-button type="warning" class="goTo">去投稿</el-button></router-link>
  </div>


</div>
</template>
<style scoped>
  .ivt{
    font-family: 'Comic Sans MS';
    color: #c69500;
  }
  .invitation{
    margin: 20px;
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
  }
  .goTo{

  }
</style>

