import {palyMode} from "../common/js/util"

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: palyMode.sequence,
  currentIndex: -1
}

/*
* 播放
* 全屏
* 播放列表
* 顺序列表
* 播放位置
* */

export default state
