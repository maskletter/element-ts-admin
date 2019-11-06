import Component from "vue-class-component";
import { Prop, Ref } from 'vue-property-decorator'
import Vue from 'vue'
import MlForm from '@/component/form.component.vue'
import { CreateFormData } from "@/component/ts/form";


@Component({
    components: { MlForm }
})
export default class DemoFormComponent extends Vue{

    private createFormData: CreateFormData = {
        username: {
            type: 'text',
            label: '用户名',
            value: '',
            placeholder: '请输入用户名',
            rule: [
                { required: true, message: '请输入' },
                // { type: /^[0-9]{6,6}$/, message: '请输入六位纯数字' }
            ]
        },
        password: {
            type: 'password',
            label: '密码',
            placeholder: '请输入密码',
            rule: [
                { required: true, message: '请输入' },
                // { type: /^[a-zA-Z0-9_]{6,12}$/, message: '请输入6-12位密码' }
            ]
        },
        remark: {
            type: 'textarea',
            label: '备注',
        },
        grade: {
            type: 'select',
            label: '年级',
            data: [
                { value: '1', label: '一年级' },
                { value: '2', label: '二年级' }
            ],
            clearable: true
        },
        gender: {
            type: 'radio',
            label: '性别',
            data: [
                { value: '1', label: '男' },
                { value: '2', label: '女' }
            ]
        },
        other:{
            type: 'checkbox',
            label: '性别',
            value: [],
            rule: [ { required: true, message: '请选择' } ],
            data: [
                { value: '1', label: '男' },
                { value: '2', label: '女' }
            ]
        }
    }
    @Ref() private readonly jsoneditor: any;
    private form: any = this.createFormData;
    private renderFormData: CreateFormData = this.createFormData;

    private formData: { [prop: string]: CreateFormData } = {
        login: {
            username: {
                type: 'text',
                label: '用户名',
                placeholder: '请输入用户名',
                rule: [
                    { required: true }
                ]
            },
            password: {
                type: 'password',
                label: '密码',
                placeholder: '请输入密码',
                rule: [
                    { required: true }
                ]
            }
        },
        other2: {
            value1: {
                type: 'checkbox',
                label: '多选',
                value: [],
                data: [
                    { value: 1, label: '分类一' },
                    { value: 2, label: '分类二' },
                    { value: 3, label: '分类三' },
                    { value: 4, label: '分类四' }
                ]
            },
            value2: {
                type: 'radio',
                label: '单选',
                data: [
                    { value: 1, label: '分类一' },
                    { value: 2, label: '分类二' },
                    { value: 3, label: '分类三' },
                    { value: 4, label: '分类四' }
                ]
            }
        }
    }

    private setFormJson(type: string): void{
        this.form = this.formData[type]
    }

    private renderForm(): void {
        this.renderFormData = this.jsoneditor.getValue()
    }

    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

}