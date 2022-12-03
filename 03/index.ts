import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'

const getCharValue = (char: string): number => {
  const a = 'a'.charCodeAt(0) - 1
  const A = 'A'.charCodeAt(0) - 1

  return char.match(/[a-z]{1}/)
    ? char.charCodeAt(0) - a
    : char.charCodeAt(0) - A + 26
}

const day3a = (block: InputBlockE) =>
  loadData(__dirname, block)
    .split('\n')
    .map((line: string) => {
      const comparedTo = line.substring(line.length / 2).split('')

      const intersection = line
        .substring(0, line.length / 2)
        .split('')
        .filter((letter: string) => comparedTo.includes(letter))[0]

      return getCharValue(intersection)
    })
    .reduce((a: number, b: number) => a + b)

const day3b = (block: InputBlockE) => {
  let previousLine: string[] | null = null
  let processedLines = 0
  const groupResults: number[] = []
  const GROUP_SIZE = 3

  loadData(__dirname, block)
    .split('\n')
    .map((line: string) => line.split(''))
    .forEach((line: string[]) => {
      if (previousLine !== null) {
        previousLine = line.filter((letter: string) =>
          previousLine?.includes(letter)
        )
      } else {
        previousLine = line
      }

      processedLines++
      if (processedLines === GROUP_SIZE) {
        groupResults.push(getCharValue(previousLine[0]))
        processedLines = 0
        previousLine = null
      }
    })

  return groupResults.reduce((a: number, b: number) => a + b)
}

console.log({
  testA: day3a(InputBlockE.test),
  realA: day3a(InputBlockE.real),
  testB: day3b(InputBlockE.test),
  realB: day3b(InputBlockE.real),
})
