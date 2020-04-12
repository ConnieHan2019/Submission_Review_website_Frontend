<template>
  <div id="uploadWindow">
    <div id="window">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="论文标题">
          <el-input type="text"
                    v-model="form.title"
                    placeholder="请输入论文标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input type="textarea"
                    v-model="form.extract"
                    autosize
                    placeholder="请输入论文摘要"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">上传文件</el-button>
          <el-button>取消</el-button>
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
        form: {
          title: '',
          extract: '',
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(valid => {
          this.$axios.post('/contact', {
            title: this.form.title,
            extract: this.form.extract,
          })
            .then(resp => {
              if (resp.status === 200) {
                this.success()
                // alert("申请成功")
                this.$router.replace({path: '/'})
              } else {
                this.fail()
                // alert('申请失败')
              }
            })
            .catch(error => {
              console.log(error)
              this.contactError()
              //alert('contact error')
            })
        })


      }
    }
  }
</script>

<style scoped>
  #uploadWindow{
    background-color: #67809f;
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
</style>
