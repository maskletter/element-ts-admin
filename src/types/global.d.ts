// import tenp from '@tenp/wx/lib/wx-method'

// declare module '@tenp/wx/lib/wx-method'{
//     export namespace tenp{
//         interface EventDetail {
//             type: string
//             touches: {}
//             timeStamp: number
//             target: {
//                 id: number
//                 dataset: { [prop: string]: string|number|boolean|object }
//             }
//             detail: {
//                 [prop: string]: string|number|boolean|object
//             }
//             currentTarget: {
//                 id: number
//                 dataset: { [prop: string]: string|number|boolean|object }
//             }
//             changedTouches: []
//         }
//     }
        
// }

// export declare namespace tenp {
//     interface EventDetail {
//         type: string
//         touches: {}
//         timeStamp: number
//         target: {
//             id: number
//             dataset: { [prop: string]: string|number|boolean|object }
//         }
//         detail: {
//             [prop: string]: string|number|boolean|object
//         }
//         currentTarget: {
//             id: number
//             dataset: { [prop: string]: string|number|boolean|object }
//         }
//         changedTouches: []
//     }
// }


declare global {

    interface RxjsCreate {
        next: Function
        complete: Function
        error: Function
        unsubscribe: Function
    }

}


// /*~ If your module exports nothing, you'll need this line. Otherwise, delete it */
export { };