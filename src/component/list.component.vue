<template>
<div style="border: 1px solid #f5f5f5;">
    <div class="list-contaienr">
        <div class="list-header">
            
        </div>
        <div class="list-wrapper">
            <img class="img" src="@/assets/20191111122220.png" />
            <div class="content">
                <h4>标题</h4>
                <p>内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
            <div class="operating">
                <i class="el-icon-delete-solid"></i>
            </div>
        </div>
        <div class="list-wrapper">
            <img class="img" src="@/assets/20191111122220.png" />
            <div class="content">
                <h4>标题</h4>
                <p>内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
            <div class="operating">
                <i class="el-icon-delete-solid"></i>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.list-contaienr{ padding: 0px 0;
   .list-wrapper{ display: flex;padding: 10px 0px;cursor: pointer;transition: .2s linear all;
        &:hover{ background: #f5f5f5; }
        &>.img{ width: 40px;height: 40px;border-radius: 4px;margin-left: 10px; }
        &>.content{ padding: 0 15px;flex:1; 
            p{ font-size: 13px;color: #666 }
        }
        &>.operating{ margin-right: 10px; }
   } 
}
</style>
