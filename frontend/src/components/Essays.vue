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
            show:1,
            essaysData:[{
                title:'title1',
                writer:'zyr,hty',
                topic:'Beauty/Life/Food',
                author:'Mary',
                assignment:[{
                    name:'hhh',
                    state:'已审核'
                },{
                    name:'ddd',
                    state:'审核中'
                },{
                    name:'ddd',
                    state:'审核中'
                }],
                state:'审核中'
            },{
                title:'title2',
                writer:'zyr,hty',
                topic:'Beauty/Life/Food',
                author:'Mary',
                assignment:[{
                    name:'hhh',
                    state:'已审核'
                },{
                    name:'ddd',
                    state:'审核中'
                },{
                    name:'ddd',
                    state:'审核中'
                }],
                state:'审核中'
            },{
                title:'title3',
                writer:'zyr,hty',
                topic:'Beauty/Life/Food',
                author:'Mary',
                assignment:[{
                    name:'hhh',
                    state:'已审核'
                },{
                    name:'ddd',
                    state:'审核中'
                },{
                    name:'ddd',
                    state:'审核中'
                }],
                state:'审核中'
            },{
                title:'title4',
                writer:'zyr,hty',
                topic:'Beauty/Life/Food',
                author:'Mary',
                assignment:[{
                    name:'hhh',
                    state:'已审核'
                },{
                    name:'ddd',
                    state:'已审核'
                },{
                    name:'ddd',
                    state:'已审核'
                }],
                state:'已完成'
            }],
            assignment:[]
        }
    },
    watch:{
        state:function(val){
            this.show = val
            if(val === 3){
                //post for assignment
        this.$axios.post('/essaysData',{
            contactFullName:val,
            contactState:this.state
        })
        .then(resp => {
            if(resp.status === 200 && resp.data.hasOwnProperty('respEssaysData')){
                this.essaysData = resp.data.respEssaysData
            }
            else{
                console.log('返回数据有误')
                console.log(resp)
            }
        })
        .catch(error => {
            console.log('稿件加载失败')
            console.log(error)
        })
            }
        }
    },
    created:function(){
        this.$axios.post('/essaysData',{
            contactFullName:this.contactName,
            contactState:this.state
        })
        .then(resp => {
            if(resp.status === 200 && resp.data.hasOwnProperty('respEssaysData')){
                this.essaysData = resp.data.respEssaysData
            }
            else{
                console.log('返回数据有误')
                console.log(resp)
            }
        })
        .catch(error => {
            console.log('稿件加载失败')
            console.log(error)
        })
    },
    methods:{
        releaseResult(){
            if(this.state < 3){
                this.$message.error('还未开启审稿，先去开启审稿吧~')
                return
            }
            if(this.state > 3){
                this.$message.error('已发布结果，不能再次发布')
                return
            }
            if(new Date(this.organizationTime).getTime() < new Date().getTime()){
                this.$message.error('已过会议举办时间，不能再发布结果')
                return
            }
                    this.$emit('releaseResult')
            for(var i = 0; i < this.essaysData.length;i++){
                if(this.essaysData[i].state === '审核中'){
                    this.$message.error('还有稿件未完成，无法公布结果')
                    return
                }
            }
            //发布结果
            this.axios.post('/releaseResult',{
                contactFullName:this.contactName
            })
            .then(resp => {
                if(resp.status === 200){
                    this.$message({type:'success',message:'发布成功'})
                    this.$emit('releaseResult')
                }
            })
        }
    }
}
</script>

<template>
<div id='Essays'>
<el-table
    :data="essaysData"
    border
    stripe
    style="width: 100%">
    <el-table-column
      prop="title"
      label="论文标题">
    </el-table-column>
    <el-table-column
      prop="writer"
      label="论文作者">
    </el-table-column>
    <el-table-column
      prop="topic"
      label="论文主题">
    </el-table-column>
    <el-table-column
      prop="author"
      label="投稿人">
    </el-table-column>
    <el-table-column
      label="分配或审核情况">
      <template v-slot="scope">
      <p v-if="state < 3">未分配稿件</p>
      <p v-else-if="state > 3">已结束审稿</p>
<el-popover
  v-else
  placement="left"
  trigger="click">
  <el-table :data="essaysData[scope.$index].assignment">
    <el-table-column property="name" label="审稿人"></el-table-column>
    <el-table-column property="state" label="状态"></el-table-column>
  </el-table>
  <el-button slot="reference">{{essaysData[scope.$index].state}},点击查看</el-button>
</el-popover>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="info" icon="el-icon-message" @click='releaseResult' style='float:right; margin-top:10px'>发布结果</el-button>
</div>
</template>