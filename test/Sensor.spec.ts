import { Sensor } from '../src/Sensor'

describe('Sensor', () => {
  it('should be instantiable', () => {
    const sensor = new Sensor('test-id', 'test-description')
    expect(sensor).not.toBeNull()
  })
})
