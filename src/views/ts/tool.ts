import Component from "vue-class-component";
import { Prop, Ref, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import CropperComponent from '@/component/ts/cropper';
import QiNiu from '@/lib/qiniu';
import { catchError, mergeMap, tap } from 'rxjs/operators';

@Component
export default class ToolComponent extends Vue {

    @Ref() private cropper!: CropperComponent
    private cropperStr: string = ''
    private cropperShow: boolean = false
    private cropperImage: string = require('@/assets/20191111122220.png')
    private base64: string = '';

    private uploadBase64(): void {
        QiNiu.upLoadBase64(this.base64).pipe(
            mergeMap(v => this.$message({type:'success',message:'假的上传成功'})),
            catchError(v => this.$message({type:'error',message:'实际上七牛云的token是假的，所有肯定无法上传'}))
        ).subscribe()
    }

}

// type AlbumAPIResponse = {
//     title: string
//     artist?: {
//       name: string
//       bio?: string
//       previousAlbums?: string[]
//     }
//   };
  
//   declare const album: AlbumAPIResponse;
  
  // With optional chaining, you can write
  // code like this:
  