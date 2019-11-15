import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import request from '@/http/request'
import { AxiosRequestConfig } from 'axios';
import { Subscription } from 'rxjs';

export interface _TableColumn{
    prop?: string
    title?: string
    width?: string
    slot?: string
    align?: 'left'|'center'|'right'
}
export type TableColumn = _TableColumn[];

interface InputFilter{
    type: 'input'
    placeholder: string
    label: string
    name: string
}
interface SelectFilter{
    type: 'select'
    placeholder: string
    label: string
    name: string
    data: {
        value: string|number
        label: string
    }[]
}
export type TableFilter = Array<InputFilter|SelectFilter>

@Component
export default class TableComponent extends Vue{

    @Prop({type: Array}) private readonly column!: string[];
    @Prop({type: Array}) private readonly data!: string[];
    @Prop({type: Number,default: 10}) private readonly length!: number
    @Prop({type: String}) private readonly url!: string
    @Prop({type: String, default: 'GET'}) private readonly method!: AxiosRequestConfig['method']
    @Prop({type: Array}) private filter!: TableFilter
    @Prop() private readonly selection!: boolean
    private http!: Subscription
    private total: number = 0;
    private condition: any = {
        length: this.length,
        page: 1
    }
    private tabledatas: any[] = [];

    @Watch('data')
    private onDataChange(val: any){
        this.tabledatas = this.data
    }

    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

    private getComponentName(name: string){
        switch (name) {
            case 'input':
                return 'el-input'
            case 'select':
                return 'el-select'
            default :
                return 'el-input'
        }
    }

    private created(){
        console.log(this) 
        if(this.data) this.tabledatas = this.data
        if(!this.url) return;
        this.getData()
    }
    
    private getData(){
        this.http && this.http.unsubscribe()
        this.http = request({ method: this.method, url: this.url, params: this.condition }).subscribe((res: any) => {
            this.tabledatas = res.data
            this.total = res.total
        })
    }

    private currentChange(page: number){
        this.condition.page = page;
        this.getData()
    }

    private clearSearchFilter(){
        this.filter.forEach(v => {
            this.condition[v.name] = '';
        })
        this.getData()
    }

}