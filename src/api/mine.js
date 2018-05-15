import jsonp from 'common/js/jsonp';
import {recomParams, options} from "./config";
import axios from 'axios'



export function getPublicRecom() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, recomParams, {
    platform:'h5',
    uin:0,
    needNewCode:1
  })
  return jsonp(data, url, options)
}

export function getList() {
  const url = 'api/getDiscList'
  const data = Object.assign({}, recomParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getVkey() {
  const url = "http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg"
  const data = Object.assign({}, recomParams, {
    json:3,
    guid:8969145368,
    g_tk:938407465,
    loginUin:0,
    hostUin:0,
    format:'jsonp',
    inCharset:'utf8',
    outCharset:'GB2312',
    notice:0,
    platform:'yqq',
    needNewCode:0
  })
  return jsonp(data, url, options)
}
