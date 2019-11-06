<template>
    <div class="app-container">
        <el-card>
            <div slot="header" class="clearfix">
                <span>表单组件</span>
                <el-button style="float: right; padding: 3px 0" type="text">查看json树</el-button>&nbsp;&nbsp;
                <el-button style="float: right; padding: 3px 0" type="text">查看json树</el-button>
            </div>
            <MlForm :data='createFormData' />
        </el-card><br>
        <el-card>
            <div slot="header" class="clearfix">
                <span>通过json渲染</span>
            </div>
            <el-row>
                <el-col :span='12'>
                    <jsoneditor :json='form' ref='jsoneditor'></jsoneditor><br>
                    <div style="text-align:center">
                        <el-button type='primary' @click="renderForm">渲染表单</el-button>
                    </div>
                </el-col>
                <el-col :span='12'>
                    <MlForm :data='renderFormData' />
                </el-col>
            </el-row>
            <div>
                <h1 style="line-height: 50px">写好的表单json</h1>
                <el-button type='primary' @click='setFormJson("login")'>登录</el-button>
                <el-button type='primary' @click='setFormJson("other2")'>样式1</el-button>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" src='./ts/demo-form.ts'></script>