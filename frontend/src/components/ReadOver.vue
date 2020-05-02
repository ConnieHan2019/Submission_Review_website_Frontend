<template>
    <div id="examInformation">
      <div id="page">
        <el-form :ref="commentForm" :model="commentForm" label-width="80px" :rules="rules">
          <el-form-item label="稿件评分" prop="score">
            <el-input type="text"
                      v-model="commentForm.score"
                      placeholder="请输入论文得分"
            ></el-input>
          </el-form-item>
          <el-form-item label="confidence" prop="confidence">
            <el-input type="text"
                      v-model="commentForm.confidence"
                      placeholder="请输入论文confidence"
            ></el-input>
          </el-form-item>
            <el-form-item label="评语" prop="comment">
              <el-input type="textarea"
                        v-model="commentForm.comment"
                        placeholder="请输入论文评语"
                        maxlength="800"
                        autosize
                        show-word-limit
              ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" round>Submit</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
</template>

<script>
    export default {
        name: "ReadOver",
       data(){
          return{
            commentForm:{
              score:'',
              confidence:'',
              comment:''
            },
            rules: {
              score: [{required: true, message: '', trigger: 'blur'}],
              confidence: [{required: true, message: '', trigger: 'blur'}],
              comment: [{required: true, message: '', trigger: 'blur'}],
            }
          }
       },
      methods:{

      }
    }
</script>

<style scoped>
  #examInformation{
    background-color: #52658F;
    padding-top: 120px;
    padding-left: 100px;
    padding-right: 100px;
    min-height: auto;
    padding-bottom: 30px;
  }
   #page{
     padding: 20px;
     border-radius: 2px;box-shadow: 0 2px 4px rgba(0, 0, 0, .44), 0 0 6px rgba(0, 0, 0, .44);color: #0c5460;color: black;
     background-color: white;
     margin: 20px;
     margin-bottom: 70px;
   }
</style>
