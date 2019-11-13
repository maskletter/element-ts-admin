<template>
    <div class="md-container">
        <textarea ref='$md'>
```javascript
var name = '123213'
```</textarea>
    </div>
</template>
<script src='./ts/md'></script>
<style lang="scss" scoped>
.md-container{
    /deep/ .editor-preview-side pre{ padding: 10px;background: #333;color: #fff }
}
</style>