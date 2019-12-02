<template>
    <div>
        <div class="filter-table" v-if='filter && filter.length'>
            <el-row>
                <el-col :span='4'><div style="line-height: 40px;">条件筛选</div></el-col>
                <el-col :span='20'>
                    <template v-for='(item, index) in filter' >
                        <span v-if="item.label">{{item.label}}: </span>
                        <component 
                            :style="{width: '150px'}" 
                            :is='getComponentName(item.type)'
                            :placeholder='item.placeholder'
                            v-model="condition[item.name]">
                            <template v-if="item.type =='select'">
                                <el-option v-for="(_item, _index) in item.data" :key="_index" :value='_item.value' :label='_item.label'></el-option>    
                            </template>
                        </component>
                        <span style="display:inline-block;width:10px;"></span>
                    </template>
                    
                    <!-- <el-input :style="{width: '200px'}" /> -->
                </el-col>
            </el-row><br>
            <div style="text-align:right">
                <el-button size='mini' type='primary' @click="getData">搜索</el-button>
                <el-button size='mini' @click="clearSearchFilter">情况搜索条件</el-button>
            </div>
        </div>
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