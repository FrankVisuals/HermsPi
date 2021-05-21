import { RecipePhase } from "../Recipe";
import { Phase } from "./Phase";
import { PreHeat } from "./PreHeat";

export interface PhaseDefinition {
  phase: Phase,
  next: RecipePhase
}

export default {
  [RecipePhase.PreHeat]: {
    phase: PreHeat,
    next: RecipePhase.Mashing
  },
  [RecipePhase.Mashing]: {
    phase: PreHeat,
    next: RecipePhase.Lautering
  },
  [RecipePhase.Lautering]: {
    phase: PreHeat,
    next: RecipePhase.Boiling
  },
  [RecipePhase.Boiling]: {
    phase: PreHeat,
    next: RecipePhase.Cooling
  },
  [RecipePhase.Cooling]: {
    phase: PreHeat,
    next: null
  }
}
