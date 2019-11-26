import Component from "vue-class-component";
import Vue from 'vue'
// import '~/src/http';
import request from '@/http'
import { Route } from "vue-router";
import { tap, mergeMap, catchError } from 'rxjs/operators';
import Router from '@/router'
import HttpPermission from '@/http/permission';
// import request from 'tool/request'
// import permission from '../../permission'

@Component({
    
})
export default class LoginComponent extends Vue{

    private loading: boolean = false;
    private form = {
        username: 'tom',
        password: '123'
    }
    private routeNext!: Function;

    private loginEvent(){
        if(!this.form.username) return this.$message({type:'error', message: '请输入用户名'})
        if(!this.form.password) return this.$message({type:'error', message: '请输入密码'})
        this.loading = true;
        
        HttpPermission.getUserAuth(this.form).pipe(
            tap(v => this.loading = false),
            catchError(e => {
                this.$message({type:'error', message: e}).subscribe()
                this.loading = false
                return e
            })
        ).subscribe(res => {
            Router.newCreateAuth(res)
            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem('auth', JSON.stringify(res));
            this.$router.push('/')
        })
        // request.Login(this.form).pipe(
        //     tap(v => this.loading = false),
        //     mergeMap(v => HttpPermission.getUserAuth(this.form))
        // ).subscribe(res => {
        //     console.log(res)
        //     // Router.newCreateAuth(res.auth)
        //     // sessionStorage.setItem('login', 'true');
        //     // sessionStorage.setItem('auth', JSON.stringify(res.auth));
        //     // this.$router.push('/')
        // }, error => {
        //     console.log(error)
        //     this.loading = false;
        // })
        
    }

}