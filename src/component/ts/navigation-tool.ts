import Vue from 'vue'
import Component from 'vue-class-component';
import { Ref, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
@Component
export default class NavigationToolComponent extends Vue {

    private fullPath: string = '';
    private $navigationUrlTool!: HTMLElement;
    @Ref() private $tool!: HTMLElement
    private mounted(){
        this.$navigationUrlTool = (document.getElementById('navigation-ui-tool') as HTMLElement);
        this.$navigationUrlTool.appendChild(this.$tool)
        this.fullPath = this.$route.fullPath;
    }


    @Watch('$route')
    onRouteChange(val: Route){
        if(val.fullPath == this.fullPath){
            this.$navigationUrlTool.appendChild(this.$tool)
        }else{
            this.$el.appendChild(this.$tool)
        }
    }

    beforeDestroy() {
        this.$el.appendChild(this.$tool)
    }
    

}