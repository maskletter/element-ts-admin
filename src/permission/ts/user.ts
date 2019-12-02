import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission, { Permission } from '@/http/permission';
import { Ref, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';
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
    private editId: number = 0;
    @Watch('showDialog')
    private showDialogChange(val: boolean){
        this.form = { username: '', password: '', groupId: -1 }
        this.editId = 0;
        this.$form && this.$form.clearValidate()
    }

    private add(){
        this.showDialog = true;
    }

    private remove(id: number): void {
        this.$confirm('确定删除吗').pipe(
            mergeMap(v => HttpPermission.deleteUser(id)),
            mergeMap(v => HttpPermission.getUserList()),
            tap(v => this.data = v),
            mergeMap(v => this.$message({type:'success',message:'删除成功'}))
        ).subscribe()
    }
    
    private edit(id: number, data: any): void {
        this.showDialog = true;
        this.$nextTick(() => {
            this.editId = id;
            this.form.username = data.username
            this.form.password = data.password
            this.form.groupId = data.groupId
        })
    }

    private created(){

        forkJoin(HttpPermission.getUserList(),  HttpPermission.getGroupList()).pipe(
            tap(v => {
                this.data = v[0]
                this.selectData = v[1]
            })
        ).subscribe()

    }

    private submit(): void {
        this.$form.validate(valid => {
            if(!valid) return
            this.$loading({}).pipe(
                mergeMap(v => this.editId ? HttpPermission.saveUser({...this.form, id: this.editId}) : HttpPermission.addUser(this.form)),
                mergeMap(v => HttpPermission.getUserList()),
                tap(v => this.data = v),
                mergeMap(v => this.$hideLoading()),
                mergeMap(v => this.$message({type:'success',message:`${this.editId?"编辑":"添加"}成功`})),
                tap(v => this.showDialog = false),
                catchError(e => {
                    return this.$message({type:'error', message: e}).pipe(mergeMap(v => this.$hideLoading()));
                })
            ).subscribe()
        })
    }

}