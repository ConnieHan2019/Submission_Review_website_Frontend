<template>
  <div class="helloWorld">
    <!-- home -->
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
          <ul class="menu mr-auto">
            <li class="active"><a href="index.html"><span class="fa fa-user" aria-hidden="true"></span>{{ msg }}</a></li>
            <!--<li><a href="">About</a></li>-->
            <li>
              <!-- First Tier Drop Down -->
              <label for="drop-2" class="toggle toggle-2"> <span class="fa fa-angle-down" aria-hidden="true"></span> </label>
              <a href="#">操作指南 <span class="fa fa-angle-down" aria-hidden="true"></span></a>
              <input type="checkbox" id="drop-2" />
              <ul>

                <li><a href="" class="drop-text">如何投稿</a></li>
                <li><a href="" class="drop-text">查看我的审稿进度</a></li>
                <li><a href="" class="drop-text">如何开办会议</a></li>
                <li><a href="" class="drop-text">账号丢失</a></li>
                <li><a href="" class="drop-text">人工服务</a></li>
              </ul>
            </li>
            <li><a href="">ENGLISH</a></li>
            <li><a href="">关于我们</a></li>
            <li class="social-icons ml-lg-3"><router-link to='/' @click.native='logout' v-if='out' >登出</router-link><router-link to='login' v-else>登录/注册</router-link></li>
            

          </ul>
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
      
      <div class="banner-hny-info">
        <h3>让世界看见你的观点</h3>
        <div class="top-buttons mx-auto text-center mt-md-5 mt-3">
          <a href="single.html" class="btn more mr-2">投稿</a>
          <router-link to = "contact" class="btn">申请会议</router-link>
        </div>
      <div class="d-flex banner" style="margin:3em 0 2em 2em">
       <!--<div class = "row">-->
          <div class="col-md-4">
            <div class="d-md-flex justify-content-center">
              <h5 class="counter">13228029</h5>
              <p class="para-w3pvt">篇文章</p>
            </div>
          </div>
         <!--<div class="col-md-4 stats_w3pvt_counter_grid mt-3">-->
            <div class="col-md-4">
            <div class="d-md-flex justify-content-center">
              <h5 class="counter">3504</h5>
              <p class="para-w3pvt">场会议</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="d-md-flex justify-content-center">
              <h5 class="counter">10663276</h5>
              <p class="para-w3pvt">位会员</p>
            </div>
          </div>
        </div>

      </div>
      <!-- //banner-hny-info -->
    </div>
    <!-- //banner slider -->
  </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$store.state.userDetails?this.$store.state.userDetails:"个人空间",
      out: this.$store.state.userDetails
    }
  },
  methods:{
    logout(){
      this.$store.commit('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
