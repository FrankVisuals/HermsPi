import { TurnPowerOff, TurnPowerOn } from "../utils/Hardware"

/**
 * Devices are controled via the 433Mhz
 * sender in order to be turned on and off.
 */
export abstract class Device {
  constructor(
    readonly identifier: string
  ) {}

  async turnOn(): Promise<boolean> {
    return TurnPowerOn(this)
  }

  async turnOff(): Promise<boolean> {
    return TurnPowerOff(this)
  }
}