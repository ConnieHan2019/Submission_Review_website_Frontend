<template>
  <div id="base_login">
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
    <div class="banner-hny-info" style="padding-top: 150px" >
    <el-form :model="loginForm"
             :rules="rules"
             class="login_container"
             label-position="left"
             label-width="0px"
             v-loading="loading"
             :ref="loginForm">
      <h3 class="login_title">Login</h3>
      <el-form-item prop="username" style="margin-bottom:20px">
        <el-input type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="  username"
                  style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item prop="password" style="margin-bottom:20px">
        <el-input type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="  password"
                  style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   class="btn more mr-2"
                   style="width: 20%;background: #afb4db;border: none;font-size:15px;font-weight:600"
                   v-on:click="login(loginForm)">Login</el-button>

          <el-button type="primary"
                   class="btn more mr-2"
                     style="width: 20%;background: #afb4db;border: none;font-size:15px;font-weight:600"><router-link to="register"
                     style="text-decoration: none;color: #232323; font-size:15px">register</router-link></el-button>

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
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true, message: '', trigger: 'blur'}],
        password: [{required: true, message: '', trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
            // alert("Log in successfully")
            this.$store.commit('login', resp.data)
            this.$router.replace({path:'/'})
            //this.$router.replace({path: this.$route.query.redirect})
            location.reload() 
          }
          else{
            alert('some mistake')
          }
        })
        .catch(error => {
          console.log('login error')
          console.log(error)
          alert('login error')
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
  body{
    margin: 0px;
    padding: 0px;
  }
  .login_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: auto;
    width: 400px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 10px auto 20px auto;
    text-align: center;
    color: #CCCCFF;
  }
  button{
    padding:0;
    margin:15px;
    height:35px;
    box-shadow: 0 0 25px #cac6c6;
  }
  >>> input{
      border-radius: 5px;
      width: 250px;
      font-size:20px;
  }
  >>> .el-form-item__error{
    position:absolute;
    left:510px;
    font-size:15px;
    color:#f00;
  }
</style>
