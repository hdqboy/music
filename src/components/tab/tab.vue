<template>
  <div class="tab">
    <router-link tag="div" to="/home" class="tab-item">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" to="/business" class="tab-item">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" to="/mine" class="tab-item">
      <span class="tab-link">我的</span>
    </router-link>
    <router-link tag="div" to="/search" class="tab-item">
      <span class="tab-link">搜索</span>
    </router-link>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "tab"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
.tab
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      padding-bottom: 5px
      color: $color-text-l
    &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
