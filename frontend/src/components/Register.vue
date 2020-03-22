<template>
  <div id="base_register">
    <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
             label-width="0px" v-loading="loading" :ref="registerForm">
      <h3 class="register_title">Register</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="registerForm.username" 
                  auto-complete="off" placeholder="username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="password"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="registerForm.email"
                  auto-complete="off" placeholder="email"></el-input>
      </el-form-item>
      <el-form-item prop="fullname">
        <el-input type="text" v-model="registerForm.fullname"
                  auto-complete="off" placeholder="fullname"></el-input>
      </el-form-item>
      <el-form-item prop="sector">
        <el-input type="text" v-model="registerForm.sector"
                  auto-complete="off" placeholder="sector"></el-input>
      </el-form-item>
      <el-form-item prop="country">
        <el-input type="text" v-model="registerForm.country"
                  auto-complete="off" placeholder="country"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 40%;background: #afb4db;border: none" v-on:click="register(registerForm)">register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {usernameValid, passwordValid, emailValid} from '../assets/js/dataValid';

export default {
  name: 'Register',
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        fullname: '',
        email: ''
      },
      rules: {
        // blur 失去鼠标焦点时触发验证
        username: [{required: true, message: '', trigger: 'blur'}, {validator: usernameValid, trigger: 'blur'},{min: 5, max: 32, message: 'length of username from 5 to 32 ', trigger: 'blur'}],
        password: [{required: true, message: '', trigger: 'blur'}, {validator: passwordValid, trigger: 'blur'},{min: 6, max: 32, message: 'length of username from 6 to 32', trigger: 'blur'}],
        email: [{required: true, message: '', trigger: 'blur'}, {validator: emailValid, trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    userTypeChange() {
    },
    register (formName) {
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post('/register', {
              username: this.registerForm.username,
              password: this.registerForm.password,
              fullname: this.registerForm.fullname,
              email: this.registerForm.email,
            }
          )
            .then(resp => {
              // 根据后端的返回数据修改
              if(resp.status === 200 && resp.data.hasOwnProperty("id")) {
                // 跳转到login
                alert('successful registration')
                this.$router.replace('/login')
              }else if(resp.status === 400){
                alert('username exists')
              } 
              else{
                alert('register error')
              }
            })
            .catch(error => {
              console.log(error)
              alert('register error')
            })
        } else {
          alert('wrong submit')
        }
      })
    }
  }
}
</script>

<style scoped>
  #base_register{
    //background: url("../assets/background/checkerboard-cross.png") repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
    z-index:999;
    left:100px;
  }
  .register_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register_title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>
