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
    private created() {
        request.getTable(2).pipe(
            tap(v => this.tableData = v.data)
        ).subscribe()
    }

    private rowClick(e: any): void {
        console.log(e)
    }


}