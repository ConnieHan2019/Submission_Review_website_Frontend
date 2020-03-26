<template>
  <div class="contact">
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
          <li class="active"><a href="index.html">个人空间</a></li>
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

          <li class="social-icons ml-lg-3"><a href="#" class="p-0 social-icon"><span class="fa fa-user" aria-hidden="true"></span>
           
          </a> </li>

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
    <div id="base_contact">
    <el-form :model="contactForm"
             :rules="rules"
             class="contact_container"
             label-position="left"
             label-width="0px"
             v-loading="loading"
             :ref="contactForm">
    <!-- banner-hny-info -->
    <div class="banner-hny-info" style="padding-left: 200px;padding-top: 150px" >
      
      <el-form-item prop="shortname" style="margin-bottom:25px">
      <label class="lb">会议简称:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.shortname"
                  auto-complete="off"
                  placeholder="  如ICSE2020"></el-input>
      </el-form-item>
      <el-form-item prop="fullname" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">会议全称:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.fullname"
                  auto-complete="off"
                  placeholder="  如The 42nd Conference on Software Engineering"></el-input>
      </el-form-item>
      <el-form-item prop="deadline" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">投稿截止日期:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.deadline"
                  auto-complete="off"
                  placeholder="  按照年-月-日的格式"></el-input>
      </el-form-item>
      <el-form-item prop="resultReleaseTime" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">结果发布日期:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.resultReleaseTime"
                  auto-complete="off"
                  placeholder="  按照年-月-日的格式"></el-input>
      </el-form-item>
      <el-form-item prop="organizationTime" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">举办时间:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.organizationTime"
                  auto-complete="off"
                  placeholder="  按照年-月-日的格式"></el-input>
      </el-form-item>
      <el-form-item prop="place" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">举办地点:</label>
        <el-input type="text"
                  class="textW"
                  v-model="contactForm.place"
                  auto-complete="off"
                  placeholder="  城市与国家用逗号分开，如“ Seoul, South Korea”"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary"
                   class="btn more mr-2"
                   style="width: 20%;background: #afb4db;border: none;font-size:15px;font-weight:600"
                   v-on:click="contact(contactForm)">申请会议</el-button>
      </el-form-item>
    </div>
    <!-- //banner-hny-info -->
    </el-form>
  </div>
  </div>
  <!-- //banner slider -->
</div>
  </div>
</template>

<script>
import {timeValid,placeeValid} from '../assets/js/dataValid';

export default {
  name: 'Contact',
  data () {
    return {
      contactForm: {
        shortname: '',
        fullname: '',
        deadline: '',
        resultReleaseTime: '',
        organizationTime: '',
        place: ''
      },
      rules: {
        shortname: [{required: true, message: '', trigger: 'blur'}],
        fullname: [{required: true, message: '', trigger: 'blur'}],
        deadline: [{required: true, message: '', trigger: 'blur'}, {validator: timeValid, trigger: 'blur'}],
        resultReleaseTime: [{required: true, message: '', trigger: 'blur'}, {validator: timeValid, trigger: 'blur'}],
        organizationTime: [{required: true, message: '', trigger: 'blur'}, {validator: timeValid, trigger: 'blur'}],
        place: [{required: true, message: '', trigger: 'blur'}, {validator: placeeValid, trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    contact (formName) {
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post('/contact', {
        shortname: this.contactForm.shortname,
        fullname: this.contactForm.fullname,
        deadline: this.contactForm.deadline,
        resultReleaseTime: this.contactForm.resultReleaseTime,
        organizationTime: this.contactForm.organizationTime,
        place: this.contactForm.place
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
        } else {
          alert('wrong submit')
        }
      })
      
    }
  }
}
</script>
<style scoped>
  .contact_container{
    border-radius: 15px;
    background-clip: padding-box;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .contact_title {
    margin: 0px auto 10px auto;
    text-align: center;
    color: #494e8f;
  }
  
  .lb{
      margin-bottom: 25px;
      color: white;
      position:absolute;
    left:400px;
    font-size:17px;
    padding:3px;
  }
  .textW >>> input{
      border-radius: 5px;
      width: 400px;
      font-size:17px;
  }
  >>> .el-form-item__error{
    position:absolute;
    left:533px;
    font-size:15px;
    color:#f00;
  }
  
</style>