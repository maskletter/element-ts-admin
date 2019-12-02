import Component from "vue-class-component";
import Vue from 'vue'
import { Ref, Model, Watch } from 'vue-property-decorator';
import SimpleMDE from 'simplemde'
// import 'simplemde/dist/simplemde.min.css'
import listenKey from '@/lib/listen-key';
import { Observable, of, interval } from 'rxjs';
import { takeWhile, mergeMap, tap, catchError, map, delay, skipUntil, take } from 'rxjs/operators';
// import ckeditor from 'ckeditor4/ckeditor.js'


@Component
export default class MdComponent extends Vue {

	public simplemde!: SimpleMDE;
    @Ref('$md') private $md!: HTMLTextAreaElement;
	@Model('model-change', { type: String }) readonly value!: string
    private _value: string = '';
	
	@Watch('value')
	private onValueChange(val: string){
		this.simplemde.codemirror.setValue(val)
	}

    //判断是否为.md文件
	isMdFile(name: string): boolean{
		return /^.*[.](md)$/.test(name)
	}

	//判断是否为图片文件
	isImgFile(name: string): boolean{
		return /^.*[.](png|gif|jpe?g)$/.test(name)
	}

	//读取.md内容
	private readMdFile(file: File): Observable<any>{
		return Observable.create((obs: RxjsCreate) => {
			var reader = new FileReader();
			reader.onload = () => {
				obs.next({type:'md',content: reader.result})
				obs.complete()
			};
			reader.readAsText(file);
		})
	}

	//生成img
	private readImg(file: File){
		return Observable.create((obs: RxjsCreate) => {
			var reader = new FileReader();　　　　//实例化
			reader.readAsDataURL(file);　　　　　　//加载
			reader.onload = function (e) {
				obs.next({type: 'img', content: reader.result})
				obs.complete()
			}
		})
		
	}

	//快速打开.md文件
	private openMdHotKey(): void {
		listenKey('ctrl+o', () => {
            this.$alert('未设置快捷键').subscribe()
			// (this.$refs.uploadFileMd as any).click();
		}, 'editor-md-open');
		
		listenKey('ctrl+s', () => {
            this.$alert('保存功能未开发').subscribe()
			// (this.$refs.uploadFileMd as any).click();
		}, 'editor-md-open')
	}
	private selectFileMd(e: Event): void {
		const input: any = e.target;
		if(!input.files.length) return;
		if(this.isMdFile(input.files[0].name)){
			// this.readMdFile(input.files[0])
		}
	}


    private mounted(){
        this.openMdHotKey()
        this.simplemde = new SimpleMDE({ 
            element: this.$md, 
            renderingConfig: {
				singleLineBreaks: false,
				codeSyntaxHighlighting: true,
			}
		});
		//文件拖动
        this.simplemde.codemirror.on('drop', (editor: any, e: any) => of(e.dataTransfer.files).pipe(
			takeWhile(v => v.length != 0),
			mergeMap((v: File[]) => v),
			mergeMap(v => {
				if(/^.*[.](png|gif|jpe?g)$/.test(v.name)) return this.readImg(v)
				else if(/^.*[.](md)$/.test(v.name)) return this.readMdFile(v)
				else return of(null)
			}),
			tap((v: any) => {
				if(v.type == 'md'){
					this.simplemde.codemirror.setValue(v.content)
				}else{
					this.simplemde.codemirror.setValue(this.simplemde.codemirror.getValue()+'![]('+v.content+')');
				}
			})
		).subscribe())
		//图片粘贴
		this.simplemde.codemirror.on('paste', (editor: any, e: any) => {
			of(e.clipboardData).pipe(
				takeWhile(v => v && v.items),
				map(v => v.items[0]),
				takeWhile(v => v != undefined),
				takeWhile(v => v.kind === 'file' && v.getAsFile().type.indexOf('image') !== -1),
				map(v => v.getAsFile()),
				skipUntil(this.$loading({})),
				mergeMap(v => this.readImg(v)),
				tap((v: any) => {
					this.simplemde.codemirror.setValue(this.simplemde.codemirror.getValue()+'![]('+v.content+')');
				}),
				delay(1000),
				mergeMap(v => this.$hideLoading()),
				catchError(v => v.pipe( mergeMap(v => this.$alert(<any>v)) ))
			).subscribe()
		})
		this.simplemde.codemirror.on('change', () => {
			this._value = this.simplemde.codemirror.getValue();
			this.$emit('model-change', this._value)
			this.$emit('change', this._value)
		})
	}
	
	public getData(){
        return Observable.create((obs: RxjsCreate) => {
            obs.next(this.simplemde.codemirror.getValue())
            obs.complete()
        })
    }
    public setData(content: string){
        return Observable.create((obs: RxjsCreate) => {
            this.simplemde.codemirror.setValue(content)
            obs.next(content)
            obs.complete()
        })
	}
	

}