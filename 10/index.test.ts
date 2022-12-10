import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const expected = {
  part1: 13140,
  part2: [
    '##..##..##..##..##..##..##..##..##..##..',
    '###...###...###...###...###...###...###.',
    '####....####....####....####....####....',
    '#####.....#####.....#####.....#####.....',
    '######......######......######......####',
    '#######.......#######.......#######.....',
  ],
}

describe('day 10', () => {
  const data: string[] = loadData(__dirname, InputBlockE.test).split('\n')
  const results = algorithm(data)

  it('part #1', async () => {
    expect(results.part1).toEqual(expected.part1)
  })

  it('part #2', async () => {
    expect(results.part2).toEqual(expected.part2)
  })
})
