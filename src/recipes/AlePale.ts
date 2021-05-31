import { Lauter } from '../tasks/Lauter'
import { Cool } from '../tasks/Cool'
import { Heat } from '../tasks/Heat'
import { Pour } from '../tasks/Pour'
import { RecipePhase } from './Recipe'

const alePale = {
  identifier: 'Pale Ale Classic',
  [RecipePhase.PreHeat]: [
    new Heat(60, 1)
  ],
  [RecipePhase.Mashing]: [
    new Pour("Pale Ale Malz", 500),
    new Pour("Carapils Malz", 100),
    new Heat(57, 10),
    new Heat(63, 60),
    new Heat(72, 10),
    new Heat(78, 1)
  ],
  [RecipePhase.Lautering]: [
    new Lauter(0.5)
  ],
  [RecipePhase.Boiling]: [
    new Pour("Hopfen Cascade (6,8 % Alpha)", 5),
    new Heat(100, 40),
    new Pour("Hopfen Centennial (12,3 % Alpha)", 5),
    new Heat(100, 40)
  ],
  [RecipePhase.Cooling]: [
    new Cool(30)
  ]
}

export default alePale
