import { RecipePhase } from "../recipes/Recipe";

export interface DeviceConfig {
  identifier: string
  powerOnCode: string
  powerOffCode: string
}

export interface ConfigPhaseDefinition {
  circulationPumps: Array<DeviceConfig>
  sensors: Array<string>
  heaters: Array<DeviceConfig>
  pump: DeviceConfig
}

export interface Config {
  [RecipePhase.PreHeat] : ConfigPhaseDefinition
  [RecipePhase.Mashing] : ConfigPhaseDefinition
  [RecipePhase.Lautering] : ConfigPhaseDefinition
  [RecipePhase.Boiling] : ConfigPhaseDefinition
  [RecipePhase.Cooling] : ConfigPhaseDefinition
}
