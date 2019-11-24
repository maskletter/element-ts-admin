<template>
    <div class="page-container">
        <NavigationTool>
            <el-button type='primary' size='mini' @click="add()">添加</el-button>
        </NavigationTool>
        <el-card>
           <MlTable 
                :data='data' 
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                :column='column' 
                row-key="id" 
                default-expand-all
                :border='true' >
                <template slot-scope="row" slot='operating'>
                    <el-button type='primary' @click="edit(row.scope.id, row.scope)" size='mini'>编辑</el-button>
                    <el-button size='mini' @click="add(row.scope.id)">添加子项</el-button>
                </template>
            </MlTable>
        </el-card>
        <el-dialog :title="editId&&!isAddChild?'编辑':'添加'" :visible.sync='showDialog'>
            <h1 v-if='isAddChild' style="margin-top: -20px;">添加子项</h1><br>
            <ml-form ref="$form" :data='dataFrom' @submit="formSubmit" label-width='60px' confirm-button-text='确定'></ml-form>
        </el-dialog>
    </div>
</template>
<script src='./ts/permission'></script>