import { TurnPowerOff, TurnPowerOn } from "../utils/Hardware"

/**
 * Devices are controled via the 433Mhz
 * sender in order to be turned on and off.
 */
export abstract class Device {
  public isTurnedOn = false

  constructor(
    readonly identifier: string,
    readonly powerOnCode: string,
    readonly powerOffCode: string
  ) {}

  async turnOn(): Promise<boolean> {
    this.isTurnedOn = true
    return TurnPowerOn(this)
  }

  async turnOff(): Promise<boolean> {
    this.isTurnedOn = false
    return TurnPowerOff(this)
  }
}