<template>
  <div id="uploadWindow">
    <div id="window">
      <p>投稿会议名：<span style="color: #0c5460">{{this.$route.query.name}}</span></p>
      <el-form :ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="论文标题" prop="title">
          <el-input type="text"
                    v-model="form.title"
                    placeholder="请输入论文标题"
                    maxlength="50"
                    show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="extract">
          <el-input type="textarea"
                    v-model="form.extract"
                    autosize
                    placeholder="请输入论文摘要"
                    maxlength="800"
                    show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="文章作者" prop="writer">
          <el-input type="textarea"
                    v-model="form.writer"
                    autosize
                    placeholder="请添加该篇文章的作者"
          ></el-input>
        </el-form-item>

        <el-form-item label="论文标签" prop="topic">
          <div class="window" id="inputTopic" style="margin-bottom:25px">
            <el-tag
              :key="tag"
              v-for="tag in topic"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
          </div>
        </el-form-item>

        <div class="window" id="topicList">

          <b>该会议对应topic</b><br>
          <el-tag
            class="d-tag"
            :key="defaultTag"
            v-for="defaultTag in form.meetingTags"
            @click="addTopic(defaultTag)"
            type="success"
            :disable-transitions="false"
          >
            {{defaultTag}}
          </el-tag>
        </div>

        <el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            accept='.pdf'
            :http-request='uploadFileMethod'
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">重新选取选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(form)">上传到服务器</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "EditMyEssay",
    data() {
      return {
        fileList:[],
        meetingTags:['标签1','标签2','标签3','标签4',],
        topic:[],
        form: {
          title: 'aaa',
          extract: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          writer:[],
          meetingTags:['标签1','标签2','标签3','标签4',],
        },
        rules: {
          title: [{required: true, message: '', trigger: 'blur'}],
          extract: [{required: true, message: '', trigger: 'blur'}],
          writer: [{required: true, message: '', trigger: 'blur'}],
          topic: [{required: true, message: '', trigger: 'blur'}]
        }
      }
    },

    created:function(){
      this.$axios.post('/editAuthorEssay',{
        //会议全名
        fullname:'会议全名',
        //投稿人的名字
        author:'投稿人',
        //投稿的文章名
        essayTitle:'投稿文章名'
      })
        .then(resp => {
          if(resp.status === 200 && resp.data.hasOwnProperty('essaySubmitInformation')){
            this.form=resp.data.essaySubmitInformation
          }
          else{
            console.log('返回投稿信息错误')
            console.log(resp)
          }
        })
        .catch(error => {
          console.log('投稿信息加载失败')
          console.log(error)
        })
    },

    methods: {
      handleClose(tag) {
        this.topic.splice(this.topic.indexOf(tag), 1);
        //把删掉的标签扔回未选里面去
        this.form.meetingTags.push(tag);
      },
      addTopic(str){
        this.topic.push(str);
        //标签被选过一次就不能再重复选了
        this.form.meetingTags.splice(this.form.meetingTags.indexOf(str), 1);

      },
      submitUpload(formName) {
        this.$refs[formName].validate(valid => {
          if(valid){
            this.$refs.upload.submit();
          }
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadFileMethod(param){
        let fileObject = param.file;
        let formData = new FormData();
        formData.append("file", fileObject);
        formData.append('title',this.form.title)
        formData.append('authorname',this.$store.state.userDetails)
        formData.append('summary',this.form.extract)
        formData.append('writer',this.form.writer)
        formData.append('topic',this.topic)
        formData.append('meetingFullname',this.$route.query.name)
        console.log(formData.get('file'))
        this.$axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(resp => {
            if(resp.status === 200){
              this.$message({
                type:'success',
                showClose: true,
                message: '上传成功'
              })
            }
            else{
              this.$message({
                type:'success',
                showClose: true,
                message: '上传失败'
              })
            }
            console.log(resp)
          })
          .catch(error => {
            this.$message({
              type:'success',
              showClose: true,
              message: '上传失败'
            })
            console.log(error.response)
          })
      }
    }
  }
</script>

<style scoped>
  #uploadWindow{
    background-color: #52658F;
    padding-top: 70px;
    padding-left: 100px;
    padding-right: 100px;
    min-height: auto;
    padding-bottom: 30px;
  }
  #window{
    padding: 20px;
    border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
    background-color: white;
    margin: 20px;
  }
  .el-button--success{
    background-color:#feac00;
    border-color:#feac00;
  }
  .el-tag{
    margin-left: 5px;
  }
  .window{
    background-color: white;
    margin: 0 auto;
    margin-bottom: 25px;
    border:1px solid lightgrey;
    border-radius: 4px;
  }
  #inputTopic{
    min-height: 45px;
    height:auto;
  }
  #topicList{
    padding: 20px;
  }

</style>
