import { Kettle } from "../Kettle"
import { RecipeStep } from "../Recipe"

export enum PhaseState {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export abstract class Phase {
  name : string = null
  kettle : Kettle = null
  state : PhaseState = null
  currentStep : number = null

  constructor (protected readonly steps: Array<RecipeStep>, readonly onFinishCallback) {
    this.state = PhaseState.Active
    this.currentStep = 0
  }

  public nextPhase () : void {
    this.state = PhaseState.Completed
    this.onFinishCallback()
  }

  async tick(): Promise<void> {
    if (this.steps.length <= this.currentStep) {
      this.onPhaseCompleted()
      return
    }

    if (!this.kettle.isBusy()) {
      this.kettle.setTask(this.steps[this.currentStep], this.onTaskCompleted.bind(this))
    }

    this.kettle.tick()
  }

  private onTaskCompleted(): void {
    this.currentStep++
  }

  private onPhaseCompleted(): void {
    console.log(`Phase "${this.name}" completed.`)
    this.nextPhase()
  }
}