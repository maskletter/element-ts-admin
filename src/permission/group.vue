<template>
    <div class="page-container">
        <el-card>
           <ml-table :data='data' :column='column' border >
               <template slot="operating" slot-scope="row">
                   <el-button type='primary' size='mini'>编辑</el-button>
                   <el-button size='mini'>删除</el-button>
               </template>
           </ml-table>
        </el-card>
    </div>
</template>
<script src='./ts/group'></script>