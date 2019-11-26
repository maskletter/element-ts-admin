<template>
    <div class="page-container">
        <NavigationTool>
            <el-button type='primary' size='mini' @click="add()">添加用户</el-button>
        </NavigationTool>
        <el-card>
           <ml-table :data='data' :column='column' border >
               <template slot="operating" slot-scope="row">
                   <el-button type='primary' size='mini'>编辑</el-button>
                   <el-button size='mini'>删除</el-button>
               </template>
           </ml-table>
        </el-card>
        <el-dialog title="添加用户" :visible.sync="showDialog">
            <el-form label-width="100px" :rules="rules" :model="form" ref="$form">
              <el-form-item label="用户名" prop="username">
                  <el-input placeholder="" v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input placeholder="" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="groupId">
                  <el-select v-model="form.groupId" placeholder="请选择">
                        <el-option
                        v-for="item in selectData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item label="">
                  <el-button type="primary" @click="submit">保存</el-button>
              </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script src='./ts/user'></script>