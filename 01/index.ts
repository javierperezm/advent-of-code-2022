import loadData from '../shared/loadData'
import type { BlockT } from '../shared/types'

const day1a = (block: BlockT) =>
  loadData(__dirname, block)
    .split('\n\n')
    .map((elf: string) =>
      elf
        .split('\n')
        .map((n) => parseInt(n))
        .reduce((acc, current) => acc + current)
    )
    .sort((a: number, b: number) => b - a)[0]

const day1b = (block: BlockT) =>
  loadData(__dirname, block)
    .split('\n\n')
    .map((elf: string) =>
      elf
        .split('\n')
        .map((n) => parseInt(n))
        .reduce((acc, current) => acc + current)
    )
    .sort((a: number, b: number) => b - a)
    .slice(0, 3)
    .reduce((a: number, b: number) => a + b)

console.log({
  testA: day1a('test'),
  realA: day1a('real'),
  testB: day1b('test'),
  realB: day1b('real'),
})
