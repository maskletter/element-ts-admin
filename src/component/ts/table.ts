import Component from "vue-class-component";
import { Prop } from 'vue-property-decorator'
import Vue from 'vue'

export interface _TableColumn{
    prop?: string
    title?: string
    width?: string
    slot?: string
    align?: 'left'|'center'|'right'
}
export type TableColumn = _TableColumn[];

@Component
export default class TableComponent extends Vue{

    @Prop({type: Array}) private column!: string[];
    @Prop({type: Array}) private data!: string[];


    private isSlots(name: string){
        if(this.$scopedSlots[name]) return true;
        else return false;
    }

}