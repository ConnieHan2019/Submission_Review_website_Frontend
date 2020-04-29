<template>
    <div id="audit">
      <div class="meetingBlock">
        <h5>会议主题：<span style="color:#5b25ff;">{{contactName}}</span></h5><br>
<el-button @click="drawer = true" type="primary" style="position:fixed;top:100px;right:40px;">
  目录
</el-button>

<el-drawer
  title="点击标题跳转到相应位置"
  :visible.sync="drawer"
  :with-header="false">
  <div v-for="(aus,index) in authors" :key='index'><el-link type="primary" :href='"#"+index' >{{aus.title}}</el-link></div>
</el-drawer>

        <el-divider></el-divider>
        <div  v-for="(aus,index) in authors"  :id="index" :key='aus.title'>
        <h3 style='margin-top:20px'>标题:{{aus.title}}</h3>
        <p ><i class="el-icon-user"></i><span >作者:</span>{{aus.name}} <a @click.prevent="downloadEssay(aus.link)" type="primary" :href='aus.link'>文章链接</a></p>
        <div>摘要：
<el-input
  type="textarea"
  autosize
  style="width:80%;"
  :disabled="true"
  v-model="aus.extract">
</el-input>
        </div>
	<div style="width:93%;border-radius: 4px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin-top:20px;height: 500px; overflow:scroll">
		{{currentPage[index]}} / {{pageCount[index]}}
		<pdf
			:src="aus.link"
			@num-pages="pageCount[index] = $event"
			@page-loaded="currentPage[index] = $event"
      :page="currentPage[index]"
		></pdf>
    <div><span @click='lastPage(index)'><i class="el-icon-arrow-left"></i>上一页</span><i class="el-icon-reading"></i><span  @click='nextPage(index)'>下一页<i class="el-icon-arrow-right"></i></span></div>
	</div>
          <el-button-group style="margin-top:20px">
            <el-button type="success" @click='passEssay(aus.name,aus.title)'>通过</el-button>
            <el-button type="danger" @click='refuseEssay(aus.name,aus.title)'>驳回</el-button>
          </el-button-group>
        </div>

        <el-divider></el-divider>
        <el-button type="primary" class="enterMeetingBt" @click="seeDetail">进入会议</el-button>
      </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'

    export default {
      name: "Audit",
      props:['contactName'],
      components:{pdf},
      data() {
        return {
          drawer:false,
          currentPage:[1,2,3],
          pageCount:[10,10,10],
          authors:  [
                {name: 'Sam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: 'http://alexandria.tue.nl/openaccess/Metis223041.pdf',title:'wssdffl1'},
                {name: 'Joe',extract:'xxxxxxxxxxxxxxx',link: 'http://image.cache.timepack.cn/nodejs.pdf',title:'wsdgfssl'},
                {name: 'Eden',extract:'xxxxxxxxxxxxxxx',link: 'http://image.cache.timepack.cn/nodejs.pdf',title:'wshjjgl'},
    ]
        }
      },
      created: function () {
        this.$axios.post('/audit', {
          username: this.$store.state.userDetails,
          contactName:this.contactName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("essayNeedHandle")) {
              this.authors = resp.data.essayNeedHandle
              currentPage = new array(this.authors.length)
            } else {
              this.auditError(),
                console.log(resp)
            }
          })
          .catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              if(error.response.status === 404){
                this.$message('该会议还没有收到投稿哦~')
              }
              else{console.log(error.response)}
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message)
            }
          })
      },
      methods: {
        downloadEssay(url){
          alert(url)
          let link = document.createElement('a')
          fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
            link.href = URL.createObjectURL(blob)
            console.log(link.href)
            link.download = ''
            link.click()
          })
        },
        seeDetail(){
          this.$router.push({path: '/meetingDetail',query:{name:this.contactName}});
        },
        auditError() {
          this.$message({
            showClose: true,
            message: 'audit error',
            type: 'warning'
          });
        },
        passEssay(name,title){
          this.$axios.post('/passEssay',{
          username: this.$store.state.userDetails,
          contactName:this.contactName,
          authorName:name,
          essayTitle:title
          })
          .then(resp => {
            if(resp.status === 200){
          this.$message({
            showClose: true,
            message: '已通过该论文',
            type: 'success'
          });
            }
            else{
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });              
            }
          })
          .catch(error => {         
            this.$message({
            showClose: true,
            message: '请求失败r',
            type: 'error'
          });
            console.log(error)
          })
        },
        refuseEssay(name,title){
          this.$axios.post('/refuseEssay',{
          username: this.$store.state.userDetails,
          contactName:this.contactName,
          authorName:name,
          essayTitle:title
          })
          .then(resp => {
            if(resp.status === 200){
          this.$message({
            showClose: true,
            message: '已驳回该论文',
            type: 'success'
          });
            }
            else{
          this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });              
            }
          })
          .catch(error => {         
            this.$message({
            showClose: true,
            message: '请求失败',
            type: 'error'
          });
            console.log(error)
          })
        },
        lastPage(index){
          alert('last')
          alert(index)
          this.currentPage[index]--;
        },
        nextPage(index){
          alert('next')
          alert(index)
          alert(this.currentPage[index])
          this.currentPage[index]++;
          alert(this.currentPage[index])
        }
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

