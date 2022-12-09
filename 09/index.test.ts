import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const expected = {
  part1: 13,
  part2: 36,
}

describe('day 09', () => {
  it('part #1', async () => {
    const data: string[] = loadData(__dirname, InputBlockE.test)
      .split('\n')
      .map((line: string) => line.split(' '))
    const results = algorithm(data)
    expect(results.part1).toEqual(expected.part1)
  })

  it('part #2', async () => {
    const data: string[] = loadData(__dirname, InputBlockE.test2)
      .split('\n')
      .map((line: string) => line.split(' '))
    //const results = algorithm(data)
    //expect(results.part2).toEqual(expected.part2)
  })
})
