<template>
    <div>
        <transition name='animation'>
            <router-view></router-view>
        </transition>
    </div>
</template>
<style lang="scss" scoped>
.animation-enter-active {
    transition: all 0.5s ease;position: absolute;width: 100%;
    transform: translate3d(30%, 0, 0);z-index: 2;opacity: 0;
}
.animation-leave-active {
    transition: all 0.5s ease;position: absolute;width: 100%;
}
.animation-enter-to{
    transform: translate3d(0, 0, 0);
    opacity: 1;
}
.animation-leave-to{
    transform: translate3d(-50px, 0, 0);
    opacity: 1;
}
</style>