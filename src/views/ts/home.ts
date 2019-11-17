import Component from "vue-class-component";
import Vue from 'vue'
import request from '@/http'
import { tap, flatMap } from 'rxjs/operators';
import { CreateFormData } from '@/component/ts/form';
@Component
export default class HomeComponent extends Vue {

    private echartData1: any = null;
    private echartData2: any = null;
    private remarks: string = '';
    private listData: any[] = [
        { title: '标题一', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题二', image: require('@/assets/20191111122220.png'), content: '内容内容内容内容内容内容内容内容' },
        { title: '标题三', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题一1', content: '内容内容内容内容内容内容内容内容' },
        { title: '标题二2', image: require('@/assets/20191111122220.png'), content: '内容内容内容内容内容内容内容内容' },
    ]


    private created(){
        request.getEchartData1().pipe(
            tap(v => this.echartData1 = v.data),
            flatMap(v => request.getEchartData2()),
            tap(v => this.echartData2 = v.data)
        ).subscribe()
        // request.getEchartData1().subscribe(res => {
        //     console.log(res.data)
        // })
    }

    private mlFormData: CreateFormData = {
        username:{
            type: 'text'
        }
    }


}