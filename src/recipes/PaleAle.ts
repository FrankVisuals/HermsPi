import { Recipe, RecipePhase } from '../Recipe'

const paleAle : Recipe = {
  identifier: 'Pale Ale Classic',
  [RecipePhase.PreHeat]: [
    {
      temperature: 60,
      duration: 1
    }
  ],
  [RecipePhase.Mashing]: [
    {
      temperature: 57,
      duration: 10
    },
    {
      temperature: 63,
      duration: 60
    },
    {
      temperature: 72,
      duration: 10
    },
    {
      temperature: 78,
      duration: 1
    }
  ],
  [RecipePhase.Lautering]: [],
  [RecipePhase.Boiling]: [],
  [RecipePhase.Cooling]: []
}

export default paleAle
