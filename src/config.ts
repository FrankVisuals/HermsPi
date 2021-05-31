import { RecipePhase } from "./recipes/Recipe";
import { Config } from "./utils/ConfigDefinition";

export const config : Config = {
  [RecipePhase.PreHeat]: {
    circulationPumps: [{
      identifier: 'Ciculation Pump Water Kettle (A-1)',
      powerOnCode: process.env.CIRCULATION_PUMP_WATER_KETTLE_ON,
      powerOffCode: process.env.CIRCULATION_PUMP_WATER_KETTLE_OFF
    }],
    sensors: ['b2-sensor'],
    heaters: [{
      identifier: 'Water Kettle Heater (A-2)',
      powerOnCode: process.env.HEATER_WATER_KETTLE_ON,
      powerOffCode: process.env.HEATER_WATER_KETTLE_OFF
    }],
    pump: null
  },
  [RecipePhase.Mashing]: {
    circulationPumps: [{
      identifier: 'Ciculation Pump Water Kettle (A-1)',
      powerOnCode: process.env.CIRCULATION_PUMP_WATER_KETTLE_ON,
      powerOffCode: process.env.CIRCULATION_PUMP_WATER_KETTLE_OFF
    }],
    sensors: ['b2-sensor'],
    heaters: [{
      identifier: 'Water Kettle Heater (A-2)',
      powerOnCode: process.env.HEATER_WATER_KETTLE_ON,
      powerOffCode: process.env.HEATER_WATER_KETTLE_OFF
    }],
    pump: {
      identifier: 'Move Pump (A-3)',
      powerOnCode: '',
      powerOffCode: ''
    }
  },
  [RecipePhase.Lautering]: {
    circulationPumps: [],
    sensors: ['b3-sensor'],
    heaters: [],
    pump: {
      identifier: 'Lauter Pump (A-4)',
      powerOnCode: '',
      powerOffCode: ''
    }
  },
  [RecipePhase.Boiling]: {
    circulationPumps: [],
    sensors: [],
    heaters: [],
    pump: null
  },
  [RecipePhase.Cooling]: {
    circulationPumps: [],
    sensors: [],
    heaters: [],
    pump: null
  }
}