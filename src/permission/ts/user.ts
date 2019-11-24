import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission from '@/http/permission';
@Component
export default class UserComponent extends Vue {

    private data!: any[]
    private column: TableColumn = [
        { prop: 'id', title: 'id' },
        { prop: 'username', title: '用户名' },
        { prop: 'password', title: '密码' },
        { prop: 'groupId', title: '权限id' },
        { slot: 'operating', title: '编辑', width: '170' }
    ]

    private created(){

        HttpPermission.getUserList().subscribe(res => {
            this.data = res;
        })

    }

}