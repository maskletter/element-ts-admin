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
    private msg2: string = '';
    private school: string[] = ['北京大学','香港大学','深圳大学','厦门大学'];
    private school2: string[] = ['北京大学','香港大学','深圳大学','厦门大学'];

    private removeEvent({el,container,source}:{el: Element, container: Element, source: Element}): void {
        this.msg2 = `位于${(container.previousElementSibling as any).innerHTML}的${el.innerHTML}被删除了`
    }

    private dragEvent({el, target, source, sibling}:{el:Element, target:Element, source:Element, sibling:Element}): void {
        this.msg = `${el.innerHTML}移到了${((el.parentElement as Element).previousElementSibling as any).innerHTML}`
    }

    private drag2Event({el, target, source, sibling}:{el:Element, target:Element, source:Element, sibling:Element}): void {
        this.school2 = Array.from(target.children).map(v => this.school[v.getAttribute('data-index') as any])
    }

}