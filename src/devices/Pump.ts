import { Device } from "./Device";

export class Pump extends Device {
  constructor(
    identifier: string,
    readonly literPerMinute: number
  ) {
    super(identifier)
  }
}
