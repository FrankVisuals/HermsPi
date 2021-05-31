import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'

import { Device} from '../devices/Device'
import { Sensor } from '../devices/Sensor'

const getSensorPrefix = () : string => {
  if (process.env.NODE_ENV === 'development') {
    return path.join(__dirname, '..', '..', 'dev')
  }

  return '/sys/bus/w1/devices/'
}

const getExecCommand = () : string => {
  if (process.env.NODE_ENV === 'development') {
    return path.join(__dirname, '..', '..', 'dev', 'power.bat')
  }

  return path.join(__dirname, '../', '../', 'bin', 'PowerControl')
}

export const ReadTemperature = async (sensor: Sensor): Promise<number> => {
  const fullPath = path.join(getSensorPrefix(), sensor.id, 'w1_slave')

  if (fs.existsSync(fullPath)) {
    const file = fs.readFileSync(fullPath, 'utf8')
    const [, temperature] = file.split('t=')
    return parseInt(temperature) / 1000
  } else {
    console.error(`Could not locate sensor "${sensor.id}" in filesstem`)
    throw Error(`Could not locate sensor "${sensor.id}" in filesstem`)
  }
}

export const TurnPowerOn = async (device: Device): Promise<boolean> => {
  const result = execSync(`${getExecCommand()} 1 ${device.identifier}`)

  return !!result
}

export const TurnPowerOff = async (device: Device): Promise<boolean> => {
  const result = execSync(`${getExecCommand()} ${process.env.ONE_WIRE_PIN} ${device.identifier}`)

  return !!result
}
