import Axios from 'axios';
import { Observable, of, from } from 'rxjs';
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

    //通过base64上传到七牛云
    public static upLoadBase64(base64: string): Observable<string> {
        let url: string = '';
        const key: string = Math.random()+new Date().getTime()+'';
        return of(key).pipe(
            mergeMap(v => QiNiu.getQiNiuToken(v)),
            map(v => v.data),
            tap(v => url = v.url),
            mergeMap(v => QiNiu.__base64(base64, key, v.token)),
            map(v => url)
        )
    }

}