
import fs from 'fs'
import { Router } from 'express'
import {
  getUser,
  getUserAvatar,
} from '../utils/reqres-api.js'

const user = Router()

user.get('/:id', (req, res) => {
  getUser(req.params.id, res).then(({data}) => {
    if (!data) {
      return res.status(404).send()
    }
    console.log(data)
    res.send(data)
  })
})

user.get('/:id/avatar', (req, res) => {
  console.log(req.params)
  getUser(req.params.id, res).then(({data}) => {
    if (!data || !data.avatar) {
      return res.status(404).send()
    }
    const id = data.id
    console.log(data, '\navatar url: ' + data.avatar)
    getUserAvatar(data.avatar).then(data => data.buffer().then(buffer => {
      const base64 = buffer.toString('base64')
      fs.writeFile(
        `tmp/${id}.png`,
        base64,
        'base64',
        err => {
          if (err) {
            res.send({savedOnDisk: false, base64, err})
          }
          res.send({savedOnDisk: true, base64})
        });
      res.send({base64, err})
    }))
  })
})

export default user
