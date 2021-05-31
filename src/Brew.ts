import { config } from "./config";
import { Phase } from "./phases/Phase";
import { Recipe, RecipePhase, RecipePhaseMap } from "./recipes/Recipe";
import { Task } from "./tasks/Task";

export class Brew {
  mainProcess = null          // interval reference

  phase: Phase = null         // current brewing phase

  tasks: Array<Task> = []     // tasks to complete within the current brewing phase

  tickInterval = 3000         // interval in ms for tick method

  currentTask: Task = null    // current task to solve

  /**
   * Recives the recipe as input. Will directly start.
   */
  constructor(
    readonly recipe: Recipe
  ) {
    this.start()
  }

  /**
   * Start by setting the first phase.
   * Will also start the ticker that is called every x
   * milliseconds in order to handle temperature etc.
   */
  async start(): Promise<void> {
    await this.startNextPhase()

    this.mainProcess = setInterval(() => {
      this.tick()
    }, this.tickInterval)
  }

  /**
   * Called every <tickInterval> milliseconds.
   * Handle the current state.
   */
  async tick(): Promise<void> {
    // if no task is set - set the first one
    if (!this.currentTask) {
      if (!this.tasks.length) {
        console.error(`Invalid recipe - no task provided for phase ${this.phase}.`)
      } else {
        await this.startTask(this.tasks[0])
      }
    }

    this.solveTask()
  }

  async startTask(task: Task): Promise<void> {
    this.currentTask = task

    console.log(this.currentTask.activationLog(this.phase))

    if (task.async) {
      await this.onTaskSolved(task)
    }
  }

  async solveTask(): Promise<void> {
    if (!this.currentTask.startedAt) {
      if (await this.currentTask.shouldStart(this.phase)) {
        this.currentTask.startTask(this.phase)
      } else {
        this.currentTask.preStartTick(this.phase)
      }
    } else {
      if (await this.currentTask.shouldEnd(this.phase)) {
        this.currentTask.endTask(this.phase)
        this.onTaskSolved(this.currentTask)
      } else {
        this.currentTask.tick(this.phase)
      }
    }
  }

  async onTaskSolved(task: Task): Promise<void> {
    const nextIndex = this.tasks.indexOf(task) + 1

    if (this.tasks.length > nextIndex) {
      this.startTask(this.tasks[nextIndex])
    } else {
      this.onPhaseCompleted()
    }
  }

  async onPhaseCompleted(): Promise<void> {
    this.startNextPhase()
  }

  /**
   * Stops the interval.
   */
  async end(): Promise<void> {
    clearInterval(this.mainProcess)
  }

  /**
   * Determines the next phase.
   */
  async startNextPhase(): Promise<void> {
    // if not yet started - set phase to PreHeat
    if (!this.phase) {
      this.setPhase(RecipePhase.PreHeat)
      return console.log(`Starting new Phase "${RecipePhase.PreHeat}"`)
    }

    // if no next phase is provided - end
    if (!RecipePhaseMap[this.phase.type]) {
      this.setPhase(null)
      this.end()
      return console.log(`All Phases completed.`)
    }

    this.setPhase(RecipePhaseMap[this.phase.type])

    return console.log(`Starting new Phase "${this.phase.type}"`)
  }

  /**
   * Set the phase and the relevant tasks of the phase. 
   */
  async setPhase(phase: RecipePhase): Promise<void> {
    if (phase) {
      this.phase = new Phase(phase, config[phase])

      if (Array.isArray(this.recipe[this.phase.type])) {
        this.tasks = this.recipe[this.phase.type]
      }

      // todo - start circulisation pumps (& end previous)
    } else {
      this.phase = null
      this.tasks = []
    }
  }
}