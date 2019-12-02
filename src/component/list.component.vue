<template>
<div style="border: 1px solid #f5f5f5;">
    <div class="list-contaienr">
        <div class="list-header">
            
        </div>
        <transition-group name="list-complete">  
            <div :class="['list-wrapper', selection && divIndex == index ? 'active': '']" 
                v-for='(item,index) in data' 
                :key="item.title"
                @click="divIndex=index">
                <img class="img" v-if="item.image" :src="item.image" />
                <div class="content">
                    <h4 v-if="item.title">{{item.title}}</h4>
                    <p>{{item.content}}</p>
                </div>
                <div class="operating" v-if='$scopedSlots.operating'>
                    <slot name="operating" :row='item' :index='index'></slot>
                </div>
            </div>
        </transition-group>
        
    </div>
</div>
</template>
<script src='./ts/list'></script>
<style lang="scss" scoped>
.list-contaienr{ padding: 0px 0;
   .list-wrapper{ display: flex;padding: 10px 0px;cursor: pointer;transition: 0.4s linear all;
        &:hover,&.active{ background: #f5f7fa; }
        &>.img{ width: 40px;height: 40px;border-radius: 4px;margin-left: 10px; }
        &>.content{ padding: 0 15px;flex:1; 
            h4{ margin-bottom: 5px; }
            p{ font-size: 13px;color: #666 }
        }
        &>.operating{ margin-right: 10px; }
   } 
}


.remove-hidden-animate{
    transition: 100.8s linear all;
}

.list-complete-item {
  transition: all 100s;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
