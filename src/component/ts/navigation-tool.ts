import Vue from 'vue'
import Component from 'vue-class-component';
@Component
export default class NavigationToolComponent extends Vue {

    private mounted(){
        (document.getElementById('navigation-ui-tool') as HTMLElement).appendChild(this.$el)
    }
    

}