import { ReadTemperature } from "./utils/Hardware"

export enum SensorStates {
  Pending = 'PENDING',
  Ready = 'READY',
  Error = 'ERROR'
}

export class Sensor {
  state : SensorStates = SensorStates.Pending
  temperature : number = null

  constructor (
    public readonly id: string, 
    public readonly description: string
  ) {}

  public async getTemperature() : Promise<number> {
    return ReadTemperature(this)
      .catch(() => {
        this.state = SensorStates.Error
        return null
      })
  }
}
