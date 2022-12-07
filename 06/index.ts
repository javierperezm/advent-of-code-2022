import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

const algorithm = (data: string[], range: number = 4) => {
  for (let x = 0; x < data.length; x++) {
    const chars: string[] = []
    for (let y = 0; y < range; y++) {
      const char = data[x + y]
      if (chars.includes(char)) break
      chars.push(char)
    }

    if (chars.length === range) return { x: x + range, chars: chars.join('') }
  }

  return null
}

const day6Test = () =>
  loadData(__dirname, InputBlockE.test)
    .split('\n')
    .map((line: string) => {
      const [stringData, expected4, expected14] = line.split('|')
      return {
        assert4: algorithm(stringData.split(''))?.x === parseInt(expected4),
        assert14:
          algorithm(stringData.split(''), 14)?.x === parseInt(expected14),
      }
    })

const day6a = () => algorithm(loadData(__dirname, InputBlockE.real).split(''))
const day6b = () =>
  algorithm(loadData(__dirname, InputBlockE.real).split(''), 14)

console.table(day6Test())

console.table({
  part1: day6a(),
  part2: day6b(),
})
