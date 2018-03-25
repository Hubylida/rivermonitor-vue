import Axios from "axios";

export const instance = Axios.create({
  baseURL: '/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function getAllCameras () {
  return instance.get('/cameras')
}

export function updateCameraInfo (data) {
  return instance.post('/cameraInfo', {
    camera_id: data.camera_id,
    name: data.name,
    info: data.info,
    mac: data.mac,
    video_url: data.video_url
  })
}

export function getVideoInfo (id) {
  return instance.request({
    url: '/videoInfo',
    params: {
      camera_id: id
    }
  })
}

export function getCurrentDepth (id) {
  return instance.request({
    url: '/depth',
    params: {
      camera_id: id
    }
  })
}