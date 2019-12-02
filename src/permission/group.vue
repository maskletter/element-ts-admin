<template>
    <div class="page-container">
        <NavigationTool>
            <el-button type='primary' size='mini' @click="add()">添加权限组</el-button>
        </NavigationTool>
        <el-card>
           <ml-table :data='data' :column='column' border >
               <template slot="operating" slot-scope="row">
                   <el-button type='primary' size='mini' @click="edit(row.scope.id, row.scope)">编辑</el-button>
                   <el-button size='mini' @click="remove(row.scope.id)">删除</el-button>
               </template>
           </ml-table>
        </el-card>
        <el-dialog title="添加权限组" :visible.sync="showDialog">
            <el-form label-width="100px" :rules="rules" :model="form" ref="$form">
              <el-form-item label="身份" prop="name">
                  <el-input placeholder="" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="选择权限" prop="permission">
                  <el-tree node-key="id" @check-change="checkChange" ref="$tree" :data="permissionData" show-checkbox :props="defaultProps"></el-tree>
              </el-form-item>
              <el-form-item label="">
                  <el-button type="primary" @click="submit">保存</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script src='./ts/group'></script>