import { Router } from 'express'
import user from './user'

const router = Router()

const apiVersion = process.env.API_VERSION ?
  `v${process.env.API_VERSION}/` : ``

router.use(`/api${apiVersion}/user/`, user)

export default router
