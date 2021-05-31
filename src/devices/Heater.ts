import { Device } from "./Device";

export class Heater extends Device {
  constructor(
    identifier: string,
    powerOnCode: string,
    powerOffCode: string
  ) {
    super(identifier, powerOnCode, powerOffCode)
  }
}
