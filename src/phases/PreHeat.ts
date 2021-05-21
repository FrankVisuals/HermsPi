import WaterKettle from "../hardware/WaterKettle"
import { Phase } from "./Phase"

/**
 * In the PreHeat phase only the WaterKettle
 * is used. It is pre heated to a specific value.
 * Typically only one step is part of this phase.
 */

export class PreHeat extends Phase {
  name = 'Pre Heat'
  // alwaysOn = [/* PumpA, PumpB */], // hardware that runs all the time
  kettle = WaterKettle // kettle that regulates the temperature
}
