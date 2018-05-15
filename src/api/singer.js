import jsonp from 'common/js/jsonp.js'
import {recomParams,options} from "./config"

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, recomParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(data,url,options)
}

export function getSingetDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, recomParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    g_tk: 1664029744,
    songstatus: 1,
    filename: 'C400' + singerId + '.m4a',
    singermid: singerId
  })
  return jsonp(data, url, options)
}
