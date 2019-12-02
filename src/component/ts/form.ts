import Component from "vue-class-component";
import { Prop, Watch, Ref } from 'vue-property-decorator'
import Vue from 'vue'
import Vue2 from 'vue/dist/vue.esm.js'
import { ElForm } from "element-ui/types/form";

interface CommonForm{
    // type?: string
    placeholder?: string
    label?: string
    value?: string|number|boolean|Array<string|number|boolean>
    rule?: {
        type?: string
        max?: number
        min?: number
        required?: boolean
        message?: string
        trigger?: 'blur'|'change'|string
        validator?: Function
    }[]
}
interface InputForm extends CommonForm{
    type: 'text'|'textarea'|'number'|'password'
}
interface SelectForm extends CommonForm{
    type: 'select'
    data: any[]
    attr?: any|{label:'label',value:'value'}
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
}
interface RadioForm extends CommonForm{
    type: 'radio'
    data: any[]
    attr?: any|{label:'label',value:'value'}
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
}
interface CheckboxForm extends CommonForm{
    type: 'checkbox'
    data: any[]
    attr?: any|{label:'label',value:'value'}
    clearable?: boolean
    multiple?: boolean
    filterable?: boolean
}
export interface CreateFormData{
    [prop: string]: InputForm|SelectForm|RadioForm|CheckboxForm
}

const MlInput = {
    data(){
        return { v: (this as any).value }
    },
    render: Vue2.compile(`
    <el-input v-on:keyup.native="$emit('change', $event.target.value)" v-model='v' :type='type' :value='value' :placeholder='placeholder' />
    `).render,
    props: ['type', 'placeholder', 'value'],
    model: { prop: 'value', event: 'change' },
    watch:{ value(val: any){ (this as any).v = val; } },
}
const MlSelect = {
    data(){
        return { v: (this as any).value }
    },
    render: Vue2.compile(`
        <el-select v-model="v" :multiple='multiple' :filterable='filterable' :clearable='clearable' @change="$emit('change', $event)" :placeholder="placeholder">
            <el-option
                v-for="item in data"
                :key="item[attr?attr.value:'value']"
                :label="item[attr?attr.label:'label']"
                :disabled="item.disabled"
                :value="item[attr?attr.value:'value']">
            </el-option>
        </el-select>
    `).render,
    props: ['type', 'clearable', 'placeholder', 'multiple', 'filterable', 'value','attr','data'],
    model: { prop: 'value', event: 'change' },
    watch:{ value(val: any){ (this as any).v = val; } },
}

const MlRadio = {
    data(){
        return { v: (this as any).value }
    },
    render: Vue2.compile(`
        <el-radio-group v-model="v" @change="$emit('change', $event)">
            <el-radio v-for="item in data" :disabled="item.disabled" :label="item[attr?attr.value:'value']">{{item[attr?attr.label:'label']}}</el-radio>
        </el-radio-group>
    `).render,
    props: ['type', 'data', 'attr', 'placeholder', 'value'],
    model: { prop: 'value', event: 'change' },
    watch:{ value(val: any){ (this as any).v = val; } },
}

const MlCheckbox = {
    data(){
        return { v: (this as any).value }
    },
    render: Vue2.compile(`
        <el-checkbox-group v-model="v" @change="$emit('change', $event)">
            <el-checkbox v-for="item in data" :disabled="item.disabled" :label="item[attr?attr.value:'value']">{{item[attr?attr.label:'label']}}</el-checkbox>
        </el-checkbox-group>
    `).render,
    props: ['type', 'data', 'attr', 'placeholder', 'value'],
    model: { prop: 'value', event: 'change' },
    watch:{ value(val: any){ (this as any).v = val; } },
}

@Component({
    components: { MlInput, MlSelect, MlRadio, MlCheckbox }
})
export default class FormComponent extends Vue{

    @Prop({type: Object}) private readonly data!: CreateFormData;
    @Ref('form') private readonly $form!: { validate: Function };
    private form: any = {};
    private rules: any = {};
    private created(){
        this.onDataChange(this.data)
    }


    @Watch('data')
    private onDataChange(val: CreateFormData){
        this.rules = [];
        this.form = {}
        let _form: any = {};
        let _rules: any = {};
        for(const key in val){
            _form[key] = val[key].value||'';
            if(!val[key].rule)  continue;
            _rules[key] = val[key].rule;
            
        }
        this.rules = _rules;
        this.form = _form;
        this.$refs.form && (this.$refs.form as any).resetFields()
    }
    

    private submit(): void {
        this.$form.validate((valid: boolean) => {
            if(!valid) return;
            this.$emit('submit',{...this.form})
        })
    }

    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

    private getFormType(type: string){
        switch (type) {
            case 'text':
                return 'input';
            case 'number':
                return 'input';
            case 'password':
                return 'input';
            case 'textarea':
                return 'input';
            case 'select':
                return 'select';
            case 'radio':
                return 'radio';
            case 'checkbox':
                return 'checkbox';
        }
    }

    public setData(e: any): void{
        for(let i in e){
            this.form[i] = e[i]
        }
    }

}