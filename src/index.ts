import * as dotenv from 'dotenv'
import { Brew } from './Brew'
import alePale from './recipes/AlePale'

dotenv.config()

new Brew(alePale)
