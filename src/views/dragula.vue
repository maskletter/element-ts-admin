<template>
    <div class="page-container">
        <el-card>
            <h1>尝试拖动下面元素</h1><br>
            <div>{{msg}}</div><br>
                <Dragula @drop='dragEvent' @remove='removeEvent' :config='dragulaConfig'>
                    <el-row>
                        <el-col :span="7">
                            <h4>左列</h4>
                            <ul class="test-ul" dragula-0>
                                <li class="dragula-li" label='左列' v-for='item in school' :key="item">第一个:{{item}}</li>
                            </ul>
                        </el-col>
                        <el-col :span="7" offset="1">
                            <h4>中列</h4>
                            <ul class="test-ul" dragula-1>
                                <li class="dragula-li" label='中列' v-for='item in school' :key="item">第二个:{{item}}</li>
                            </ul>
                        </el-col>
                        <el-col :span="8" offset="1">
                            <h4>右列</h4>
                            <ul class="test-ul" dragula-2>
                                <li class="dragula-li" label='右列' v-for='item in school' :key="item">第三个:{{item}}</li>
                            </ul>
                        </el-col>
                    </el-row>
                </Dragula>
        </el-card>
        <br><br>
        <el-card>
            <Dragula>
                <ul dragula-0>
                    <li class="dragula-li" v-for='item in school' :key="item">{{item}}</li>
                </ul>
            </Dragula>
        </el-card>
    </div>
</template>
<script src='./ts/dragula'></script>
<style lang="scss" scoped>
    h4{
        margin-bottom: 20px;
    }
</style>
<style lang="scss" >
.dragula-li{
    list-style: none;
    line-height: 50px;
    padding-left: 10px;
    font-size: 13px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    margin-bottom: 10px;
}
</style>