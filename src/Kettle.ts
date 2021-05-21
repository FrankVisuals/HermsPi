import { RecipeStep } from "./Recipe";
import { Sensor } from "./Sensor";

export enum KettleState {
  Waiting = 'WAIT',
  Cooling = 'COOL',
  Heating = 'HEAT',
  Problem = 'PROBLEM',
  Stopped = 'STOPPED'
}

export class Kettle {
  state : KettleState = KettleState.Waiting

  task : RecipeStep = null
  onCompleteCallback = null

  // is set when the target temperature is reached for the first time
  taskStartTimeStamp : number = null

  constructor (
    public readonly id: string, 
    public readonly sensors : Array<Sensor>
  ) {}

  public async tick () : Promise<void> {
    if (!this.task || this.state === KettleState.Stopped) {
      return this.cool(true)
    }

    const { temperature } = await this.getTemperature()

    if (temperature > this.task.temperature) {
      if (!this.taskStartTimeStamp) {
        console.log(`Kettle "${this.id}" reached target temperature. Now holding for ${this.task.duration} min.`)
        this.taskStartTimeStamp = Date.now()
      }

      this.cool()
    } else {
      this.heat()
    }

    if (this.taskStartTimeStamp) {
      if (Date.now() - this.taskStartTimeStamp > this.task.duration * 60 * 1000) {
        console.log(`Task "${this.task.temperature}°C for ${this.task.duration} min" for kettle "${this.id}" completed.`)
        this.stop()
      }
    }
  }

  public stop () : void {
    this.taskStartTimeStamp = null
    this.task = null
    this.state = KettleState.Stopped
    this.onCompleteCallback()
  }

  public async heat () : Promise<void> {
    if (this.state !== KettleState.Heating) {
      this.state = KettleState.Heating
      console.debug(`Switched heat on for kettle "${this.id}".`)
      // todo trigger turn on heating element
    }
  }

  public async cool (silent = false) : Promise<void> {
    if (this.state !== KettleState.Cooling) {
      this.state = KettleState.Cooling

      if (!silent) {
        console.debug(`Switched heat off for kettle "${this.id}".`)
      }
      // todo trigger turn off heating element
    }
  }

  public async check () : Promise<void> {
    const { temperature } = await this.getTemperature()

    if (temperature === 0) {
      console.error(`Kettle "${this.id}" was unable to read temperature.`)
      throw new Error(`Kettle "${this.id}" was unable to run check.`)
    }
  }

  public async getTemperature () : Promise<{ temperature: number, temperatures: Array<number> }> {
    const temps = []
    let total = 0
    
    for (const sensor of this.sensors) {
      const temp = await sensor.getTemperature()

      console.log(`Kettle "${this.id}" is at ${temp}°C`)

      if (temp === null) {
        this.state = KettleState.Problem
      } else {
        total += temp
        temps.push(temp)
      }
    }

    return {
      temperature: total,
      temperatures: temps
    }
  }

  public isBusy () : boolean {
    return !!this.task
  }

  public setTask (step: RecipeStep, onCompleteCallback) : void {
    if (this.task) {
      throw new Error(`Failed to set Task. Kettle with id "${this.id}" already has a task.`)
    }

    this.state = KettleState.Waiting
    this.taskStartTimeStamp = null
    this.task = step
    this.onCompleteCallback = onCompleteCallback

    console.log(`Task "${this.task.temperature}°C for ${this.task.duration} min" for kettle "${this.id}" started.`)
  }
}
