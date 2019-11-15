<template>
    <div class="page-container">
        <el-timeline>
             <el-timeline-item v-for='item in logs' :key="item.time" :timestamp="item.time" placement="top">    
                <el-card>
                    <h4 v-if='item.title'>{{item.title}}</h4>
                    <p v-for='(data,indedx) in item.data' :indedx='indedx'>{{data}}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script src='./index'></script>