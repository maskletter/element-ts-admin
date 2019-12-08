import Component from "vue-class-component";
import Vue from 'vue'
import Vue2 from 'vue/dist/vue.esm.js'
import { State } from 'vuex-class'
import { RouteConfig } from "vue-router";
// import request from 'tool/request'
// import permission from '../../permission'
const dialogVue = Vue.extend({
    template: `
        <el-dialog :title="title" :visible.sync="cropperShow">
            <div ref='div'></div>
        </dialog>
    `,
    data(){
        return {
            cropperShow: false,
            title: ''
        }
    },
    methods: {
        open(a: any, title: string){
            setTimeout(() => {
                this.title = title
                a.$mount(this.$refs.div)
            })
        }
    }
})
const MlDisableMenuRouter = {
    render: Vue2.compile(`
        <div>
            <slot></slot>
        </div>
    `).render,
    props: ['item'],
    mounted(){
        const $this = this as any
        const $div = document.createElement('div')
        $div.setAttribute('style', 'position:absolute;left:0px;top:0px;right:0px;bottom:0px;');
        $this.$parent.$el.appendChild($div)
        $this.item.meta.dialog && $div.addEventListener('click', (e) => {
            e.stopPropagation();
            $this.showDialog($this.item)
        })
    },
    methods: {
        async showDialog(item: any){
            const $div = document.createElement('div');
            document.body.appendChild($div)
            const result = await item.component();
            const $component = new dialogVue()
            $component.$mount($div);
            $component.cropperShow = true;
            $component.open(new result.default(), item.meta.title)
            
        }
    }
}
const MlMenu = {
    name: 'router-menu',
    components:{ MlDisableMenuRouter },
    render: Vue2.compile(`
        <div>
            <template v-for='item in routers' >
                <el-submenu v-if='item.children && item.children.length' :index="(parentPath?'/'+parentPath:parentPath)+'/'+item.path" @click.native='click([item.path])'>
                    <template slot="title"><i :class="item.meta.icon||'el-icon-platform-eleme'"></i>{{item.meta.title}}</template>
                    <router-menu :routers='item.children' :parentPath='parentPath?parentPath+"/"+item.path:item.path' />
                </el-submenu>
                <el-menu-item v-else :index="(parentPath?'/'+parentPath:parentPath)+'/'+item.path" @click.native='click([item.path])'>
                    <ml-disable-menu-router :item='item'>
                        <i :class="item.meta.icon||'el-icon-platform-eleme'"></i>
                        <span >{{item.meta.title}}</span>
                    </ml-disable-menu-router>
                </el-menu-item>
            </template>
        </div>
    `).render,
    // props: ['routers','parentPath'],
    props: {
        routers: {},
        parentPath: {
            default: ""
        }
    },
    methods: {
        click(e: string[]){
            (this as any).$emit('change', e.map(v => '/'+v));
        }
    },
}
@Component({
    components: { MlMenu }
})
export default class MainComponent extends Vue{

    @State('routers') private routers!: RouteConfig[]
    @State('mode') private mode!: string

    private async logout(): Promise<void> {
        
        await this.$confirm('确定退出吗').toPromise()
        sessionStorage.removeItem('login');
        this.$router.replace('/login');
    }

    private menuSelectEvent(e: any){
        console.log(e)
    }
}