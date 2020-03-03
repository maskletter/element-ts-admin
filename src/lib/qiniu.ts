import Axios from 'axios';
import { Observable, of, from, throwError } from 'rxjs';
import request from '@/http/request';
import { mergeMap, tap, map } from 'rxjs/operators';
import { CommonResponseData } from '@/http';


export default class QiNiu {

    public static getQiNiuToken(key: string): Observable<CommonResponseData&{data:{ url: string, token: string }}> {
        return request({method:'POST', url: '/qiniu-token', data:{ key }})
    }

    private static __base64(base64: string, key: string, token: string): Observable<any> {
        //域名根据不同区域可能需要变化
        return from(Axios.post(`https://upload-z1.qiniup.com/putb64/-1/${key}`, base64.replace('data:image/jpeg;base64,', ''), {
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': 'UpToken ' + token
            }
        }))
    }

    private static _file(key: string, token: string, file:File): Observable<any> {
        return from(Axios.post('https://up-z1.qiniup.com', {
            token, key, file
        }))
    }

    //通过base64上传到七牛云
    public static upLoadBase64(base64: string): Observable<any> {
        return of(Math.random()+new Date().getTime()+'').pipe(
            mergeMap(v => QiNiu.getQiNiuToken(v).pipe(tap(_v => _v.data.key = v))),
            map(v => v.data),
            mergeMap(v => QiNiu.__base64(base64, v.key, v.token).pipe(
                tap(v => {
                    if(v.data.error){
                        throw v.data;
                    }
                })
            ))
        )
    }
    
    //通过file上传到七牛云
    public static upLoadFile(_file: File): Observable<any> {
        return of(Math.random()+new Date().getTime()+'').pipe(
            mergeMap(v => QiNiu.getQiNiuToken(v).pipe(tap(_v => _v.data.key = v))),
            map(v => v.data),
            mergeMap(v => QiNiu._file(v.key, v.token, _file).pipe(
                tap(v => {
                    if(v.data.error){
                        throw v.data;
                    }
                })
            ))
        )
    }

}