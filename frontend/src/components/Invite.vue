<script>
export default {
  name: 'Invite',
  data(){
    return{
      dialog_visible:false,
      invites:[],

    }
  },
  created: function () {
    this.$axios.post('/receivedInvitation', {
      username: this.$store.state.userDetails
    })
      .then(resp => {
        if (resp.status === 200 && resp.data.hasOwnProperty("invitesData")) {
          this.invites = resp.data.invitesData
        } else {
          this.inviteError(),
            console.log(resp)
        }
      })
      .catch(error => {
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          this.$message({
            showClose: true,
            message: '请求已发出，但服务器响应的状态码不在 2xx 范围内',
            type: 'warning'
          });
          console.log(error.response)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message)
        }
        console.log(error.config);
      })
  },
  methods:{
    seeDetail(){
      this.$router.push({path: '/meetingDetail',query:{name:this.contactName}});
    },
    showDialog(visible) {
      this.dialog_visible = visible;
    },
    inviteError() {
      this.$message({
        showClose: true,
        message: 'invite error',
        type: 'warning'
      });
    },
  }

}
</script>

<template>
<div id = "Invite">
  <el-badge :value=inviteCount class="item" >
    <el-button size="big" @click="showDialog(true)"><span>New Invitation</span></el-button>
  </el-badge>

  <div class="invitation" v-show="dialog_visible" v-for="ins in invites" v-bind:key="ins.FullName" v-bind:index="ins.FullName">
    <p><i class="el-icon-user"></i><span class="ivt">Chair:</span>{{ins.chair}}</p>
    <p><i class="el-icon-notebook-1"></i><span class="ivt">Meeting's FullName:</span>{{ins.FullName}}</p>
    <el-button type="warning" class="goTo" @click="seeDetail">去投稿</el-button>
  </div>



</div>
</template>
<style scoped>
  .ivt{
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

