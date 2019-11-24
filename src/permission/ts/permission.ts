import Vue from 'vue'
import Component from 'vue-class-component';
import { TableColumn } from '@/component/ts/table';
import HttpPermission from '@/http/permission';
import { Watch, Ref } from 'vue-property-decorator';
import FormComponent, { CreateFormData } from '@/component/ts/form';
import { mergeMap, tap, skipUntil } from 'rxjs/operators';
@Component
export default class PermissionComponent extends Vue {

    @Ref() private readonly $form!: FormComponent;
    private data: any[] = []
    private column: TableColumn = [
        { prop: 'name', title: '姓名' },
        { prop: 'path', title: '路径' },
        { prop: 'date', title: '时间' },
        { slot: 'operating', title: '操作', align:'center', width: '200' },
    ]
    private dataFrom: CreateFormData = {
        name:{
            type:'text',
            label:'名称',
            rule:[
                { required: true, message: '请输入' },
            ]
        },
        path:{
            type:'text',
            label:'路径',
            rule:[
                { required: true, message: '请输入' },
            ]
        }
    }
    private isAddChild: boolean = false;
    private showDialog = false;
    private editId: number = 0;
 

    private created(){
        HttpPermission.getPermissionList().subscribe(res => {
            this.data = res;
        })
    }

    private edit(id: number, data: any): void {
        this.editId = id;
        this.showDialog = true;
        
        this.$nextTick(() => this.$form.setData({
            name: data.name,
            path: data.path
        }))
    }
    private add(id: number): void {
        this.showDialog = true;
        if(id){
            this.isAddChild = true;
            this.editId = id
        }
        this.$nextTick(() => this.$form.setData({
            name: '',
            path: ''
        }))
    }

    private formSubmit(e: any){
        e.id = this.editId;
        this.$loading({}).pipe(
            mergeMap(v => {
                if(this.editId && this.isAddChild || !this.editId){
                    return HttpPermission.addPermission(e)
                }else{
                    return HttpPermission.savePermission(e)
                }
            }),
            mergeMap(v => HttpPermission.getPermissionList()),
            tap(v => {{this.editId = 0, this.showDialog=false;this.isAddChild=false}}),
            mergeMap(v => this.$hideLoading()),
            tap(v => this.$message({type:'success',message:'编辑成功'}).subscribe())
        ).subscribe()
        // HttpPermission.savePermission(e).pipe(
        //     mergeMap(v => {
        //         if(this.editId && this.isAddChild){
        //             return HttpPermission.addPermission(e)
        //         }else{
        //             return HttpPermission.savePermission(e)
        //         }
        //     }),
        //     mergeMap(v => HttpPermission.getPermissionList()),
        //     tap(v => {{this.editId = 0, this.showDialog=false}}),
        //     skipUntil(this.$message({type:'success',message:'编辑成功'}))
        // ).subscribe()
    }


}