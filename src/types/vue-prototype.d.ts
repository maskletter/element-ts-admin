import Vue from 'vue'


declare module 'vue/types/vue' {
  interface Vue {
    /** Show a message box */
    setAuth: Function
    // $confirm: Function
    // $message: Function
  }
}
