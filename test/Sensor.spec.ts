import { Sensor } from '../src/devices/Sensor'

describe('Sensor', () => {
  it('should be instantiable', () => {
    const sensor = new Sensor('test-id', 'test-description')
    expect(sensor).not.toBeNull()
  })
})
