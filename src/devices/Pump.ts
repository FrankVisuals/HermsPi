import { Device } from "./Device";

export class Pump extends Device {
  constructor(
    identifier: string,
    powerOnCode: string,
    powerOffCode: string,
    readonly literPerMinute: number
  ) {
    super(identifier, powerOnCode, powerOffCode)
  }
}
