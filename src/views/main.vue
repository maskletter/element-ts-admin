<template>
    <el-container class="el-app-container">
        <div class="header-container">
            <div class="icon">Maskletter</div>
            <!-- <i class="el-icon-s-fold menu-oper-button" @click='isCollapse=false'></i>
            <i class="el-icon-s-unfold menu-oper-button" @click='isCollapse=true'></i> -->
            <el-header class="el-header">
                <el-row>
                    <el-col :span='20'>
                        <h4 style="color:#666">{{$route.meta.title}}</h4>
                        <!-- <i style="font-size: 30px" class="el-icon-s-platform"></i> -->
                    </el-col>
                    <el-col :span='4' style="font-size:12px;text-align:right;">
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>查看</el-dropdown-item>
                                <el-dropdown-item>新增</el-dropdown-item>
                                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <span>王小虎</span>
                    </el-col>
                </el-row>
                
                
            </el-header>
        </div>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="$route.path" :router='true' >
                <MlMenu :routers='routers' />
            </el-menu>
        </el-aside>
        
        <el-container class="app-container">
            
            
            <el-main style="position:relative;overflow:auto;padding: 0px;">
                <div style='width:100%;height: 100%;position:relative;overflow: auto;overflow-x:hidden'>
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
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
<style lang="scss" scoped>
.menu-oper-button{ cursor: pointer;font-size: 21px;color: #666; }
.el-app-container{
    height: 100%; border: 1px solid #eee;background:#fff;padding-top: 60px;box-sizing: border-box;
}
.header-container{ position: fixed;top: 0px;left: 0px;width: 100%;z-index: 99;height: 60px;background: #fff;box-shadow: 0px 0px 10px rgba(0,0,0,0.3);display: flex;align-items:center;
    &>.icon{ width: 200px;text-align: center;color: #666;font-size: 22px; }
    &>.el-header{ flex: 1; }
}
.animation-enter-active {
    transition: all 0.5s ease;position: absolute;width: 100%;
    transform: translate3d(30%, 0, 0);z-index: 2;opacity: 0;
}
.animation-leave-active {
    transition: all 0.5s ease;position: absolute;width: 100%;
}
.animation-enter-to{
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
.animation-leave-to{
    transform: translate3d(-50px, 0, 0);
    opacity: 1;
}
</style>
<script lang='ts' src='./ts/main.ts'></script>