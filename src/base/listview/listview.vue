<template>
   <scroll :data="data" class="listView" ref="listview"
           :listenScroll="listenScroll"
           @scroll="_scroll" :probeType="probeType">
     <ul class="list-view">
       <li class="group-list" v-for="group in data" ref="groupList">
         <h2 class="title">{{group.title}}</h2>
         <ul>
           <li @click="selectItem(item)" class="group-item" v-for="item in group.items" >
             <img class="avatar" v-lazy="item.avatar" alt="">
             <span class="name">{{item.name}}</span>
           </li>
         </ul>
       </li>
     </ul>
     <div class="Alphabet" @touchstart="shortTouchStar" @touchmove.stop.prevent="onTochchmove">
       <ul>
         <li v-for="(list, index) in Alphabet" class="list"
             :data-index="index" :class="{'current': currentIndex===index}">{{list}}</li>
       </ul>
     </div>
     <div class="item-fiex" v-show="fixedTitle" ref="fixeds">
       <h1 class="fixed-title">{{fixedTitle}}</h1>
     </div>
     <div class="loading-container" v-show="!data.length">
       <loading></loading>
     </div>
   </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from '../../base/scroll/scroll'
    import {getData} from '../../common/js/dom'
    import Loading from '../../base/loading/loading'
    const JuLi = 18
    const itemHeight = 30
    export default {
        name: "listview",
      created() {
          this.touch = {},
          this.listenScroll = true,
          this.listHeight = [],
          this.probeType = 3
      },
      data() {
          return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
          }
      },
      props: {
          data: {
            type: Array,
            default: []
          }
      },
      components: {
          Scroll,
          Loading
      },
      computed: {
        Alphabet() {
          return this.data.map((group) => {
            return group.title.substr(0, 1)
          })
        },
        fixedTitle() {
          if(this.scrollY > 0){
            return '';
          }
          return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
      },

      methods: {
        selectItem(item) {
          this.$emit('select', item)
        },
        shortTouchStar(e) {
          let charIndex = getData(e.target, 'index')
          let firstTouch = e.touches[0]
          this.touch.y1 = firstTouch.pageY
          this.touch.charIndex = charIndex
          // this.$refs.listview.scrollToElement(this.$refs.groupList[charIndex], 0)
          this._onscrollTo(charIndex)
        },
        onTochchmove(e) {
          let firstTouch = e.touches[0]
          this.touch.y2 = firstTouch.pageY
          let detail = (this.touch.y2 - this.touch.y1) / JuLi | 0;
          let charIndex = parseInt(this.touch.charIndex) + detail
          this._onscrollTo(charIndex)
          // this.$refs.listview.scrollToElement(this.$refs.groupList[charIndex], 0)
        },
        _scroll(pos) {
          this.scrollY = pos.y
        },
        _onscrollTo(index) {
          if(!index && index!==0) return
          this.scrollY = -this.listHeight[index]
          this.$refs.listview.scrollToElement(this.$refs.groupList[index], 0)
        },

        _number() {
          this.listHeight = []
          const list = this.$refs.groupList
          let height = 0
          this.listHeight.push(height)
          for(let i = 0; i < list.length; i++) {
            let item = list[i]
            height += item.clientHeight
            this.listHeight.push(height)
          }
        }
      },
      watch: {
          data() {
            setTimeout(() => {
              this._number()
            },20)
          },
          scrollY(newY) {
            const listHeight = this.listHeight
            if(newY > 0) {
              this.currentIndex = 0
              return
            }
            for(let i = 0; i < listHeight.length - 1; i++) {
              let height1 = listHeight[i]
              let height2 = listHeight[i + 1]
              if(-newY >= height1 && -newY < height2) {
                this.currentIndex = i
                this.diff = height2 + newY
                return
              }
            }
            this.currentIndex = listHeight.length - 2
          },
          diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < itemHeight) ? newVal -itemHeight : 0
            if(this.fixedTop === fixedTop) return;
            this.fixedTop = fixedTop
            this.$refs.fixeds.style.transform = `translate3d(0, ${fixedTop}px, 0)`
          }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable.styl"
.listView
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .group-list
    padding-bottom: 30px
    .title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .group-item
      /*display: flex*/
      /*align-content: center*/
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        vertical-align: middle
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .Alphabet
    position: absolute
    right: 0
    top: 50%
    z-index: 30
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .list
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .item-fiex
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    top: 50%
    width: 100%
    transform: translateY(-50%)
</style>
