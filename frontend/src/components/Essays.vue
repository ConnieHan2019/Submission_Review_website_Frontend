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
                }],
                state:'未完成'
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
                }],
                state:'未完成'
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
                }],
                state:'未完成'
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
                }],
                state:'已完成'
            },]
        }
    },
    watch:{
        state:function(val){
            this.show = val
            if(val === 3){
                alert('change')
            }
        }
    },
    created:function(){
        this.$axios.post('/essaysData',{
            contactFullName:this.contactName
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
            if(new Date(this.organizationTime).getTime() < new Date().getTime()){
                this.$message.error('会议已举办，不能再发布结果')
                return
            }
            for(var i = 0; i < this.essaysData.length;i++){
                if(this.essaysData[i].state === '未完成'){
                    this.$message.error('还有稿件未完成，无法公布结果')
                    return
                }
            }
            //发布结果
            alert('发布结果')
        }
    }
}
</script>

<template>
<div id='Essays'>
{{contactName}}的稿件有：shjdshfshfsfhdsfhsdkfsd
状态是{{state}}
会议举办时间是{{organizationTime}}
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
      <p v-if="state < 3">未分配稿件</p>
      <p v-else-if="state > 3">已发布结果</p>
      <template v-slot="scope" v-if='state === 3'>
<el-popover
  placement="left"
  trigger="click">
  <el-table :data="essaysData[scope.$index].assignment">
    <el-table-column property="name" label="审稿人"></el-table-column>
    <el-table-column property="state" label="状态"></el-table-column>
  </el-table>
  <el-button slot="reference">已分配,{{essaysData[scope.$index].state}},点击查看</el-button>
</el-popover>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="info" icon="el-icon-message" @click='releaseResult' style='float:right; margin-top:10px'>发布结果</el-button>
</div>
</template>