<template>
    <div id="audit">
      <div class="meetingBlock" v-for="audata in auditData" v-bind:key="audata.FullName" v-bind:index="audata.FullName">
        <h5>会议主题：<span style="color:#5b25ff;">{{audata.FullName}}</span></h5><br>
        <el-divider></el-divider>
        <div  v-for="aus in audata" v-bind:key="aus.name" v-bind:index="aus.name">
          <p ><i class="el-icon-user"></i><span style="font-family: 'Comic Sans MS'">Author:</span>{{aus.name}} <el-link type="primary">文章链接</el-link></p>
          <el-button-group>
            <el-button type="success">通过</el-button>
            <el-button type="danger">驳回</el-button>
          </el-button-group>
        </div>

        <el-divider></el-divider>
        <router-link to ="meetingDetail" ><el-button type="primary" class="enterMeetingBt">进入会议</el-button></router-link>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Audit",
      data() {
        return {
          auditData:[
            {
              FullName: '全国互联网大会',
              authors: [
                {name: 'Sam'},
                {name: 'Joe'},
                {name: 'Eden'},
              ],
            },
            {
              FullName: '全国消费者研究大会',
              authors: [
                {name: 'Jack'},
                {name: 'Jeson'},
                {name: 'Emma'},
                ]
            }
          ],

        }

      },
      created: function () {
        this.$axios.post('/audit', {
          username: this.$store.state.userDetails
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("essayNeedHandle")) {
              this.auditData = resp.data.essayNeedHandle
            } else {
              this.auditError(),
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
        auditError() {
          this.$message({
            showClose: true,
            message: 'audit error',
            type: 'warning'
          });
        },
      }
    }
</script>

<style scoped>
  .meetingBlock{
    margin: 20px;
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
  }

</style>

