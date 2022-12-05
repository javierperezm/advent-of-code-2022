import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

class StacksManager {
  protected stacks: string[][] = []

  protected clean(crane: string) {
    return crane.trim().replace(/\[([A-Z]+)\]/, '$1')
  }

  push(stack: number, crane: string) {
    while (this.stacks.length < stack + 1) this.stacks.push([])

    const result = this.clean(crane)

    if (result) this.stacks[stack].push(result)
  }

  shiftMany(stack: number, cranes: number): string[] {
    const results: string[] = []
    for (let x = 1; x <= cranes; x++) {
      const crane = this.stacks[stack].shift()
      if (crane) results.push(crane)
    }
    return results
  }

  unshiftMany(stack: number, cranes: string[]) {
    cranes.forEach((crane: string) => this.stacks[stack].unshift(crane))
  }

  read() {
    return this.stacks.map((elements) => elements[0]).join('')
  }
}

const day5a = (block: InputBlockE) => {
  const stacks = new StacksManager()
  let readingMode = true

  loadData(__dirname, block)
    .split('\n')
    .forEach((line: string) => {
      if (readingMode) {
        let processedLine = line
        let stackNumber = 0
        do {
          const crane = processedLine.substring(0, 3)
          processedLine = processedLine.substring(4)

          if (parseInt(crane.trim()) === 1) {
            readingMode = false
            return
          }

          stacks.push(stackNumber++, crane)
        } while (processedLine.length > 0)
      } else {
        const matched = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
        if (matched === null) return
        const [cranes, from, to] = [matched[1], matched[2], matched[3]]
        const extractedCranes = stacks.shiftMany(
          parseInt(from) - 1,
          parseInt(cranes)
        )
        stacks.unshiftMany(parseInt(to) - 1, extractedCranes)
      }
    })

  return stacks.read()
}

const day5b = (block: InputBlockE) => {
  const stacks = new StacksManager()
  let readingMode = true

  loadData(__dirname, block)
    .split('\n')
    .forEach((line: string) => {
      if (readingMode) {
        let processedLine = line
        let stackNumber = 0
        do {
          const crane = processedLine.substring(0, 3)
          processedLine = processedLine.substring(4)

          if (parseInt(crane.trim()) === 1) {
            readingMode = false
            return
          }

          stacks.push(stackNumber++, crane)
        } while (processedLine.length > 0)
      } else {
        const matched = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
        if (matched === null) return
        const [cranes, from, to] = [matched[1], matched[2], matched[3]]
        const extractedCranes = stacks.shiftMany(
          parseInt(from) - 1,
          parseInt(cranes)
        )
        stacks.unshiftMany(parseInt(to) - 1, extractedCranes.reverse())
      }
    })

  return stacks.read()
}

console.log({
  testA: day5a(InputBlockE.test),
  realA: day5a(InputBlockE.real),
  testB: day5b(InputBlockE.test),
  realB: day5b(InputBlockE.real),
})
