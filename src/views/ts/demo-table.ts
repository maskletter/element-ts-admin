import Component from "vue-class-component";
import Vue from 'vue'
import MlTable from '@/component/table.component.vue'
import { TableColumn } from '@/component/ts/table'
import request from '@/http'
// import request from 'tool/request'
// import permission from '../../permission'

@Component({
    components: { MlTable }
})
export default class DemoTableComponent extends Vue{


    private item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    }


    private column: TableColumn = [
        { prop: 'date', title: '日期' },
        { prop: 'name', title: '姓名' },
        { prop: 'address', title: '地址' }
    ]
    private column2: TableColumn = [
        { prop: 'date', title: '日期' },
        { prop: 'name', title: '姓名', slot: 'name' },
        { prop: 'address', title: '地址' },
        { slot: 'other', align: 'right' }
    ]
    private dynamicTable: TableColumn = this.column
    
    private tableData: {date: string, name: string, address: string}[] = []

    private checkList: string[] = ['date','name','address']

    private columChange(value: string[]){
        this.dynamicTable = this.column.filter(v => {
            return value.indexOf(<string>v.prop) != -1
        })
    }

    private async created(){
        const result = await request.getTable(5).toPromise()
        this.tableData = result.data
    }

}   