
<template>
    <div class="login-container">
        <el-card style="padding: 0 30px">
            <h1>vue+ts+parcel</h1>
            <el-form status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="pass">
                    <el-input type="text" autocomplete="off" v-model='form.username' style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="checkPass">
                    <el-input type="password" autocomplete="off" v-model='form.password' style="width:300px"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="height: 50px"></div>
                    <el-button type="primary" :loading='loading' @click="loginEvent">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- <router-link to="/system/account">xxxxxxxxxxxx</router-link> -->
    </div>
</template>
<style lang="scss">
    .login-container{ width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;background: #f5f5f5; 
        h1{ margin: 30px 0 50px;font-size: 30px; }
    }
</style>
<script lang='ts' src='./ts/login.ts'> </script>