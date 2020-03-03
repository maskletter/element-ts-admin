<template>
    <div class="page-container">
        <div style="color:#666">注:后续添加筛选,分页功能</div><br>
        <el-card>
            <div slot="header" class="clearfix">
                <span>默认使用</span>
            </div>
            <MlTable download :column='column' :data='tableData'></MlTable>
        </el-card><br>
        <el-card>
            <div slot="header" class="clearfix">
                <span>使用slot</span>
            </div>    
            <MlTable :column='column2' :data='tableData'>
                <template v-slot:name='{scope}'>
                    ???{{scope.name}}
                </template>
                <template v-slot:other>
                    <el-button>添加</el-button>
                </template>
            </MlTable>
        </el-card><br>
        <el-card>
            <div slot="header" class="clearfix">
                <span>动态设置列</span>
                <div style="float:right">显示的列: &nbsp;&nbsp;&nbsp;
                    <el-checkbox-group v-model="checkList" @change="columChange" style="float:right">
                        <el-checkbox label="date">日期</el-checkbox>
                        <el-checkbox label="name">姓名</el-checkbox>
                        <el-checkbox label="address">地址</el-checkbox>
                    </el-checkbox-group>
                </div>
                
            </div>    
            
            <MlTable :column='dynamicTable' :data='tableData'></MlTable>
        </el-card><br>
     
        
        
    </div>
</template>
<script lang="ts" src='./ts/demo-table.ts'></script>