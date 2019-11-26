<template>
    <div class="page-container">

        <NavigationTool>
            <div>
                <el-badge :value="12" class="item">
                    <el-button size="small">评论</el-button>
                </el-badge>&nbsp;&nbsp;
                <el-badge :value="3" class="item">
                    <el-button size="small">收藏</el-button>
                </el-badge>&nbsp;&nbsp;
                <el-badge :value="1" class="item" type="primary">
                    <el-button size="small">点赞</el-button>
                </el-badge>&nbsp;&nbsp;
                <el-badge :value="2" class="item" type="warning">
                    <el-button size="small">差评</el-button>
                </el-badge>
            </div>
        </NavigationTool>
        <el-card class="el-card-container" style='height:100%'>
            <el-row :gutter="20">
              <el-col :span="8">
                  <list :data='listData' :selection='true' :active-index='1'>
                      <template slot="operating" slot-scope="{row, index}">
                          <i class="el-icon-delete-solid" @click="removeList(index)"></i>
                      </template>
                  </list>
              </el-col>
              <el-col :span="16">
                    <MlTable :column='column' :data='tableData' :selection='true' :border='true' @row-click='rowClick'>
                       
                    </MlTable>
              </el-col>
            </el-row>
            
            
        </el-card>
    </div>
    
</template>
<script src='./ts/list'></script>
<style lang="scss" scoped>
.el-card-container{ height: 100%; }
.el-card-container /deep/ .el-card__body{ height: 100%;overflow: auto; }
.item{ height: 32px;margin-right: 15px;
    button{ vertical-align: top; }
}
</style>