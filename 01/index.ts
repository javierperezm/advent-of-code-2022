import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

const day1a = (block: InputBlockE) =>
  loadData(__dirname, block)
    .split('\n\n')
    .map((elf: string) =>
      elf
        .split('\n')
        .map((n) => parseInt(n))
        .reduce((acc, current) => acc + current)
    )
    .sort((a: number, b: number) => b - a)[0]

const day1b = (block: InputBlockE) =>
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
  testA: day1a(InputBlockE.test),
  realA: day1a(InputBlockE.real),
  testB: day1b(InputBlockE.test),
  realB: day1b(InputBlockE.real),
})
