import Component from "vue-class-component";
import Vue from 'vue'
import 'dragula/dist/dragula.css'
import dragula from 'dragula'
import { Prop } from 'vue-property-decorator';

export interface DragulaConfig{
    isContainer?(el: Element|undefined):  boolean
    moves?(el: Element|undefined, source :Element|undefined, handle: Element|undefined, sibling: Element|undefined):  boolean
    accepts?(el: Element|undefined, target :Element|undefined, source: Element|undefined, sibling: Element|undefined):  boolean
    invalid?(el: Element|undefined, handle :Element|undefined):  boolean
    /**确定放置元素的位置时考虑Y轴 */
    direction?: 'vertical'|'horizontal'
    /**默认情况下移动元素，不复制 */
    copy?:boolean 
    /**复制源容器中的元素可以重新排序 */
    copySortSource?:boolean 
    /**如果元素为true，则溢出会将元素放回拖动位置 */
    revertOnSpill?:boolean 
    /**如果为true，则溢出将`.remove`元素 */
    removeOnSpill?:boolean 
    /**设置要添加镜像元素的元素 */
    mirrorContainer?: Element
    /**允许用户选择输入文本，请参见下面的详细信息 */
    ignoreInputTextSelection?:boolean
}

@Component({})
export default class dragulaPage extends Vue {

    @Prop({type: Object}) config!: DragulaConfig

    public $drake!: dragula.Drake

    mounted(){
        let elements: Element[] = Array.from(this.$el.querySelectorAll('[dragula-slide]'));
        this.$drake = dragula(elements, this.config);
        this.$drake.on('drag', (el, source ) => this.$emit('drag',{el, source }))
        this.$drake.on('dragend', (el) => this.$emit('dragend',{el}))
        this.$drake.on('drop', (el, target, source, sibling	) => this.$emit('drop',{el, target, source, sibling	}))
        this.$drake.on('cancel', (el, container, source	) => this.$emit('cancel',{el, container, source	}))
        this.$drake.on('remove', (el, container, source	) => this.$emit('remove',{el, container, source	}))
        this.$drake.on('shadow', (el, container, source) => this.$emit('shadow',{el, container, source}))
        this.$drake.on('over', (el, container, source) => this.$emit('over',{el, container, source}))
        this.$drake.on('out', (el, container, source) => this.$emit('out',{el, container, source}))
        this.$drake.on('cloned', (clone, original, type) => this.$emit('cloned',{clone, original, type}))
    }

}