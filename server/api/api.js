const fs = require('fs')
const path = require('path')
let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')

var connection = mysql.createConnection(models.mysql)

connection.connect()

let jsonWrite = function(res, d) { 
  if(typeof d === 'undefined') {
      res.json({
          code: '1',
          msg: '操作失败'
      });
  } else {
    res.json(d)
  }
}

// var Sql = 'insert into camera_photo (camera_id,photo_src,time,note) values (?,?,now(),?)';
// var addSql = [];
// for (let j = 0; j < 30; j++) {
//     addSql.push([1, "../../static/img/cp_1/1.png", "测试"]);
// }
// addSql.map(function (item) {
//   connection.query(Sql, item, function (err, result) {
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     console.log("initial the camera_photo ok!");
//   });
// });

router.get('/', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../../dist/index.html'), 'utf-8')
  res.send(html)
})

router.get('/cameras', (req, res) => {
  let sql = 'select * from cameras'
  connection.query(sql, function (err, d) {
    if (err) {
      console.error(err)
      return
    }
    res.send(d)
  })
})

router.post('/cameraInfo', (req, res) => {
  let newInfo = req.body
  id = parseInt(newInfo.camera_id)
  for (let i in newInfo) {
    let sql = 'update cameras set ' + i + '="' + newInfo[i] + '" where camera_id =' + id
    connection.query(sql, function (err, result) {
      if (err) {
        console.error(err.message)
        return
      }
    })
  }
})

router.get('/videoUrl', (req, res) => {
  let id = req.query.camera_id
  let sql = `select * from cameras where camera_id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err.message)
      return
    }
    res.send(result)
  })
})

router.get('/depth', (req, res) => {
  let id = req.query.camera_id
  let sql = `select * from river_depth where camera_id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err.message)
      return
    }
    res.send(result)
  })
})

router.get('/curDepth', (req, res) => {
  let id = parseInt(req.query.camera_id)
  let sql =  `select * from river_depth order by ${id} desc limit 1;`
  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err.message)
      return
    }
    res.send(result)
  })
})

router.get('/photo', (req, res) => {
  let id = parseInt(req.query.camera_id)
  let pageNum = parseInt(req.query.pageNum)
  let sql = `select * from camera_photo where camera_id=${id} order by id limit ${(pageNum - 1) * 10}, 10`
  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err.message)
      return
    }
    console.log(result.length)
    res.send(result)
  })
})

router.post('/depth', function (req, res) {
  let data = req.body;
  let id = parseInt(data.camera_id),
    depth = parseFloat(data.depth).toFixed(2),
    name = data.name
  let Sql = 'insert into river_depth (camera_id,name,depth,time) values (?,?,?,now())'
  let addSql = [id,name,depth]
  connection.query(Sql,addSql,function(err,result){
    if(err) {
      console.log(err.message)
      return
    }
    res.send(data)
    console.log("insert depth " + depth + " to camera_" + id + " ok")
  })
})

router.get('/allPhoto', function (req, res) {
  let id = req.query.camera_id
  let sql = `select * from camera_photo where camera_id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message)
      return
    }
    res.send(result)
  })
})

router.post('/picture', function (req, res) {
  req.setEncoding('binary') //设置为binary
  let imgData = ''
  let dirname = '../../static/img/cp_' + req.query.id,
    filename = '../../static/img/cp_' + req.query.id + '/' + req.query.p + '.jpg'
  let sql = 'insert into camera_photo (camera_id,photo_src,time,note) values (?,?,now(),?)'
  let addSql = [req.query.id,filename,"测试"]
  req.on('data', function (chunk) {
    imgData += chunk
  })
  req.on('end', function () {
    fs.readdir(dirname, function (err) {
      if (err) {
        fs.mkdir(dirname, function (err) {
          if (err) {
            console.log(err.message)
          }
        })
      }
      fs.writeFile(filename, imgData, 'binary', function (err) {
        if (err) {
          console.log(err.message)
        }
      })
    })
  })
  connection.query(sql,addSql,function(err,result){
    if(err){
      console.log(err.message)
    }
    console.log("insert photo success!")
  })
  res.send("ok")
})

module.exports = router