import Component from "vue-class-component";
import { Prop, Watch, Ref } from 'vue-property-decorator'
import Vue from 'vue'
import echart from 'echarts'
@Component
export default class EchartComponent extends Vue {

    @Prop({type:Number, default: 300}) private height!: number;
    @Prop() private data!: any;
    @Ref('$echart') private $echart!: HTMLDivElement
    private echarts!: echart.ECharts;

    @Watch('data')
    private onDataChange(v: any){
        // console.log(v)
        this.renderEchart()
    }

    private watchResize!: (this: Window, ev: UIEvent) => void;

    private mounted(): void {
        
        this.echarts =  echart.init(this.$echart, 'macarons')
        this.renderEchart();
        let $this = this;
        let watchResize = function(){
            $this.echarts.resize()
        }
        this.watchResize = watchResize
        window.addEventListener('resize', this.watchResize)
    }

    private renderEchart(): void {
        if(!this.data) return
        this.echarts.setOption(this.data)
    }

    private beforeDestroy() {
        //销毁监听防止性能浪费
        window.removeEventListener('resize', this.watchResize)   
    }

}