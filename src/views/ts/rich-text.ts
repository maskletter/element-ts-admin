import Component from "vue-class-component";
import Vue from 'vue'
import { Ref } from 'vue-property-decorator';
import CkeditorComponent from '@/component/ts/ckeditor';
import { flatMap, mergeMap, delay, tap, skipUntil, takeWhile, catchError, map } from 'rxjs/operators';
import request from '@/http';
import { of, Observable, forkJoin } from 'rxjs';
import MdComponent from '@/component/ts/md';

@Component
export default class RichTextComponent extends Vue {

    @Ref('$ckeditor') private $ckeditor!: CkeditorComponent
    @Ref('$md') private  $md!: MdComponent;
    private ckeditorContent: string = '';

    private mounted(): void {
       forkJoin(this.$loading({}),request.getCkeditorContent(), request.getMdContent()).pipe(
           mergeMap(v => this.$hideLoading().pipe(map(_v => v )))
       ).subscribe(v => {
            this.ckeditorContent = v[1].data;
            this.$md.setData(v[2].data)
       })
    }

    private getCkeditorValue(){
        this.$ckeditor.getData().pipe(
            mergeMap((v: string) => this.$alert(v))
        ).subscribe()
    }    
    private setCkeditorValue(){
        
        this.$prompt('请输入').pipe(
            flatMap((v: any) => this.$ckeditor.setData(v.value)),
            skipUntil(this.$loading({fullscreen:true,text:'加载中'})),
            delay(1000),
            mergeMap(v => this.$hideLoading()),
            catchError(v => {
                if(!v.pipe) v = of(v);
                return v.pipe(mergeMap(v => this.$hideLoading()))
            })
        ).subscribe()
        
    }    

}