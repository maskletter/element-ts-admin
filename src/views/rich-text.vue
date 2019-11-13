<template>
    <div class="app-container">
        <el-card>
            <ckeditor ref='$ckeditor' v-model="ckeditorContent" />
            <el-button @click='getCkeditorValue'>获取内容</el-button>
            <el-button @click='setCkeditorValue'>设置内容</el-button>
        </el-card><br>
        <el-card>
            <md ref='$md' />
        </el-card>
    </div>
</template>
<script src='./ts/rich-text'></script>