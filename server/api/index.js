const request = require('request')
// const md5 = require('md5')
const r = (option)=>{
  return new Promise((res,rej)=>{
    request(option,(error, response, body)=>{
      if(error){
        return rej({'error':'服务器错误'})
      }
      res(response)
    })
  })
}
// 抽离成公共方法
const awaitWrap = promise => {
  // '_readableState',  
  // 'readable',        
  // '_events',
  // '_eventsCount',    
  // '_maxListeners',
  // 'socket',
  // 'connection',
  // 'httpVersionMajor',
  // 'httpVersionMinor',
  // 'httpVersion',
  // 'complete',
  // 'headers',
  // 'rawHeaders',
  // 'trailers',
  // 'rawTrailers',
  // 'aborted',
  // 'upgrade',
  // 'url',
  // 'method',
  // 'statusCode',
  // 'statusMessage',
  // 'client',
  // '_consuming',
  // '_dumped',
  // 'req',
  // 'request',
  // 'toJSON',
  // 'caseless',
  // 'body' 
  return promise
    .then(data => [null, {
      body:data.body,
    }])
    .catch(err => [err, null])
}
const wrequest = option=>{
  return awaitWrap(r(option))
}

module.exports=async function(req,res,next){
  if(req.url !== '/api'){
    return next()
  }
  res.set('Content-Type', 'application/json')
  // console.log(req.body)
  const [err,response] = await wrequest(req.body)
  return res.send(response.body)
}
