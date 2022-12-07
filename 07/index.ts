import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

interface ConfigI {
  mode?: 'sumMinusThan' | 'smallest'
  diskSpace?: number
  neededFreeSpace?: number
  maxSize?: number
}

const config1: ConfigI = {
  mode: 'sumMinusThan',
  maxSize: 100000,
}
const config2: ConfigI = {
  mode: 'smallest',
  diskSpace: 70000000,
  neededFreeSpace: 30000000,
}

const algorithm = (data: string[], config: ConfigI) => {
  const path: string[] = []
  const tree: Record<string, number> = {}
  let totalUsed = 0

  data.forEach((line) => {
    if (line[0] === '$') {
      const [symbol, command, params] = line.split(' ')
      if (command === 'cd') {
        if (params === '..') {
          path.pop()
        } else {
          path.push(params)
          const key = path.join('-')
          tree[key] = tree[key] ? tree[key] : 0
        }
      }
    } else {
      const [size, filename] = line.split(' ')
      if (size !== 'dir') {
        const fileSize = parseInt(size)
        const directories = [...path]
        totalUsed += fileSize
        while (directories.length > 0) {
          const key = directories.join('-')
          tree[key] += fileSize
          directories.pop()
        }
      }
    }
  })

  if (config.mode === 'sumMinusThan') {
    return Object.entries(tree)
      .map(([_, size]) => size)
      .filter((size) => size <= (config.maxSize as number))
      .reduce((acc, cur) => acc + cur)
  } else {
    const totalFree = (config.diskSpace as number) - totalUsed
    const totalNeeded = (config.neededFreeSpace as number) - totalFree

    return Object.entries(tree)
      .map(([_, size]) => size)
      .filter((size) => size >= totalNeeded)
      .sort((a, b) => a - b)[0]
  }
}

const testData = loadData(__dirname, InputBlockE.test).split('\n')
console.table({
  assert1: algorithm(testData, config1) === 95437,
  assert2: algorithm(testData, config2) === 24933642,
})

const data = loadData(__dirname, InputBlockE.real).split('\n')
console.table({
  part1: algorithm(data, config1),
  part2: algorithm(data, config2),
})
