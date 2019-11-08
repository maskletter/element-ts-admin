import Vue from 'vue'
import Component from 'vue-class-component';
import request from '@/http'
import { map, take, flatMap, mergeMap, tap, toArray, concat, filter, last, expand, pluck, retryWhen, max, min, reduce } from 'rxjs/operators'
import { of, from, merge } from 'rxjs';

@Component
export default class CommonlyComponent extends Vue {


    private created(): void {

        //获取用户信息
        request.getUserInfo().pipe(
            map(v => v.data.id),
            //请求获取用户朋友列表
            flatMap(v => request.getUserPeople(v)),
            //拆分返回的列表
            mergeMap(v => v.data),
            //摘取name参数
            map(v => v.name),
            //合并
            toArray(),
            retryWhen(errors => errors.pipe(
                tap(v => {
                    console.log('发送错误',v)
                })
            ))
        ).subscribe(res => {
            //输出
            console.log(res)
        })


        of([1,2,3,4]).pipe(
            //将数组拆分成多个
            mergeMap(v => v),
        ).subscribe(v => {
            console.log('输出:'+v)
        })
        

        of(1,2).pipe(
            //将3,4追加进subscribe中
            concat(of(3,4))
        ).subscribe(v => {
            console.log(v)
        })

        //获取最大值
        of(14,55,33).pipe(max()).subscribe(v => {
            console.log('最大值',v)
        })
        //获取最小值
        of(14,55,33).pipe(min()).subscribe(v => {
            console.log('最小值',v)
        })
        //传入参数相加
        of(1,2,3).pipe(
            reduce((acc, item) => acc += item)
        ).subscribe(v => {
            console.log('合并的值', v)
        })
        

        from([{ name: 'Joe', age: 31 }, { name: 'Bob', age: 25 }, { name: '22', age: 39 }]).pipe(
            //遍历获取age大于31的数据
            filter(v => v.age >= 31),
            //读取最后一个数据并返回
            last()
        ).subscribe(v => {
            console.log(v)
        })

        of(1).pipe(
            expand(val => {
                console.log('运行',val)
                return of(val+1)
            }),
            //运惜五次
            take(5)
        ).subscribe(v => {
            console.log('expand', v)
        })

        //请求两个接口
        merge(
            request.getUserSchool(1),
            request.getUserGrade(),
        ).pipe(
            //将两个接口返回的data合并成一个数组
            toArray(),
            //form: 将数组、promise 或迭代器转换成 observable 
            //返回一个obserrvable
            flatMap(v => from(v)),
            //获取数据里的name
            pluck('name'),
            //合并成已给数组
            toArray()
        ).subscribe(v => {
            console.log(`读取了${v[0]} ${v[1]}`)
        })

    }

    


}
