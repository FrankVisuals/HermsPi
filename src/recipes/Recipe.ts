import { Task } from "../tasks/Task";

export enum RecipePhase {
  PreHeat = 'PREHEAT',
  Mashing = 'MASHING',
  Lautering = 'LAUTERING',
  Boiling = 'BOILING',
  Cooling = 'COOLING'
}

export interface Recipe {
  identifier: string,
  [RecipePhase.PreHeat]: Array<Task>,
  [RecipePhase.Mashing]: Array<Task>,
  [RecipePhase.Lautering]: Array<Task>,
  [RecipePhase.Boiling]: Array<Task>,
  [RecipePhase.Cooling]: Array<Task>,
}

export const RecipePhaseMap : Record<RecipePhase, RecipePhase> = {
  [RecipePhase.PreHeat] : RecipePhase.Mashing,
  [RecipePhase.Mashing] : RecipePhase.Lautering,
  [RecipePhase.Lautering] : RecipePhase.Boiling,
  [RecipePhase.Boiling] : RecipePhase.Cooling,
  [RecipePhase.Cooling] : null
}
