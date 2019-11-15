<template>
    <div class="page-container">
        <div header-name='home'></div>
        <el-row :gutter="20">
            <el-col :span='6' >
                <el-card class="total-group red">
                    <i class="el-icon-phone"></i>
                    <div class="number">
                        <div >26</div>
                        <span>最新统计</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card class="total-group yellow">
                    <i class="el-icon-star-on"></i>
                    <div class="number">
                        <div >26</div>
                        <span>最新统计</span>
                    </div>
                </el-card></el-col>
            <el-col :span='6'>
                <el-card class="total-group green">
                    <i class="el-icon-picture"></i>
                    <div class="number">
                        <div >26</div>
                        <span>最新统计</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card class="total-group blue">
                    <i class="el-icon-s-promotion"></i>
                    <div class="number">
                        <div >26</div>
                        <span>最新统计</span>
                    </div>
                </el-card>
            </el-col>
        </el-row><br>
        <el-row :gutter="20">
            <el-col :span='17'>
                <el-card>
                    <echart :data='echartData1' :height='400' />
                </el-card><br>
                <el-row :gutter="20">
                    <el-col :span='12'>
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="card-img-group"><img src="@/assets/20191111122220.png" alt=""></div>
                            <div class="card-content">
                                <h4>好吃的汉堡</h4>
                                <div class="content">阳光明媚的一天阳光明媚的一天阳光明媚的一天阳光明媚的一天阳光明媚的一天</div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span='12'>
                        <el-card :body-style="{ padding: '0px' }">
                            <div class="card-img-group"><img src="@/assets/timg.jpg" alt=""></div>
                            <div class="card-content">
                                <h4>typescript</h4>
                                <div class="content">一起来学习rxjs呀</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span='7'>
               <el-card class="total-group blue">
                    <i class="el-icon-s-promotion"></i>
                    <div class="number">
                        <div >26</div>
                        <span>最新统计</span>
                    </div>
                </el-card><br>
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>最新统计</span>
                    </div>
                    <echart :data='echartData2' :height='300' />
                </el-card><br>
                
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>备注</span>
                    </div>
                    <el-input placeholder='请输入' v-model="remarks" /><br><br>
                    <el-button type='primary'>确定</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script src='./ts/home'></script>
<style lang="scss" scoped>
.total-group{ color: #666;cursor: pointer;
    i{ font-size: 35px; }
    .number{ text-align: right; 
        div{ font-size: 30px; }
    }
    &.red i{ color:#FA2A00; }
    &.yellow i{ color: #ffb400 }
    &.green i{ color: #1abc9c }
    &.blue i{ color: #22A7F0 }
    /deep/ .el-card__body{ display: flex;display: flex;justify-content: space-between; }
}
.card-img-group{ 
    img{ width: 100%; }
}
.card-content{ padding: 14px;color:#666;
    div.content{ font-size: 13px;line-height: 20px;margin-top: 10px; }
}
</style>