<template>
    <div class="page-container">
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
                        <template slot-scope="{scope}" slot='selection'>
                            
                        </template>
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
</style>