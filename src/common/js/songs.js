export default class song{
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id = id
    this.mid = mid
    this.name = name
    this.singer = singer
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData,vkey) {
  return new song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${vkey}&guid=8969145368&uin=0&fromtag=46`
  })
}

//http://dl.stream.qqmusic.qq.com/C400001T7S9g17LgZA.m4a?
// vkey=77B84E5FB31F50627C65AA397F5C1687BEFE82C24242B054A633B53BD0DCC3A5A0602AE4FDD0A2354338210C8DE1C35519344BCCEFE6AD16
// &guid=7099398412&uin=1343354718&fromtag=66
//http://dl.stream.qqmusic.qq.com/C4000037Oy0q1kr4A3.m4a?
// vkey=E782CB144BC1379A53BE81F2BC87D61C5178F7D9167DCEC03828813DA9F0A90EE4C65704D5749B9FF9D18A6AE817F9A23C05190ECFCCB499&
// guid=7099398412&uin=1343354718&fromtag=66

function filterSinger(singer) {
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}


