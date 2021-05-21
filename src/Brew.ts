import { Kettle } from "./Kettle";
import { Recipe, RecipePhase } from "./Recipe";

import WaterKettle from './hardware/WaterKettle'
import { Phase } from "./phases/Phase";
import PhaseMap from "./phases/PhaseMap";

export class Brew {
  kettles: Array<Kettle>

  phase: Phase
  nextPhase: RecipePhase

  mainProcess = null

  constructor(readonly recipe: Recipe) {
    this.kettles = [WaterKettle]
  }

  async start(): Promise<void> {
    await this.check()
    console.info(`All checks successful. Brew of recipe "${this.recipe.identifier}" starts`)

    this.nextPhase = RecipePhase.PreHeat
    this.startNextPhase()

    this.mainProcess = setInterval(() => {
      this.phase.tick()
    }, 3000)
  }

  async end(): Promise<void> {
    clearInterval(this.mainProcess)
    console.info(`Brew completed`)
  }

  async check(): Promise<void> {
    for (const kettle of this.kettles) {
      await kettle.check()
    }
  }

  async startNextPhase(): Promise<void> {
    if (!this.nextPhase) {
      return this.end()
    }

    console.log(`Starting new Phase "${this.nextPhase}"`)

    const { phase, next } = PhaseMap[this.nextPhase]
    this.phase = new phase(this.recipe[RecipePhase.PreHeat], this.startNextPhase.bind(this))
    this.nextPhase = next
  }
}