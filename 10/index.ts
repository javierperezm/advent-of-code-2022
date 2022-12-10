import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const data: string[] = loadData(__dirname, InputBlockE.real).split('\n')
const { part1, part2 } = algorithm(data)

console.table({ part1 })
console.log('part2', part2)
