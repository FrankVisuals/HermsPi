import { Heater } from "../devices/Heater"
import { Pump } from "../devices/Pump"
import { Sensor } from "../devices/Sensor"
import { RecipePhase } from "../recipes/Recipe"
import { ConfigPhaseDefinition } from "../utils/ConfigDefinition"

export class Phase {
  heaters: Array<Heater>
  sensors: Array<Sensor>
  pump: Pump
  circulationPumps: Array<Pump>

  constructor(
    readonly type: RecipePhase,
    config: ConfigPhaseDefinition
  ) {
    this.heaters = config.heaters.map(config => {
      return new Heater(config.identifier, config.powerOnCode, config.powerOffCode)
    })

    this.sensors = config.sensors.map(identifier => {
      return new Sensor(identifier, identifier)
    })

    this.circulationPumps = config.circulationPumps.map(config => {
      return new Pump(config.identifier, config.powerOnCode, config.powerOffCode, 5)
    })

    if (config.pump) {
      this.pump = new Pump(config.pump.identifier, config.pump.powerOnCode, config.pump.powerOffCode, 5)
    }
  }

  async getTemperature(): Promise<number> {
    let temperature = 0

    for (const sensor of this.sensors) {
      temperature += await sensor.getTemperature()
    }

    return temperature / this.sensors.length
  }
}
