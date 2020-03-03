import Component from "vue-class-component";
import Vue from 'vue'
import Dragula from '@/component/dragula.component.vue'
import { DragulaConfig } from '@/component/ts/dragula';

@Component({
    components: {
        Dragula
    }
})
export default class dragulaPage extends Vue {

    private dragulaConfig: DragulaConfig = {
        removeOnSpill: true
    }
    private msg: string = '';
    private school = ['北京大学','香港大学','深圳大学','厦门大学'];

    private removeEvent({el,container,source}:{el: Element, container: Element, source: Element}): void {
        console.log(el,container, source)
    }

    private dragEvent({el, target, source, sibling}:{el:Element, target:Element, source:Element, sibling:Element}): void {
        this.msg = `${el.innerHTML}移到了${((el.parentElement as Element).previousElementSibling as any).innerHTML}`
    }

}