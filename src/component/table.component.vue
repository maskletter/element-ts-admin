<template>
    <el-table :data="data" style="width:100%">

        <el-table-column v-for="(item,index) in column" :key='index' :prop="item.prop" :label="item.title" :align='item.align'>
            <template slot-scope="{row, $index}">
		       <slot :$index='$index' :scope='row' :name='item.slot' v-if='isSlots(item.slot)'></slot>
               <template v-else>
                   {{row[item.prop]}}
               </template>
            </template>
        </el-table-column>
    </el-table>
</template>
<script lang="ts" src='./ts/table.ts'></script>