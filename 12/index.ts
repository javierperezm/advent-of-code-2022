import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const data: string[][] = loadData(__dirname, InputBlockE.real)
  .split('\n')
  .map((line: string) => line.split(''))

const results = algorithm(data)

console.table(results)
