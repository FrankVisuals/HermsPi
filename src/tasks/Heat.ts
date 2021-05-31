import { Phase } from "../phases/Phase";
import { Task } from "./Task";

export class Heat extends Task {
  constructor(
    readonly temperature: number,
    readonly duration: number
  ) {
    super(false)
  }

  activationLog () : string {
    return `Start heating to ${this.temperature}°C`
  }

  async shouldStart(phase: Phase): Promise<boolean> {
    return await phase.getTemperature() >= this.temperature
  }

  async shouldEnd(): Promise<boolean> {
    return Date.now() - this.startedAt > this.duration * 60 * 1000
  }

  start () : void {
    console.log(`Holding ${this.temperature}°C for ${this.duration} minute`)
  }

  end (phase: Phase) : void {
    phase.heaters.forEach(heater => {
      if (heater.isTurnedOn) {
        heater.turnOff()
      }
    })
  }

  async tick (phase: Phase) : Promise<void> {
    const temperature = await phase.getTemperature()

    if (temperature >= this.temperature) {
      phase.heaters.forEach(heater => {
        if (heater.isTurnedOn) {
          heater.turnOff()
        }
      })
    } else if (temperature < this.temperature) {
      phase.heaters.forEach(heater => {
        if (!heater.isTurnedOn) {
          heater.turnOn()
        }
      })
    }

    console.log(`${temperature}°C`)
  }

  preStartTick (phase: Phase) : void {
    phase.heaters.forEach(heater => {
      if (!heater.isTurnedOn) {
        heater.turnOn()
      }
    })
  }
}