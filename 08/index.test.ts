import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const data: string[][] = loadData(__dirname, InputBlockE.test)
  .split('\n')
  .map((line: string) => line.split(''))

const expected = {
  part1: 21,
  part2: 8,
}

describe('day 08', () => {
  const { part1, part2 } = algorithm(data)

  it('part #1', async () => {
    expect(part1).toEqual(expected.part1)
  })
  it('part #2', async () => {
    expect(part2).toEqual(expected.part2)
  })
})
