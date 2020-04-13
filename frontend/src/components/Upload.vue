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
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(form)">上传到服务器</el-button>
</el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Upload",
    data() {
      return {
        fileList:[],
        form: {
          title: '',
          extract: '',
        },
      rules: {
        title: [{required: true, message: '', trigger: 'blur'}],
        extract: [{required: true, message: '', trigger: 'blur'}]
      }
      }
    },
    methods: {
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
            formData.append('meetingFullname',this.$route.query.name)
            console.log(formData.get('file'))
            this.$axios.post('/upload', formData)
            .then(resp => {
              if(resp.status === 200){
                alert('success')
              }
              else{
                alert('fail')
              }
              console.log(resp)
            })
            .catch(error => {
              alert('error')
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
    height: 630px;
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
</style>
