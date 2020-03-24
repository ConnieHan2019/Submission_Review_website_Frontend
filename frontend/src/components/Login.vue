<template>
  <div id="base_login">
    <el-form :model="loginForm"
             :rules="rules"
             class="login_container"
             label-position="left"
             label-width="0px"
             v-loading="loading">
      <h3 class="login_title">Login</h3>
      <el-form-item prop="username" style="font-size:15px;color:#f00">
        <el-input type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="username"
                  style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item prop="password" style="font-size:15px;color:#f00">
        <el-input type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="password"
                  style="font-size:25px;color:#000"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   style="width: 32%;background: #afb4db;border: none;font-size:15px;font-weight:600"
                   v-on:click="login">LOGIN</el-button>
        
          <el-button type="primary"
                     style="width: 32%;background: #afb4db;border: none;font-size:15px;font-weight:600"><router-link to="register" 
                     style="text-decoration: none;color: #232323; font-size:15px">register</router-link></el-button>
        
      </el-form-item>
    </el-form>
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
    login () {
      this.$axios.post('/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
        .then(resp => {
          if (resp.status === 200 && resp.data.hasOwnProperty("token")) {
            this.$store.commit('login', resp.data)
            this.$router.replace({path:'/'})
            //this.$router.replace({path: this.$route.query.redirect})
          } else if(resp.status === 400){
            alert('no user')
          }
          else if(resp.status === 600){
            alert('wrong password')
          }
          else{
            alert('some mistake')
          }
        })
        .catch(error => {
          console.log(error)
          alert('login error')
        })
    }
  }
}
</script>

<style scoped>
  #base_login{
    background-position: center;
    font-size:30px;
    background-size: cover;
    position: fixed;
    z-index:999;
    left:400px;
    top:50px;
  }
  body{
    margin: 0px;
    padding: 0px;
  }
  .login_container{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 500px;
    height:300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #494e8f;
  }
  button{
    margin:20px;
    height:35px;
    text-align: center;
    position:relative;
    top:0;
  }
</style>
