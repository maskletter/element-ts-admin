import Vue from 'vue';
import Component from "vue-class-component";
import jsoneditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css';
import { Prop, Watch, Ref } from 'vue-property-decorator';

@Component
export default class jsoneditorComponent extends Vue{

    private jsoneditor!: jsoneditor;
    @Prop() private readonly json!: object;
    @Ref('pre') private readonly $pre!: Element
    private _data: any;

    @Watch('json')
    onJsonChange(val: any){
        this.$pre.innerHTML = JSON.stringify(val, null, 2)
    }

    private mounted(): void {
        //这个库包太大，放弃
        // this.jsoneditor = new jsoneditor(this.$el as HTMLElement,{
        //     mode: 'text',
        //     indentation: 2,
        //     search: true
        //   })
        // this.jsoneditor.set()
        this.$pre.innerHTML = JSON.stringify(this.json, null, 2)
    }
    public getValue(): string{
        return JSON.parse(this.$pre.innerHTML)
    }

}