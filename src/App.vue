<template>
  <div id="app">
    <nav-header></nav-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import NavHeader from '@/components/header/NavHeader'
import Tab from  '@/components/tab/tab'
import Player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    NavHeader,
    Tab,
    Player
  }
}
</script>

<style lang="stylus">

</style>
