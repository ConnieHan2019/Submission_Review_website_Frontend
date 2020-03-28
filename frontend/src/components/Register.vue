<template>
  <div id="base_register">
  <div id="home">
  <!--/top-nav -->
  <div class="top_w3pvt_main container">
    <!--/header -->
    <header class="nav_w3pvt text-center ">
      <!-- nav -->
      <nav class="wthree-w3ls">
        <div id="logo">
          <h1> <a class="navbar-brand px-0 mx-0" href="index.html">Infinitude
          </a>
          </h1>
        </div>

        <label for="drop" class="toggle">导航</label>
        <input type="checkbox" id="drop" />
      </nav>
      <!-- //nav -->
    </header>
    <!--//header -->
  </div>
  <!-- //top-nav -->
  <!-- banner slider -->
  <div id="homepage-slider" class="st-slider">
    <input type="radio" class="cs_anchor radio" name="slider" id="play1" checked="" />
    <input type="radio" class="cs_anchor radio" name="slider" id="slide1" />
    <input type="radio" class="cs_anchor radio" name="slider" id="slide2" />
    <input type="radio" class="cs_anchor radio" name="slider" id="slide3" />
    <div class="images">
      <div class="images-inner">
        <div class="image-slide">
          <div class="banner-w3pvt-1">
            <div class="overlay-w3ls">

            </div>

          </div>
        </div>
        <div class="image-slide">
          <div class="banner-w3pvt-2">
            <div class="overlay-w3ls">

            </div>
          </div>
        </div>
        <div class="image-slide">
          <div class="banner-w3pvt-3">
            <div class="overlay-w3ls">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="labels">
      <div class="fake-radio">
        <label for="slide1" class="radio-btn"></label>
        <label for="slide2" class="radio-btn"></label>
        <label for="slide3" class="radio-btn"></label>
      </div>
    </div>
             <!-- banner-hny-info -->
    <div class="banner-hny-info" style="padding-top: 50px" >
    <el-form :model="registerForm" :rules="rules" class="register_container" label-position="left"
             label-width="0px" v-loading="loading" :ref="registerForm">
      <h3 class="register_title">Register</h3>
      <el-form-item prop="username" style="margin-bottom:20px">
        <el-input type="text" v-model="registerForm.username" 
                  auto-complete="off" placeholder="  username,e.g. rjgc2020" style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item prop="password" style="margin-bottom:20px">
        <el-input type="password" v-model="registerForm.password"
                  auto-complete="off" placeholder="  password, e.g. rjgclab2" style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item prop="email" style="margin-bottom:20px">
        <el-input type="email" v-model="registerForm.email"
                  auto-complete="off" placeholder="  email" style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item prop="fullname">
        <el-input type="text" v-model="registerForm.fullname" style="margin-bottom:20px"
                  auto-complete="off" placeholder="  fullname"></el-input>
      </el-form-item>
      <el-form-item prop="sector">
        <el-input type="text" v-model="registerForm.sector" style="margin-bottom:20px"
                  auto-complete="off" placeholder="  sector"></el-input>
      </el-form-item>
      <el-form-item prop="country">
        <el-input type="text" v-model="registerForm.country" style="margin-bottom:20px"
                  auto-complete="off" placeholder="  country"></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" class="btn more mr-2" style="width: 30%;background: #afb4db;border: none" v-on:click="register(registerForm)">register</el-button>
      </el-form-item>
    </el-form>
    </div>
    <!-- //banner-hny-info -->
  </div>
  <!-- //banner slider -->
</div>
    
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
        username: [{required: true, message: '', trigger: 'blur'}, {validator: usernameValid, trigger: 'blur'},{min: 5, max: 32, message: 'Please input 5-32 characters', trigger: 'blur'}],
        password: [{required: true, message: '', trigger: 'blur'}, {validator: passwordValid, trigger: 'blur'},{min: 6, max: 32, message: 'Please input 6-32 characters', trigger: 'blur'}],
        email: [{required: true, message: '', trigger: 'blur'}, {validator: emailValid, trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    userTypeChange() {
    },
    register(formName) {
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
                // alert('successful registration')
                this.$router.replace('/login')
              }
              else{
                alert('some mistake')
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
  .register_container{
    border-radius: 15px;
    background-clip: padding-box;
    width: 500px;
    top:10px;
    margin:auto ;
    padding:20px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .register_title{
    margin-bottom:10px;
    text-align: center;
    color: #CCCCFF;
  }
  button{
    padding:0;
    height:35px;
    font-weight:600;
    box-shadow: 0 0 25px #cac6c6;
  }
  >>> input{
      border-radius: 5px;
      width: 400px;
      font-size:20px;
  }
  >>> .el-form-item__error{
    position:absolute;
    left:433px;
    font-size:15px;
    color:#f00;
  }
</style>
