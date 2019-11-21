import Component from "vue-class-component";
import { Prop, Ref, Watch, Model } from 'vue-property-decorator'
import Vue from 'vue'
import cropperjs from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { empty, Observable, Subject  } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
@Component
export default class CropperComponent extends Vue {
    constructor(){
        super()
    }

    @Prop() private readonly url!: string;
    @Ref() private readonly image!: HTMLImageElement
    @Model('base64', { type: String }) private base64!: string;
    private subject: Subject<cropperjs> = new Subject<cropperjs>();
    private cropper!: cropperjs;
    @Watch('url')
    private urlChange(){
        this.cropper.destroy()
        this.render2()
    }

    private init(){
        this.subject.pipe(
            debounceTime(250),
            tap(v => {
                this.$emit('base64', this.toDataURL())
                this.$emit('change', v)
            })
        ).subscribe()
    }
    private mounted(){
        if(!this.url) return
        this.render2();
    }

    private render2(){
        this.cropper = new cropperjs(this.image,{
            aspectRatio:  4 / 4,
            viewMode: 1,
            crop: (e: any) => {
                this.subject.next(e)
            }
        })
        this.init()
        this.cropper.setData
    }
    private beforeDestroy() {
        this.cropper.destroy()   
    }

    public getCroppedCanvas(): HTMLCanvasElement{
        return this.cropper.getCroppedCanvas()
    }
    public toDataURL(): string{
        return this.getCroppedCanvas().toDataURL()
    }
    public getData(): cropperjs.Data{
        return this.cropper.getData()
    }
    public getCropBoxData(): cropperjs.CropBoxData{
        return this.cropper.getCropBoxData()
    }
    public getContainerData(): cropperjs.ContainerData{
        return this.cropper.getContainerData()
    }
    public getImageData(): cropperjs.ImageData{
        return this.cropper.getImageData()
    }
    public setData(data: cropperjs.SetDataOptions): void{
        this.cropper.setData(data)
    }
    public setDragMode(dragMode: cropperjs.DragMode): void{
        this.cropper.setDragMode(dragMode)
    }
    public setCropBoxData(data: cropperjs.SetCropBoxDataOptions): void{
        this.cropper.setCropBoxData(data)
    }
    public setCanvasData(data: cropperjs.SetCanvasDataOptions): void{
        this.cropper.setCanvasData(data)
    }
    public setAspectRatio(aspectRatio: number): void{
        this.cropper.setAspectRatio(aspectRatio)
    }
    
}