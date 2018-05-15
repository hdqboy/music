<template>
    <div class="loading">
      <div class="icon"><img width="24" height="24" src="../../base/loading/loading.gif" alt=""></div>
      <p class="desc">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "loading",
      props: {
          title: {
            type: String,
            default: '正在加载中...'
          }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
