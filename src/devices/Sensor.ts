import { ReadTemperature } from "../utils/Hardware"

export class Sensor {
  constructor (
    public readonly id: string, 
    public readonly description: string
  ) {}

  public async getTemperature() : Promise<number> {
    return ReadTemperature(this)
  }
}
