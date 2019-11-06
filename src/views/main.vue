<template>
    <el-container style="height: 100%; border: 1px solid #eee;background:#fff">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="$route.path" :router='true'>
                <MlMenu :routers='routers' />
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
            </el-header>
            
            <el-main style="position:relative;overflow:auto">
                <div style='width:100%;min-height: 100%;position:relative;overflow: hidden'>
                    <transition name='animation'>
                        <router-view></router-view>
                    </transition>
                </div>
                
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
<style lang="scss" scoped>
.animation-enter-active {
    transition: all 0.5s ease;position: absolute;left: 0px;width: 100%;
    transform: translateX(30%);z-index: 2;opacity: 0;
}
.animation-leave-active {
    transition: all 0.5s ease;position: absolute;left: 0px;width: 100%;
}
.animation-enter-to{
    transform: translateX(0);
    opacity: 1;
}
.animation-leave-to{
    transform: translateX(-50px);
    opacity: 1;
}
</style>
<script lang='ts' src='./ts/main.ts'></script>