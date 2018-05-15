import originJSON from 'jsonp';
export default function jsonp(data, url, options){
  url += (url.indexOf('?') ? '?' : '&') + commonUrl(data);
  return new Promise((resolve, reject) => {
    originJSON(url, options, (err,data) => {
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })

}


function commonUrl(data){
  let url = '';
  for(let i in data){
    let value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : ''
}
