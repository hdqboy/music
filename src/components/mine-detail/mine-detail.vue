<template>
  <transition name="slide">
    <busin-list :songs="songs" :title="title" :bg-image="bgImage"></busin-list>
  </transition>
</template>

<script type="text/ecmascript-6">
    import {ERR_OK} from "../../api/config";
    import {mapGetters} from 'vuex';
    import {getSingetDetail} from "../../api/singer";
    import {createSong} from "../../common/js/songs";
    import businList from  "../../components/busin-list/busin-list"
    import {getVkey} from "../../api/mine"

    export default {
      name: "mine-detail",
      computed: {
        title() {
          return this.singer.name
        },
        bgImage() {
          return this.singer.avatar
        },
        ...mapGetters([
          'singer'
        ])
      },
      data() {
        return {
          songs: [],
        }
      },
      created() {
          this._getDetail()
      },
      methods: {
        _getDetail() {
          if(!this.singer.id) {
            this.$router.push('/business')
            return
          }
          getSingetDetail(this.singer.id).then((res) => {
            getVkey().then((r) => {
              if(res.code === ERR_OK) {
                this.songs = this._getDetailList(res.data.list,r.key)
              }
            })
          })
        },
        _getDetailList(list,vskey) {
          let ret = [];
          list.forEach((item) => {
            let {musicData} = item
            if(musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData,vskey))
            }
          })
          return ret
        }
      },
      components: {
        businList
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
