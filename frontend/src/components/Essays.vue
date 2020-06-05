//这个组件包含该会议的所有稿件，以及分配和审核状态
<script>
export default{
    name:'Essays',
    props:{
        contactName:String,
        state:Number
    },
    data(){
        return{
            essaysData:[{
                title:'title1',
                writer:['zyr','hty'],
                topic:['Beauty','Life','Food'],
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
                state:'审核中',
                rebuttal:'未提交'
            },{
                title:'title2',
                writer:['zyr','hty'],
                topic:['Beauty','Life','Food'],
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
                state:'审核中',
                rebuttal:'已提交'
            },{
                title:'title3',
                writer:['zyr','hty'],
                topic:['Beauty','Life','Food'],
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
                state:'审核中',
                rebuttal:'已提交'
            },{
                title:'title4',
                writer:['zyr','hty'],
                topic:['Beauty','Life','Food'],
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
                state:'已完成',
                rebuttal:'已提交'
            }]
        }
    },
    watch:{
        state:function(val){
            if(val >= 3){
                //post for assignment
        this.$axios.post('/essaysData',{
            contactFullName:this.contactName,
            contactState:val
        })
        .then(resp => {
            if(resp.status === 200 && resp.data.hasOwnProperty('respEssaysData')){
                this.essaysData = resp.data.respEssaysData
                this.transform();
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
        this.transform();
        this.$axios.post('/essaysData',{
            contactFullName:this.contactName,
            contactState:this.state
        })
        .then(resp => {
            if(resp.status === 200 && resp.data.hasOwnProperty('respEssaysData')){
                this.essaysData = resp.data.respEssaysData
                //console.log(resp.data.respEssaysData)
                //将字符数组处理成字符串
                this.transform();
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
            //以确保state==3
            for(var i = 0; i < this.essaysData.length;i++){
                if(this.essaysData[i].state === '审核中'){
                    this.$message.error('还有稿件未完成，无法公布结果')
                    return
                }
            }
            //发布结果
            this.$axios.post('/releaseResult',{
                contactFullName:this.contactName
            })
            .then(resp => {
                if(resp.status === 200){
                    this.$message({type:'success',message:'发布成功'})
                    this.$emit('releaseResult')
                }
            })
            .catch(error => {
                if(error.repsonse){
                    this.$message.error('发布失败')
                }
                else{
                    this.$message.error('出现了一些错误，请重试')
                }
                console.log('发布失败')
                console.log(error)
            })
        },
        releaseSecondResult(){
            //以确保state==5
            for(var i = 0; i < this.essaysData.length;i++){
                if(this.essaysData[i].rebuttal==="已提交" && this.essaysData[i].state === '审核中'){
                    this.$message.error('还有稿件未完成，无法公布结果')
                    return
                }
            }
            //发布结果
            this.$axios.post('/releaseSecondResult',{
                contactFullName:this.contactName
            })
            .then(resp => {
                if(resp.status === 200){
                    this.$message({type:'success',message:'发布成功'})
                    this.$emit('releaseSecondResult')
                }
            })
            .catch(error => {
                if(error.repsonse){
                    this.$message.error('发布失败')
                }
                else{
                    this.$message.error('出现了一些错误，请重试')
                }
                console.log('发布失败')
                console.log(error)
            })
        },
        endRebuttal(){
            alert("end")
            this.$axios.post('/endRebuttal',{
                contactFullName:this.contactName
            })
            .then(resp => {
                if(resp.status === 200){
                    this.$message({type:'success',message:'驳斥提交阶段已结束'})
                    this.$emit('endRebuttal')
                }
            })
            .catch(error => {
                if(error.repsonse){
                    this.$message.error('终止失败')
                }
                else{
                    this.$message.error('出现了一些错误，请重试')
                }
                console.log('终止失败')
                console.log(error)
            })
        },
        transform(){
            //将字符数组处理成字符串
    for(var i = 0;i < this.essaysData.length; i++){
      var temp = "";
      var arrTopic = this.essaysData[i].topic;
      for(var j = 0;j < arrTopic.length; j++){
        if(j > 0){
          temp += '/';
        }
        temp += arrTopic[j];
      }
      this.essaysData[i].topic = temp;
      temp = "";
      var arrWriter = this.essaysData[i].writer;
      for(var j = 0;j < arrWriter.length; j++){
        if(j > 0){
          temp += ',';
        }
        temp += arrWriter[j];
      }
      this.essaysData[i].writer = temp;
    }
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
      v-if='state>3'
      prop="rebuttal"
      label="驳斥情况">
    </el-table-column>
    <el-table-column
      width='200px'
      label="论文状态">
      <template v-slot="scope">
      <p v-if="state < 3">未分配</p>
      <p v-else-if="state == 4">已发布初审结果</p>
<div v-else-if='state == 3'>
<el-popover
  placement="left"
  trigger="click">
  <el-table :data="essaysData[scope.$index].assignment">
    <el-table-column property="name" label="审稿人"></el-table-column>
    <el-table-column property="state" label="状态"></el-table-column>
  </el-table>
  <el-button slot="reference">初审,{{essaysData[scope.$index].state}},点击查看</el-button>
</el-popover>
</div>
<div  v-else-if='state == 5'>
<p v-if='essaysData[scope.$index].rebuttal == "未提交"'>未提交驳斥，不进行复审</p>
<el-popover
  v-else
  placement="left"
  trigger="click">
  <el-table :data="essaysData[scope.$index].assignment">
    <el-table-column property="name" label="审稿人"></el-table-column>
    <el-table-column property="state" label="状态"></el-table-column>
  </el-table>
  <el-button slot="reference">复审,{{essaysData[scope.$index].state}},点击查看</el-button>
</el-popover>
</div>
      <p v-else>已发布最终结果</p>
      </template>
    </el-table-column>
  </el-table>
  <el-button v-if="state==3" type="info" icon="el-icon-message" @click='releaseResult' style='float:right; margin-top:10px'>发布初审结果</el-button>
  <el-button v-if="state==5" type="info" icon="el-icon-message" @click='releaseSecondResult' style='float:right; margin-top:10px'>发布最终结果</el-button>
  <el-button v-if="state==4" type="info" icon="el-icon-message" @click='endRebuttal' style='float:right; margin-top:10px'>终止驳斥提交</el-button>
</div>
</template>