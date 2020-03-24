<template>
  <div class="hello">
   <div id="base_contact">
    <el-form :model="contactForm"
             :rules="rules"
             class="contact_container"
             label-position="left"
             label-width="0px"
             v-loading="loading">
      <h3 class="contact_title">contact</h3>
      <span>会议简称:</span>
      <el-form-item prop="abbreviation" style="font-size:15px;color:#f00">
        <el-input type="text"
                  v-model="contactForm.abbreviation"
                  auto-complete="off"
                  placeholder="如ICSE2020"
                  style="font-size:20px;color:#000"></el-input>
      </el-form-item>
      <span>会议全称:</span>
      <el-form-item prop="fullname" style="font-size:15px;color:#f00">
      
        <el-input type="fullname"
                  v-model="contactForm.fullname"
                  auto-complete="off"
                  placeholder="如The 42nd International Conference on Software Engineering"
                  style="font-size:20px;color:#000"></el-input>
      </el-form-item>
      <span>投稿截止日期:</span>
      <el-form-item prop="deadline" style="font-size:15px;color:#f00">
        <el-input type="deadline"
                  v-model="contactForm.deadline"
                  auto-complete="off"
                  placeholder="按照年-月-日的格式"
                  style="font-size:20px;color:#000"></el-input>
      </el-form-item>
      <span>结果发布日期:</span>
      <el-form-item prop="releasedate" style="font-size:15px;color:#f00">
        <el-input type="releasedate"
                  v-model="contactForm.releasedate"
                  auto-complete="off"
                  placeholder=" 按照年-月-日的格式"
                  style="font-size:20px;color:#000"></el-input>
      </el-form-item>
      <span>举办时间:</span>
      <el-form-item prop="holdtime" style="font-size:15px;color:#f00">
        <el-input type="holdtime"
                  v-model="contactForm.holdtime"
                  auto-complete="off"
                  placeholder="按照年-月-日的格式"
                  style="font-size:20px;color:#000"></el-input>
      </el-form-item>
      <span>举办地点:</span>
      <el-form-item prop="holdplace" style="font-size:15px;color:#f00">
        <el-input type="holdplace"
                  v-model="contactForm.holdplace"
                  auto-complete="off"
                  placeholder="城市与国家用逗号分开，如“ Seoul, South Korea”"
                  style="font-size:20px;color:#000；width:10px"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   style="width: 32%;background: #afb4db;border: none;font-size:15px;font-weight:600"
                   v-on:click="contact">contact</el-button>

      

      </el-form-item>
    </el-form>
  </div>
    
  </div>
  
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      contactForm: {
        abbreviation: '',
        fullname: '',
        deadline: '',
        releasedate: '',
        holdtime: '',
        holdplace: ''
      },
      rules: {
        abbreviation: [{required: true, message: '', trigger: 'blur'}],
        fullname: [{required: true, message: '', trigger: 'blur'}],
        deadline: [{required: true, message: '', trigger: 'blur'}],
        releasedate: [{required: true, message: '', trigger: 'blur'}],
        holdtime: [{required: true, message: '', trigger: 'blur'}],
        holdplace: [{required: true, message: '', trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    contact () {
      this.$axios.post('/contact', {
        abbreviation: this.contactForm.abbreviation,
        fullname: this.contactForm.fullname,
        deadline: this.contactForm.deadline,
        releasedate: this.contactForm.releasedate,
        holdtime: this.contactForm.holdtime,
        holdplace: this.contactForm.holdplace
      })
        .then(resp => {
          if (resp.status === 200 ) {
            alert("申请成功")
             this.$router.replace({path:'/'})
          } 
          else{
            alert('申请失败')
          }
        })
        .catch(error => {
          console.log(error)
          alert('contact error')
        })
    }
  }
}
</script>
<style scoped>
  #base_contact{
    background-position: center;
    background-size: cover;
    position: fixed;
    z-index:999;
    left:400px;
    top:0;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  .contact_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 600px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .contact_title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #494e8f;
  }
  button{
    margin:10px;
    height:35px;
    text-align: center;
    position:relative;
  }
  span{
    position:absolute;
    left:30px;
    font-size:20px;
  }
</style>