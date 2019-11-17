import Vue from 'vue'
import Component from "vue-class-component";
import { Prop, Watch, Ref } from 'vue-property-decorator'

@Component
export default class ListComponent extends Vue {


    @Prop({type: Array}) private readonly data!: any[];
    @Prop({ type: Boolean }) private readonly selection!: boolean
    @Prop({ type: Number }) private readonly activeIndex!: number;
    private divIndex: number = 0;
    @Watch('activeIndex')
    private activeIndexChange(val: number){
        this.divIndex = val;
    }
    private created(){
        this.divIndex = this.activeIndex
    }
}