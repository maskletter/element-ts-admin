<template>
	<div class="container">
		<!-- <h1>Hello,world</h1>
		<router-link to='/login'>登录</router-link> -->
		<!-- <router-view></router-view> -->
		<transition :name='animationName'>
			<router-view/>
		</transition>
	</div>
</template>
<style lang="scss" >
*{ margin: 0px;padding: 0px; }
.app-container{ background: #fff }
html,body,.container{ height: 100%;overflow:hidden;background: #f5f5f5 }
</style>
<style lang="scss" scoped>
  .slide-left-enter-active {
    transition: all 0.5s ease;position: absolute;left: 0px;width: 100%;
    transform: translateY(-30%);z-index: 2;
  }
  .slide-left-leave-active {
    transition: all 0.5s ease;position: absolute;left: 0px;width: 100%;
  }
  .slide-left-enter-to{
    transform: translateY(0);
    opacity: 1;
  }
  .slide-left-leave-to{
   transform: translateY(-30%);
    opacity: 0;
  }
  .opacity-enter-active {
    transition: all 0.8s ease;position: absolute;left: 0px;width: 100%;z-index: 2;opacity: 0;
  }
  .opacity-leave-active {
    transition: all 0.8s ease;position: absolute;left: 0px;width: 100%;
  }
  .opacity-enter-to{
    opacity: 1;
  }
  .opacity-leave-to{
    opacity: 0;
  }
</style>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data(){
		return {
			animationName: 'slide-left'
		}
	},
	watch: {
		'$route'(val){
			if(val.path == '/login') this.animationName = 'slide-left'
			else this.animationName = 'opacity'
		}
	}
})
</script>