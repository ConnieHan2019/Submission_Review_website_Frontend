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
  <ul><li v-for="(aus,index) in essaysNeedHandle.authors" :key='"menu"+index' style="text-align: left;padding-left: 20px;" @click='scrollToEssay(index)'><el-link type="primary" style="font-size:20px"><i class="el-icon-caret-right" ></i>{{aus.title}}</el-link></li></ul>
</el-drawer>
        <el-divider>我的审核稿件</el-divider>
        <div v-for="(aus,index) in essaysNeedHandle.authors"  :id="index" :key='aus.title' style="margin-bottom:50px">
          <h3 style='margin-top:20px'>标题:{{aus.title}}</h3>
          <p ><i class="el-icon-user"></i><span >作者:</span>{{aus.name}} <a @click.prevent="downloadEssay(aus.link)" type="primary" :href='aus.link' style="margin-right:5px">点击下载</a><a target="_Blank" type="primary" :href='aus.link'>点击预览</a></p>
          <div>摘要：
            <el-input
              type="textarea"
              autosize
              style="width:80%;"
              :disabled="true"
              v-model="aus.extract">
            </el-input>
          </div>
          <br>
          <div v-if="essaysNeedHandle.meetingState === 3" id="开始审稿">
            <el-button-group style="margin-top:20px">
              <el-button type="success" @click='toEdit(aus.name,aus.title)'>审核</el-button>
            </el-button-group>
          </div>

          <div v-else-if="(essaysNeedHandle.meetingState ===30||essaysNeedHandle.meetingState ===4)&&aus.hasFailScore===false">
            <el-button-group style="margin-top:20px">
              <el-button type="success" disabled="">已被录用</el-button>
            </el-button-group>
          </div>

          <div v-else-if="essaysNeedHandle.meetingState ===30 &&aus.hasFailScore" id="第一次讨论">
            <p>第一次讨论</p>
            <div class="firstDiscussArea">
              <div v-for="firstDiscuss in aus.firstDiscussion"
                   v-bind:key="firstDiscuss.speaker"
                   v-bind:index="firstDiscuss.speaker"
                   align="left"
                   class="discussArea">
                <p style="color: #005cbf">{{firstDiscuss.speaker}}<span style="color: black">:{{firstDiscuss.content}}</span></p>
                <el-button  class="el-icon-right" @click="reply(aus,firstDiscuss.speaker,firstDiscuss.content)">回复TA</el-button>
              </div>
              <br>
              <div align="left" style="padding-left: 10%">
                <el-button @click="myView(aus)">发表我的看法</el-button>
              </div>
            </div>

            <el-dialog
              title="回复评论"
              :visible.sync="commentWindowVisible"
              center>
              <el-input v-model="aPieceOfComment"></el-input>

              <el-button-group style="margin-left: 20%;margin-top: 5%">
                <el-button @click="commentWindowVisible=false">取消</el-button>
                <el-button type="success" @click="sendMyComment1(aPieceOfComment)">发布评论</el-button>
              </el-button-group>

            </el-dialog>

            <br>
            <el-button-group style="margin-top:20px">
              <el-button type="success" @click='firstChange(aus.name,aus.title)'>首次修改评审结果</el-button>
            </el-button-group>



          </div>



          <div v-else-if="essaysNeedHandle.meetingState ===4&&aus.hasFailScore" id="第二次讨论">
            <p>第二次讨论</p>


            <div class="secondDiscussArea">
              <div v-for="secondDiscuss in aus.secondDiscussion"
                   v-bind:key="secondDiscuss.speaker"
                   v-bind:index="secondDiscuss.speaker"
                   align="left"
                   class="discussArea">
                <p style="color: #005cbf">{{secondDiscuss.speaker}}<span style="color: black">:{{secondDiscuss.content}}</span></p>
                <el-button  class="el-icon-right" @click="reply(aus,secondDiscuss.speaker,secondDiscuss.content)">回复TA</el-button>
              </div>
              <br>
              <div align="left" style="padding-left: 10%">
                <el-button @click="myView(aus)">发表我的看法</el-button>
              </div>
            </div>

            <el-dialog
              title="回复评论"
              :visible.sync="commentWindowVisible"
              center>
              <el-input v-model="aPieceOfComment"></el-input>

              <el-button-group style="margin-left: 20%;margin-top: 5%">
                <el-button @click="commentWindowVisible=false">取消</el-button>
                <el-button type="success" @click="sendMyComment2(aPieceOfComment)">发布评论</el-button>
              </el-button-group>

            </el-dialog>

            <br>
            <el-button-group style="margin-top:20px">
              <el-button type="success" @click='secondChange(aus.name,aus.title)'>再次修改评审结果</el-button>
            </el-button-group>
          </div>

          <div v-else>
<p>非评审时间内</p>
          </div>
          <el-divider></el-divider>
        </div>
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
          aPieceOfComment:'',
          commentWindowVisible:false,
          currentAus:{},

          drawer:false,
          pageCount:[10,10,10],


          essaysNeedHandle:{
            meetingState:30,
            authors:  [
              { name: 'Sam',
                extract:'xxxxxxxxxxxxxxxxx',
                link: 'https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf',
                title:'wssdffl1',
                hasFailScore:true,
                firstDiscussion:[
                  {
                    speaker:'moon',
                    content:'我觉得给吧'
                  },
                  {
                    speaker:'mwary',
                    content:'没道理'
                  },
                  {
                    speaker:'sasm',
                    content:'开玩笑的吧'
                  },
                ],
                secondDiscussion:[
                  {
                    speaker:'tony',
                    content:'我觉得给分不能太苛刻吧'
                  },
                  {
                    speaker:'mary',
                    content:'你说的没道理'
                  },
                  {
                    speaker:'sam',
                    content:'楼上你们开玩笑的吧'
                  },
                ],
              },
              {name: 'AEFam',
                extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                link: 'http://image.cache.timepack.cn/nodejs.pdf',
                title:'dgdfhdh',
                hasFailScore:false,
                firstDiscussion:[
                  {
                    speaker:'moon',
                    content:'我觉得给吧'
                  },
                  {
                    speaker:'mwary',
                    content:'没道理'
                  },
                  {
                    speaker:'sasm',
                    content:'开玩笑的吧'
                  },
                ],

                secondDiscussion:[
                  {
                    speaker:'asdc',
                    content:'啊啊啊啊啊'
                  },
                  {
                    speaker:'mdy',
                    content:'你说的没道理'
                  },
                  {
                    speaker:'wsxm',
                    content:'楼上你们废物开玩笑的吧'
                  },
                ],
              },
              {name: 'Ssdfam',
                extract:'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxsssssssssssssssssssssssssssssssssssssssssssssssssxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                link: '',
                title:'retrdfhdfg',
                hasFailScore:true,
                firstDiscussion:[
                  {
                    speaker:'msdsn',
                    content:'我觉得给吧'
                  },
                  {
                    speaker:'sdjod',
                    content:'没道理'
                  },
                  {
                    speaker:'sdddw',
                    content:'开玩笑丢掉的吧'
                  },
                ],
                secondDiscussion:[
                  {
                    speaker:'tony',
                    content:'我觉得给分不能太苛刻吧'
                  },
                  {
                    speaker:'mary',
                    content:'你说的没道理'
                  },
                  {
                    speaker:'sam',
                    content:'楼上你们开玩笑的吧'
                  },
                ],
              },

            ]
          },

        }
      },
      created: function () {
        this.$axios.post('/audit', {
          username: this.$store.state.userDetails,
          contactName:this.contactName
        })
          .then(resp => {
            if (resp.status === 200 && resp.data.hasOwnProperty("essayNeedHandle")) {
              this.essaysNeedHandle = resp.data.essayNeedHandle
        this.pageCount = new Array(this.authors.length)
        for(var i = 0; i < this.authors.length;i++){
          //一定要用闭包或者foreach,加载pdf页数
          var auditVM = this;
          (function(i){
          //alert('初始元素'+i+":"+auditVM.pageCount[i])
          pdf.createLoadingTask(auditVM.authors[i].link).promise.then(pdf => {
            auditVM.pageCount[i] = pdf.numPages
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
        reply(aus,speaker,content){
          this.currentAus=aus;
          this.commentWindowVisible=true;
          this.aPieceOfComment='[回复'+speaker+':'+content+']';
        },
        myView(aus){
          this.currentAus=aus;
          this.commentWindowVisible=true;
          this.aPieceOfComment='';
        },
        sendMyComment1(content){
          if(content.length===0){
            this.$message({
              showClose: true,
              message: '评论长度不能为空',
              type: 'warning'
            });
          }
          else{
            var tmp={
              speaker:'',
              content:'',
            };
            tmp.speaker='me';
            tmp.content=content;
            this.currentAus.firstDiscussion.push(tmp);
            //还要把这条记录增加到数据库里面去
            this.addFirstDiscussionCommentToBackend(content)
            this.commentWindowVisible=false;
          }

        },
        addFirstDiscussionCommentToBackend(content){
          this.$axios.post('/addFirstDiscussionCommentToBackend', {
            meetingFullname:this.contactName,
            authorName:this.currentAus.name,
            essayTitle:this.currentAus.title,

            speaker: this.$store.state.userDetails,
            content:content,
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message({
                  showClose: true,
                  message: '评论成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  showClose: true,
                  message: '评论异常！',
                  type: 'warning'
                });
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
        sendMyComment2(content){
          if(content.length===0){
            this.$message({
              showClose: true,
              message: '评论长度不能为空',
              type: 'warning'
            });
          }
          else{
            var tmp={
              speaker:'',
              content:'',
            };
            tmp.speaker='me';
            tmp.content=content;
            this.currentAus.secondDiscussion.push(tmp);
            //还要把这条记录增加到数据库里面去
            this.addSecondDiscussionCommentToBackend(content)
            this.commentWindowVisible=false;
          }

        },
        addSecondDiscussionCommentToBackend(content){
          this.$axios.post('/addSecondDiscussionCommentToBackend', {
            meetingFullname:this.contactName,
            authorName:this.currentAus.name,
            essayTitle:this.currentAus.title,

            speaker: this.$store.state.userDetails,
            content:content,
          })
            .then(resp => {
              if (resp.status === 200) {
                this.$message({
                  showClose: true,
                  message: '评论成功',
                  type: 'success'
                });
              } else {
                this.$message({
                  showClose: true,
                  message: '评论异常！',
                  type: 'warning'
                });
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
        downloadEssay(url){
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
          this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title,auditWay:'audit'}});
        },
        // firstChange(name,title){
        //   this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title,auditWay:'firstChange'}});
        // },
        firstChange(name,title){
          var firstChangeRecord;
          this.$axios.post('/whetherChangedInFirstDiscussion', {
            meetingFullname:this.contactName,
            authorName:this.currentAus.name,
            essayTitle:this.currentAus.title,
            pcMemberName: this.$store.state.userDetails,
          })
            .then(resp => {
              if (resp.status === 200 && resp.data.hasOwnProperty("firstChangeRecord")) {
                 firstChangeRecord = resp.data.firstChangeRecord;
                 if(firstChangeRecord===1){
                   this.$message({
                     showClose: true,
                     message: '第二次讨论中已修改，不能二次修改评审！',
                     type: 'warning'
                   });
                 }
                 else{
                   this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title,auditWay:'firstChange'}});
                 }
              }
               else {
                this.$message({
                  showClose: true,
                  message: '评审状态获取异常！',
                  type: 'warning'
                });
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
        // secondChange(name,title){
        //   this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title,auditWay:'secondChange'}});
        // },
        secondChange(name,title){
          var secondChangeRecord;
          this.$axios.post('/whetherChangedInSecondDiscussion', {
            meetingFullname:this.contactName,
            authorName:this.currentAus.name,
            essayTitle:this.currentAus.title,
            pcMemberName: this.$store.state.userDetails,
          })
            .then(resp => {
              if (resp.status === 200 && resp.data.hasOwnProperty("secondChangeRecord")) {
                secondChangeRecord = resp.data.secondChangeRecord;
                if(secondChangeRecord===1){
                  this.$message({
                    showClose: true,
                    message: '第二次讨论中已修改，不能二次修改评审！',
                    type: 'warning'
                  });
                }
                else{
                  this.$router.push({path: '/readOver',query:{contactName:name,essayTitle:title,auditWay:'secondChange'}});
                }
              }
              else {
                this.$message({
                  showClose: true,
                  message: '评审状态获取异常！',
                  type: 'warning'
                });
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
  .discussArea{
    padding-left: 10%;
  }
  .secondDiscussArea{
    margin: 5%;
    padding: 5%;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
  }
  .firstDiscussArea{
    margin: 5%;
    padding: 5%;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
  }

</style>

