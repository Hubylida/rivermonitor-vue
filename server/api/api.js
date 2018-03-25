let models = require('../db')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let $sql = require('../sqlMap')

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

router.get('/v1/cameras', (req, res) => {
  let sql = $sql.getAllCameras
  connection.query(sql, function (err, d) {
    if (err) {
      console.error(err)
      return
    }
    res.send(d)
  })
})

router.post('/v1/cameraInfo', (req, res) => {
  let newInfo = req.body
  id = parseInt(newInfo.camera_id)
  for (let i in newInfo) {
    let sql = 'update cameras set ' + i + '="' + newInfo[i] + '" where camera_id=' + id
    connection.query(sql, function (err, result) {
      if (err) {
        console.error(err.message)
        return
      }
    })
  }
})

router.get('/v1/videoInfo', (req, res) => {
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

router.get('/v1/depth', (req, res) => {
  let id = req.query.camera_id
  let sql = `select * from river_depth where camera_id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      console.error(err.message)
      return
    }
    console.log(result)
    res.send(result)
  })
})

module.exports = router