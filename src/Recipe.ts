export enum RecipePhase {
  PreHeat = 'PREHEAT',
  Mashing = 'MASHING',
  Lautering = 'LAUTERING',
  Boiling = 'BOILING',
  Cooling = 'COOLING'
}

export interface Recipe {
  identifier: string,
  [RecipePhase.PreHeat]: Array<RecipeStep>,
  [RecipePhase.Mashing]: Array<RecipeStep>,
  [RecipePhase.Lautering]: Array<RecipeStep>,
  [RecipePhase.Boiling]: Array<RecipeStep>,
  [RecipePhase.Cooling]: Array<RecipeStep>,
}

export interface RecipeStep {
  temperature: number
  duration: number
}
