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
  :with-header="true"
  size="20%">
  <ul><li v-for="(aus,index) in authors" :key='"menu"+index' style="text-align: left;padding-left: 20px;" @click='scrollToEssay(index)'><el-link type="primary" style="font-size:20px"><i class="el-icon-caret-right" ></i>{{aus.title}}</el-link></li></ul>
</el-drawer>
        <el-divider></el-divider>
        <div  v-for="(aus,index) in authors"  :id="index" :key='aus.title' style="margin-bottom:50px">
        <h3 style='margin-top:20px'>标题:{{aus.title}}</h3>
        <p ><i class="el-icon-user"></i><span >作者:</span>{{aus.name}} <a @click.prevent="downloadEssay(aus.link)" type="primary" :href='aus.link'>点击下载</a></p>
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
		共{{pageCount[index]}}页
		<pdf
			:src="aus.link"
      v-for="i in pageCount[index]"
      :key="i"
      :page="i"
		></pdf>
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

          essayState:'',

          drawer:false,
          pageCount:[10,10,10],
          authors:  [
                {name: 'Sam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'wssdffl1'},
                {name: 'AEFam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'dgdfhdh'},
                {name: 'Ssdfam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'retrdfhdfg'},
{name: 'AEFam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'sdfdsdsgg'},
                {name: 'sefdfsd', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'dgdfggggrrhdh'},
                {name: 'AwerhkhjkEFam', extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',link: '',title:'dgdeertefhdh'},
                
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
        this.pageCount = new Array(this.authors.length)
        for(var i = 0; i < this.authors.length;i++){
          //一定要用闭包或者foreach,加载pdf页数
          var auditVM = this;
          (function(i){
          //alert('初始元素'+i+":"+auditVM.pageCount[i])
          auditVM.authors[i].link = pdf.createLoadingTask(auditVM.authors[i].link);
          auditVM.authors[i].link.promise.then(pdf => {
            auditVM.pageCount[i] = pdf.numPages
            //alert('返回元素'+i+":"+auditVM.pageCount[i])
          })
          //alert("now:"+auditVM.pageCount[i])
          })(i)
        }
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
        //跳转到审稿信息提交界面
        toEdit(name,title){
          this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title}});
        },
        passEssay(name,title){
              this.toEdit(name,title)
        },
        refuseEssay(name,title){
             this.toEdit(name,title)
        },
        scrollToEssay(index){
          document.getElementById(index).scrollIntoView();
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

