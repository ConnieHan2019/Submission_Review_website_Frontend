<template>
  <div class="hello">
    <li class="social-icons ml-lg-3"><a href="#" class="p-0 social-icon"><span class="fa fa-user" aria-hidden="true"></span>
           {{ msg }} 
          </a> </li>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: this.$store.state.userDetails
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
