<template>
    <div style="display:none">
        <div ref='$tool' class="navigation-tool-container">
            <slot></slot>
        </div>
        
    </div>
</template>
<script src='./ts/navigation-tool'></script>
<style lang="scss">
.navigation-tool-container{ transform: translate3d(50px, 0px, 0px);opacity: 0;transition: .3s linear; 
    &.active{ transform: translate3d(0px, 0px, 0px);opacity: 1; }
}
</style>