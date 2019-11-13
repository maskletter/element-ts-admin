import Component from "vue-class-component";
import Vue from 'vue'
import 'ckeditor4';
import { Ref, Prop, Model, Watch } from 'vue-property-decorator';
import { Observable, interval } from 'rxjs';
import { take, tap } from 'rxjs/operators';
// import '@types/ckeditor'
/// <reference path="@types/ckeditor" />

// import ckeditor from 'ckeditor4/ckeditor.js'
@Component
export default class CkeditorComponent extends Vue {

    @Ref('$ckeditor') private $ckeditor!: HTMLTextAreaElement;
    @Prop({default:400}) private height!: number;
    @Model('model-change', { type: String }) readonly value!: string
    private ckeditor!: CKEDITOR.editor
    private _value: string = '';

    @Watch('value')
    private onValueChange(val: string): void{
        if(val == this._value) return;
        this.setData(val).subscribe()
    }

    private mounted(){
        this.$ckeditor.value = this.value
        this.ckeditor = CKEDITOR.replace(this.$ckeditor, {
            height: this.height,
            // toolbar: [
            //     //加粗     斜体，     下划线      穿过线      下标字        上标字
            //     ['Bold','Italic','Underline','Strike','Subscript','Superscript'],
            //     // 数字列表          实体列表            减小缩进    增大缩进
            //     ['NumberedList','BulletedList','-','Outdent','Indent'],
            //     //左对 齐             居中对齐          右对齐          两端对齐
            //     ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
            //     //超链接  取消超链接 锚点
            //     ['Link','Unlink','Anchor'],
            //     //图片    flash    表格       水平线            表情       特殊字符        分页符
            //     ['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],
            //     '/',
            //     // 样式       格式      字体    字体大小
            //     ['Styles','Format','Font','FontSize'],
            //     //文本颜色     背景颜色
            //     ['TextColor','BGColor'],
            //     //全屏           显示区块
            //     ['Maximize', 'ShowBlocks','-']
            //  ]
        });
        this.ckeditor.on('change', () => {
            this._value = this.ckeditor.getData()
            this.$emit('model-change', this._value)
            this.$emit('change', this._value)
        })
    }

    public getData(){
        return Observable.create((obs: RxjsCreate) => {
            obs.next(this.ckeditor.getData())
            obs.complete()
        })
    }
    public setData(content: string){
        return interval(500).pipe(
            take(1),
            tap(v => this.ckeditor.setData(content))
        )
    }
    private beforeDestroy() {
        this.ckeditor.destroy()   
    }

}