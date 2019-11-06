
<template>
    <div>
        <el-form :model="form" :rules="rules" label-width='120px' ref='form'>
            <el-form-item v-for="(item,key) in data" :label='item.label' :key='key' :prop='key'>
                <component 
                    :is='"ml-"+getFormType(item.type)'
                    :multiple='item.multiple' 
                    :filterable='item.filterable' 
                    :clearable='item.clearable' 
                    :data='item.data' 
                    :attr='item.attr' 
                    v-model="form[key]" 
                    :placeholder='item.placeholder'>
                </component>
                <!-- <MlInput v-if="getFormType(item.type) == 'input'" v-model="form[key]" :type='item.type' :placeholder='item.placeholder' >  </MlInput>
                <MlSelect v-if="getFormType(item.type) == 'select'" :multiple='item.multiple' :filterable='item.filterable' :clearable='item.clearable' :data='item.data' :attr='item.attr' v-model="form[key]" :placeholder='item.placeholder' >  </MlSelect>
                <MlRadio v-if="getFormType(item.type) == 'radio'" v-model="form[key]" :type='item.type' :data='item.data' :attr='item.attr' :placeholder='item.placeholder'></MlRadio>
                <MlCheckbox v-if="getFormType(item.type) == 'checkbox'" v-model="form[key]" :type='item.type' :data='item.data' :attr='item.attr' :placeholder='item.placeholder'></MlCheckbox> -->
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click="submit">登录</el-button>
                <el-button @click="$refs.form.resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" src='./ts/form.ts'></script>