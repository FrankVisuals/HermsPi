import { Phase } from "../phases/Phase"

export abstract class Task {
  startedAt: number
  endedAt: number

  constructor(
    readonly async: boolean
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async shouldStart(phase: Phase): Promise<boolean> {
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async shouldEnd(phase: Phase): Promise<boolean> {
    return this.async
  }

  startTask (phase: Phase) : void {
    this.startedAt = Date.now()
    this.start(phase)
  }

  endTask (phase: Phase) : void {
    this.endedAt = Date.now()
    this.end(phase)
  }

  abstract start (phase: Phase) : void

  abstract end (phase: Phase) : void

  abstract preStartTick (phase: Phase) : void

  abstract tick (phase: Phase) : void

  abstract activationLog (phase: Phase) : string
}