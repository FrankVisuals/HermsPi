import { Kettle } from "../Kettle";
import { Sensor } from "../Sensor";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sensors = require('./sensors.json')

const temperatureSensor = new Sensor(sensors['water-kettle'].id, sensors['water-kettle'].description)

const WaterKettle = new Kettle('water-kettle', [temperatureSensor])

export default WaterKettle
