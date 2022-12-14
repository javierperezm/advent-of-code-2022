import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const expected = {
  part1: 31,
  part2: 29,
}

describe('day 12', () => {
  const data: string[][] = loadData(__dirname, InputBlockE.test)
    .split('\n')
    .map((line: string) => line.split(''))

  const results = algorithm(data)

  it('part #1', async () => {
    expect(results.part1).toEqual(expected.part1)
  })

  it('part #2', async () => {
    expect(results.part2).toEqual(expected.part2)
  })
})
