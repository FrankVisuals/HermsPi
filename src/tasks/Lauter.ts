import { Phase } from "../phases/Phase";
import { Task } from "./Task";

export class Lauter extends Task {
  constructor(
    readonly amount: number
  ) {
    super(false)
  }

  activationLog () : string {
    return `Lautering ${this.amount}ml`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async shouldEnd(phase: Phase): Promise<boolean> {
    const minutesPassed = Date.now() - this.startedAt / 1000 / 60
    const millilitersPumped = phase.pump.literPerMinute * minutesPassed * 1000

    return millilitersPumped >= this.amount
  }

  start (phase: Phase) : void {
    phase.pump.turnOn()
  }

  end (phase: Phase) : void {
    phase.pump.turnOff()
  }

  tick () : void {
    return
  }

  preStartTick () : void {
    return
  }
}
