import Component from "vue-class-component";
import Vue from 'vue'
import { TableColumn } from '@/component/ts/table';
import request from '@/http/index';
import { tap } from 'rxjs/operators';

@Component
export default class ListComponent extends Vue {

    private column: TableColumn = [
        { prop: 'date', title: '日期', align: 'center' },
        { prop: 'name', title: '姓名' },
        { prop: 'address', title: '地址' }
    ]
    private tableData: any = [];
    private listData: any[] = [
        { title: '标题一', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题二', image: require('@/assets/20191111122220.png'), content: '内容内容内容内容内容内容内容内容' },
        { title: '标题三', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题四', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题五', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题六', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题七', content: '内容内容内容内容内容内容内容内容' }
    ]
    private created() {
        request.getTable(2).pipe(
            tap(v => this.tableData = v.data)
        ).subscribe()
    }

    private rowClick(e: any): void {
        console.log(e)
    }

    private removeList(index: number){
        this.$confirm('确定删除吗').pipe(
            tap(v => this.$delete(this.listData, index))
        ).subscribe()
    }


}