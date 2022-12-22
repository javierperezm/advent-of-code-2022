import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import algorithm from './algorithm'

const data = loadData(__dirname, InputBlockE.real)

const results = algorithm(data)

console.table(results)
