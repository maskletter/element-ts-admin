import Component from "vue-class-component";
import Vue from 'vue'
import Vue2 from 'vue/dist/vue.esm.js'
import { State } from 'vuex-class'
import { RouteConfig } from "vue-router";
// import request from 'tool/request'
// import permission from '../../permission'

const MlMenu = {
    name: 'router-menu',
    render: Vue2.compile(`
        <div>
            <template v-for='item in routers' >
                <el-submenu v-if='item.children && item.children.length' :index="'/'+item.path" @click.native='click([item.path])'>
                    <template slot="title"><i :class="item.meta.icon||'el-icon-platform-eleme'"></i>{{item.meta.title}}</template>
                    <el-menu-item @click.native='click([item.path,item2.path])' v-for='item2 in item.children' :index="'/'+item.path+'/'+item2.path">{{item2.meta.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="'/'+item.path" @click.native='click([item.path])'>
                    <i :class="item.meta.icon||'el-icon-platform-eleme'"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </el-menu-item>
            </template>
        </div>
    `).render,
    props: ['routers'],
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
    private menuOpeneds: string[] = [];
    private isCollapse: boolean = false

    private async logout(): Promise<void> {
        await this.$confirm('确定退出吗').toPromise()
        sessionStorage.removeItem('login');
        this.$router.replace('/login');
    }


    private menuSelectEvent(e: any){
        console.log(e)
    }
}