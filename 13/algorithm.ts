type TANumber = number | (number | number[] | number[][])[]

type TInput = {
  left: TANumber
  right: TANumber
}[]

const taNumberToString = (ta: TANumber): string => {
  if (Number.isInteger(ta)) return ta.toString()

  return (
    '[' +
    (ta as number[]).map((el: TANumber) => taNumberToString(el)).join(',') +
    ']'
  )
}

const parse = (data: string): TInput =>
  data
    .split('\n\n')
    .map((line) =>
      line
        .split('\n')
        .map((line) => (line.trim().length > 0 ? JSON.parse(line) : null))
    )
    .map(([left, right]) => {
      return { left, right }
    })

const fight = (
  left: TANumber,
  right: TANumber,
  level: number = 0
): boolean | undefined => {
  /*
  console.log(
    '#'.padEnd(level + 1, '#') +
      ' > ' +
      taNumberToString(left) +
      ' VS ' +
      taNumberToString(right)
  )
  */

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      if (i >= left.length) return true
      if (i >= right.length) return false

      const result = fight(left[i], right[i], level + 1)
      if (result !== undefined) return result
    }
  } else if (Number.isInteger(left) && Number.isInteger(right)) {
    if (left < right) {
      return true
    } else if (left > right) {
      return false
    }
  } else if (Array.isArray(left) && Number.isInteger(right)) {
    return fight(left, [right as number], level + 1)
  } else if (Array.isArray(right) && Number.isInteger(left)) {
    return fight([left as number], right, level + 1)
  }
  return undefined
}

export default (data: string): { part1: number; part2: number } => {
  const results = parse(data).map(({ left, right }) => fight(left, right))

  return {
    part1: results
      .map((value, index) => (value ? index + 1 : null))
      .filter((val) => !!val)
      .reduce((a, b) => (a as number) + (b as number)) as number,
    part2: 0,
  }
}
