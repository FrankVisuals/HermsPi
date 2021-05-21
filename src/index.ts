import * as dotenv from 'dotenv'
import { Brew } from './Brew'

import PaleAle from './recipes/PaleAle'

dotenv.config()

const brew = new Brew(PaleAle)

brew.start()
