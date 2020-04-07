<template>
  <div class="contact">
  <!-- home -->
<div id="home">
  
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
    <div class="banner-hny-info" style="padding-bottom: 0px;padding-top: 100px" >
      
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
        <el-date-picker
          v-model="contactForm.deadline"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="resultReleaseTime" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">结果发布日期:</label>
        <el-date-picker
          v-model="contactForm.resultReleaseTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="organizationTime" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">举办时间:</label>
        <el-date-picker
          v-model="contactForm.organizationTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="place" style="font-size:15px;color:#f00;margin-bottom:25px">
        <label class="lb">举办地点:</label>
        <el-cascader v-model="contactForm.place" :options="options" :props="{ expandTrigger: 'hover' }" placeholder="举办地点"></el-cascader>
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      pickerOptions1: {
        disabledDate(time) {
         /* if (this.contactForm.deadline) {
           return (time.getTime() < (new Date(this.contactForm.deadline).getTime() - 24 * 60 * 60 * 1000));
          }
          else{*/
            return time.getTime() < Date.now();
      //   }
        },
      },
      pickerOptions2: {
        disabledDate(time) {
         /* if (this.contactForm.deadline) {
            return (time.getTime() < (new Date(this.contactForm.deadline).getTime() - 24 * 60 * 60 * 1000));
          }
          else{*/
            return time.getTime() < Date.now();
         // }
        },
      },
      contactForm: {
        shortname: '',
        fullname: '',
        deadline: '',
        resultReleaseTime: '',
        organizationTime: '',
        place: '',
      },
      options:[{
                value:'Asia',
                label:'Asia',
                children:[{ value:'China', label:'China'},
                          {value:'India', label:'India'},
                ]
               },
              {
                value:'Europe',
                label:'Europe',
                children:[{ value:'England', label:'England'},
                          {value:'France', label:'France'},
                         ]
             }],
      rules: {
        shortname: [{required: true, message: '', trigger: 'blur'}],
        fullname: [{required: true, message: '', trigger: 'blur'}],
        deadline: [{required: true, message: '', trigger: 'blur'}, { trigger: 'blur'}],
        resultReleaseTime: [{required: true, message: '', trigger: 'blur'}, { trigger: 'blur'}],
        organizationTime: [{required: true, message: '', trigger: 'blur'}, { trigger: 'blur'}],
         // place: [{required: true, message: '', trigger: 'blur'}, { trigger: 'blur'}]
      },
      loading: false
    }
  },
  methods: {
    userTypeChange() {
    },
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
    left:300px;
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
    left:433px;
  }

  
</style>
