import Vue from 'vue'
import Component from 'vue-class-component';
import Logs from './log'
@Component
export default class UpdateLogComponent extends Vue{

    private logs = Logs.reverse()


}