//这个组件包含该会议的所有稿件，以及分配和审核状态
<script>
export default{
    name:'Essays',
    props:{
        contactName:String,
        organizationTime:String,
        state:Number
    },
    data(){
        return{
            
        }
    },
  computed:{
      
  },
    created:function(){
    },
    methods:{
        
    }
}
</script>

<template>
<div id='Essays'>
{{contactName}}的稿件有：shjdshfshfsfhdsfhsdkfsd
状态是{{state}}
会议举办时间是{{organizationTime}}
</div>
</template>