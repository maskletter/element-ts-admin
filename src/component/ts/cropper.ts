import Component from "vue-class-component";
import { Prop, Ref, Watch, Model } from 'vue-property-decorator'
import Vue from 'vue'
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import Cropper from 'cropperjs'
@Component
export default class CropperComponent extends Vue {
    constructor(){
        super()
    }

    @Prop() private readonly url!: string;
    @Ref() private readonly image!: HTMLImageElement
    @Model('base64', { type: String }) private base64!: string;
    private subject: Subject<Cropper> = new Subject<Cropper>();
    private cropper!: Cropper;
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
        this.cropper = new Cropper(this.image,{
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
    public getData(): Cropper.Data{
        return this.cropper.getData()
    }
    public getCropBoxData(): Cropper.CropBoxData{
        return this.cropper.getCropBoxData()
    }
    public getContainerData(): Cropper.ContainerData{
        return this.cropper.getContainerData()
    }
    public getImageData(): Cropper.ImageData{
        return this.cropper.getImageData()
    }
    public setData(data: Cropper.SetDataOptions): void{
        this.cropper.setData(data)
    }
    public setDragMode(dragMode: Cropper.DragMode): void{
        this.cropper.setDragMode(dragMode)
    }
    public setCropBoxData(data: Cropper.SetCropBoxDataOptions): void{
        this.cropper.setCropBoxData(data)
    }
    public setCanvasData(data: Cropper.SetCanvasDataOptions): void{
        this.cropper.setCanvasData(data)
    }
    public setAspectRatio(aspectRatio: number): void{
        this.cropper.setAspectRatio(aspectRatio)
    }
    
}