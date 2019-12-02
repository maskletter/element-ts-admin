import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission, { Permission } from '@/http/permission';
import { mergeMap, tap } from 'rxjs/operators';
import { Ref, Watch } from 'vue-property-decorator';
import { ElForm } from 'element-ui/types/form';
import { ElTree, TreeData } from 'element-ui/types/tree';

@Component
export default class GroupComponent extends Vue {

    @Ref() private readonly $form!: ElForm;
    @Ref() private readonly $tree!: ElTree<any, TreeData>;
    private data: Permission.group[] = []
    private column: TableColumn = [
        { prop: 'id', title: 'id' },
        { prop: 'name', title: '身份' },
        { slot: 'operating', title: '编辑' }
    ]
    private permissionData!: any[]
    private showDialog = false;
    private editId!: number;
    private defaultProps = {
        children: 'children',
        label: 'name'
    }
    private form = { name: '', permission: '' }
    private rules = {
        name:[
            { required: true }
        ],
        permission: [ { required: true } ]
    }
    @Watch('showDialog')
    private showDialogChange(val: boolean){
        this.form = { name: '', permission: '' }
        this.editId = 0;
        this.$form && this.$form.clearValidate()
    }


    private created(){

        HttpPermission.getGroupList().pipe(
            tap(v => this.data = v),
            mergeMap(v => HttpPermission.getPermissionList()),
            tap(v => this.permissionData = v)
        ).subscribe()

    }

    private checkChange(){
        this.form.permission = this.$tree.getCheckedKeys().join('-')
    }

    private add(): void {
        this.showDialog = true;
    }

    
    private edit(id: number, data: any): void {
        this.showDialog = true;
        this.$nextTick(() => {
            this.editId = id;
            this.form.name = data.name
            this.form.permission = data.permission
            this.$tree.setCheckedKeys(data.permission.split('-'))
        })
    }

    private remove(id: number): void {
        this.$confirm('确定删除吗').pipe(
            mergeMap(v => HttpPermission.deleteGroup(id)),
            mergeMap(v => HttpPermission.getGroupList()),
            tap(v => this.data = v),
            mergeMap(v => this.$message({type:'success',message:'删除成功'}))
        ).subscribe()
    }

    private submit(): void {
        this.$form.validate(valid => {
            if(!valid) return;
            this.$loading({}).pipe(
                mergeMap(v => this.editId ? HttpPermission.saveGroup({...this.form, id: this.editId}): HttpPermission.addGroup(this.form)),
                mergeMap(v => HttpPermission.getGroupList()),
                tap(v => this.data = v),
                mergeMap(v => this.$hideLoading()),
                mergeMap(v => this.$message({type:'success',message:`${this.editId?"编辑":"添加"}成功`})),
                tap(v => this.showDialog=false),
            ).subscribe()
        })
    }

}