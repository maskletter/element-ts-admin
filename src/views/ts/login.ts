import Component from "vue-class-component";
import Vue from 'vue'
// import '~/src/http';
import request from '@/http'
import { Route } from "vue-router";
// import request from 'tool/request'
// import permission from '../../permission'

@Component({
    
})
export default class LoginComponent extends Vue{

    private loading: boolean = false;
    private form = {
        username: 'admin',
        password: 'admin'
    }
    private routeNext!: Function;

    private loginEvent(){
        if(!this.form.username) return this.$message({type:'error', message: '请输入用户名'})
        if(!this.form.password) return this.$message({type:'error', message: '请输入密码'})
        this.loading = true;
        
        request.Login(this.form).subscribe(res => {
            this.setAuth(res)
            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem('auth', JSON.stringify(res));
            this.$router.push('/')
        })
        
    }

}