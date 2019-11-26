import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission, { Permission } from '@/http/permission';
import { Ref } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { mergeMap, tap } from 'rxjs/operators';
@Component
export default class UserComponent extends Vue {

    @Ref() private readonly $form!: ElForm;
    private data: Permission.user[] = [];
    private selectData: Permission.group[] = [];
    private showDialog = false;
    private column: TableColumn = [
        { prop: 'id', title: 'id' },
        { prop: 'username', title: '用户名' },
        { prop: 'password', title: '密码' },
        { prop: 'groupId', title: '权限id' },
        { slot: 'operating', title: '编辑', width: '170' }
    ]
    private form = { username: '', password: '', groupId: -1 }
    private rules = {
        username:[  { required: true } ],
        password:[  { required: true } ],
        groupId:[  { required: true } ],
    }

    private add(){
        this.showDialog = true;
    }

    private created(){

        HttpPermission.getUserList().subscribe(res => {
            this.data = res;
        })
        HttpPermission.getGroupList().subscribe(res => {
            this.selectData = res;
        })

    }

    private submit(): void {
        this.$form.validate(valid => {
            if(!valid) return
            HttpPermission.addUser(this.form).pipe(
                mergeMap(v => HttpPermission.getUserList()),
                tap(v => this.data = v),
                tap(v => this.showDialog = false),
                mergeMap(v => this.$message({type:'success',message:'添加成功'}))
            ).subscribe()
        })
    }

}