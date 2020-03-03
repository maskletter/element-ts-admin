<template>
    <div class="table-container">
        <div class="download" @click="downLoad" v-if="download"><i class="el-icon-download"></i>下载</div>
        <!-- {{$attrs}} -->
        <el-table :data="tabledatas" style="width:100%" v-bind='$attrs' v-on="$listeners">
            <el-table-column align="center" v-if='selection' type="selection" width="55"></el-table-column>
            <el-table-column v-for="(item,index) in column" :width='item.width' :key='index' :prop="item.prop" :label="item.title" :align='item.align'>
                <template slot-scope="{row, $index}">
                <slot :$index='$index' :scope='row' :name='item.slot' v-if='isSlots(item.slot)'></slot>
                <template v-else>
                    {{row[item.prop]}}
                </template>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="url" style="text-align:center;margin-top:10px;">
            <el-pagination
                background
                hide-on-single-page
                layout="prev, pager, next"
                @current-change='currentChange'
                :page-size='length'
                :total="total">
            </el-pagination>
        </div>
        
    </div>
</template>
<script lang="ts" src='./ts/table.ts'></script>
<style lang="scss" scoped>
.table-container{
    position: relative;
    .download{
        cursor: pointer;
        position: absolute;
        right: 0px;
        z-index: 99;
        font-size: 12px;
        color: #666;
        i{
            margin-right: 5px;
            font-size: 15px;
        }
        &:hover{
            color: #409EFF
        }
    }
}
</style>