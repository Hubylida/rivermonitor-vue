const Api = require('./api/api.js')
const fs = require('fs')
const path = require('path')
const bodyParse = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({extended: false}))

app.use('/', Api)

app.listen(3000)
console.log('success listen at port 3000')