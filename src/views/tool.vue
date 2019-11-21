<template>
    <div class="page-container">
        <el-card>
            <div slot="header" class="clearfix">
                <span>裁剪工具</span>
            </div>
            <cropper v-model="base64" ref='cropper' :url='cropperImage' /><br>
            <el-button type="primary" @click="cropperShow = true">读取base64</el-button>
            <el-button type="primary" @click="uploadBase64">上传</el-button>
        </el-card>
        <el-dialog title="裁剪的图片" :visible.sync="cropperShow">
            <img :src="base64" alt="" style="width:100%">
        </el-dialog>
    </div>
</template>
<script src='./ts/tool'></script>