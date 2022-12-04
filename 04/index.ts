import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

const day4a = (block: InputBlockE) =>
  loadData(__dirname, block)
    .split('\n')
    .map((line: string) =>
      line.split(',').map((dupla) => dupla.split('-').map((n) => parseInt(n)))
    )
    .map(([d1, d2]: string[]) =>
      (d1[0] <= d2[0] && d1[1] >= d2[1]) || (d2[0] <= d1[0] && d2[1] >= d1[1])
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b)

const day4b = (block: InputBlockE) =>
  loadData(__dirname, block)
    .split('\n')
    .map((line: string) =>
      line.split(',').map((dupla) => dupla.split('-').map((n) => parseInt(n)))
    )
    .map(([d1, d2]: string[]) =>
      (d1[0] <= d2[0] && d1[1] >= d2[0]) || (d2[0] <= d1[0] && d2[1] >= d1[0])
        ? 1
        : 0
    )
    .reduce((a: number, b: number) => a + b)

console.log({
  testA: day4a(InputBlockE.test),
  realA: day4a(InputBlockE.real),
  testB: day4b(InputBlockE.test),
  realB: day4b(InputBlockE.real),
})
