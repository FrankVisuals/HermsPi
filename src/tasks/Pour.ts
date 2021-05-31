import { Task } from "./Task";

export class Pour extends Task {
  constructor(
    readonly ingredient: string,
    readonly amount: number
  ) {
    super(true)
  }

  activationLog () : string {
    return `Please add "${this.amount}g" of "${this.ingredient}"`
  }

  async shouldEnd(): Promise<boolean> {
    return true
  }

  start () : void {
    return
  }

  end () : void {
    return
  }

  tick () : void {
    return
  }

  preStartTick () : void {
    return
  }
}