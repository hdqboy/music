<template>
  <div class="businss">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerList} from "../../api/singer";
    import {ERR_OK} from "../../api/config";
    import Singer from "../../common/js/singer"
    import ListView from '../../base/listview/listview'
    import {mapMutations} from 'vuex'

    const HOST_SINGER = '热门'
    const HOST_SINGER_LENGTH = 10
    export default {
        name: "business",
        data() {
          return {
            singers: []
          }
        },
        components: {
          ListView
        },
        created() {
          this._singer()
        },
        methods:{
          selectSinger(singer) {
            console.log(singer)
            this.$router.push({
              path: `/business/${singer.id}`
            })
            this.setSinger(singer)
          },
          _singer() {
            getSingerList().then((res) => {
              if(res.code === ERR_OK) {
                this.singers = this._modifyData(res.data.list)
              }
            })
          },
          _modifyData(list) {
            let map = {
              hot: {
                title: HOST_SINGER,
                items: []
              }
            };
            list.forEach((item, index) => {
                 if(index < HOST_SINGER_LENGTH) {
                   map.hot.items.push(new Singer({
                     id: item.Fsinger_mid,
                     name: item.Fsinger_name
                   }))
                 }
                 const key = item.Findex
                 if(!map[key]) {
                   map[key] = {
                     title: key,
                     items: []
                   }
                 }

                 map[key].items.push(new Singer({
                   id: item.Fsinger_mid,
                   name: item.Fsinger_name,
                 }))
            });
            //数据排序
            let hot = []
            let ret = []
            for(let key in map) {
              let val = map[key]
              if(val.title === HOST_SINGER) {
                hot.push(val)
              }else if(val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
              }
            }
            ret.sort((a, b) => {
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
          },
          ...mapMutations({
            setSinger: 'SET_SINGER'
          })
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .businss
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
