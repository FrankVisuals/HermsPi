import { Phase } from "../phases/Phase";
import { Task } from "./Task";

export class Cool extends Task {
  constructor(
    readonly temperature: number
  ) {
    super(false)
  }

  activationLog () : string {
    return `Start cooling to ${this.temperature}`
  }

  async shouldEnd(phase: Phase): Promise<boolean> {
    return await phase.getTemperature() <= this.temperature
  }

  start (phase: Phase) : void {
    phase.heaters.forEach(heater => {
      if (heater.isTurnedOn) {
        heater.turnOff()
      }
    })
  }

  end () : void {
    return
  }

  tick () : void {
    return
  }

  preStartTick () : void {
    return
  }
}