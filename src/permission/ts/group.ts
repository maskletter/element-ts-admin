import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission from '@/http/permission';
@Component
export default class GroupComponent extends Vue {

    private data!: any[]
    private column: TableColumn = [
        { prop: 'id', title: 'id' },
        { prop: 'name', title: '身份' },
        { prop: 'keywrod', title: '权限id' },
        { slot: 'operating', title: '编辑' }
    ]
    private showDialog = false;
    private editId!: number;

    private created(){

        HttpPermission.getGroupList().subscribe(res => {
            this.data = res;
        })

    }

}