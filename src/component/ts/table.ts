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

@Component
export default class TableComponent extends Vue{

    @Prop({type: Array}) private readonly column!: string[];
    @Prop({type: Array}) private readonly data!: string[];
    @Prop({type: Number}) private readonly length!: number
    @Prop({type: String}) private readonly url!: string
    @Prop({type: String, default: 'GET'}) private readonly method!: AxiosRequestConfig['method']
    private http!: Subscription
    private filters: any = {}
    private tabledatas: any[] = [];

    @Watch('data')
    private onDataChange(val: any){
        this.tabledatas = this.data
    }

    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

    private created(){
        if(this.data) this.tabledatas = this.data
        if(!this.url) return;
        this.getData()
    }
    
    private getData(){
        this.http && this.http.unsubscribe()
        this.http = request({ method: this.method, url: this.url, data: this.filters }).subscribe((res: any) => {
            this.tabledatas = res
        })
    }

}