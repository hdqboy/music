<template>
    <div class="home">
      <scroll  class="home-content" :data="dicList">
        <div>
          <div v-if="slider.length" class="slider-wrapper">
            <m-slider>
              <div v-for="item in slider">
                <a :href="item.linkUrl">
                  <img class="needsclick" :src="item.picUrl" alt="">
                </a>
              </div>
            </m-slider>
          </div>
          <div class="home-list">
            <div class="title">热门歌曲</div>
            <div class="home-item" v-for="item in dicList">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl" alt="">
              </div>
              <div class="text">
                <h2 class="name">{{item.dissname}}</h2>
                <p class="desc" v-html="item.creator.name"></p>
              </div>
            </div>
          </div>
        </div>
        <div class="loading-content" v-show="!dicList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {getPublicRecom} from '../../api/mine'
  import {getList} from '../../api/mine'
  import {ERR_OK} from "../../api/config"
  import MSlider from "../../base/slider/slider"

  export default {
        name: "home",
        data() {
          return {
            slider: [],
            dicList: []
          }
        },
        components: {
          MSlider,
          Scroll,
          Loading
        },
        created() {
          this._getPublicRecom()
          this._getList()
        },
        methods: {
          _getPublicRecom() {
            getPublicRecom().then((res) => {
              if(res.code === ERR_OK) {
                this.slider = res.data.slider
              }
            })
          },
          _getList() {
            getList().then((res) => {
              if(res.code === ERR_OK) {
                this.dicList = res.data.list
              }
            })
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .home
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .home-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .home-list
        .title
           width: 100%
           height: 65px
           line-height: 65px
           text-align: center
           font-size: $font-size-medium
           color: $color-theme
        .home-item
           display: flex
           box-sizing: border-box
           align-items: center
           padding: 0 20px 20px 20px

          .icon
            flex: 0 0 60px
            wdith: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $color-text
            .name
              margin-bottom: 10px
              color: #color-text
            .desc
              color: $color-text-d
      .loading-content
          position: absolute
          top: 50%
          width: 100%
          transfrom: translateY(-50%)
</style>
