class Monkey {
  public inspections: number = 0
  public items: number[] = []
  public operatorFrom: string = '?'
  public operatorTo: string = '?'
  public testDivisible: number = 0
  public testRules: Record<string, number> = {}
}

type TWorryReducerFunc = (worry: number, module: number) => number

const algorithm = (
  data: string[],
  rounds: number,
  worryReducer: TWorryReducerFunc
): number => {
  const monkeys: Monkey[] = []

  data.forEach((line: string) => {
    const monkeyNumber = (line.match(/^Monkey ([0-9]*):/) ?? [])[1]
    if (monkeyNumber !== undefined) {
      monkeys.push(new Monkey())
      return
    }

    const items = (line.match(/Starting items: ([0-9, ]*)/) ?? [])[1]
    if (items !== undefined) {
      const monkey = monkeys[monkeys.length - 1]
      monkey.items = items.split(', ').map((n) => parseInt(n))
      return
    }

    const operation = (line.match(/Operation: new = old (.*)/) ?? [])[1]
    if (operation !== undefined) {
      const monkey = monkeys[monkeys.length - 1]
      const [op, num] = operation.split(' ')
      monkey.operatorFrom = op
      monkey.operatorTo = num
      return
    }

    const testDivisible = (line.match(/Test: divisible by ([0-9]*)/) ?? [])[1]
    if (testDivisible !== undefined) {
      const monkey = monkeys[monkeys.length - 1]
      monkey.testDivisible = parseInt(testDivisible)
      return
    }

    const [testRuleIf, testRuleMonkey] = (
      line.match(/If (true|false): throw to monkey ([0-9]*)/) ?? []
    ).slice(1, 3)
    if (testRuleIf !== undefined) {
      const monkey = monkeys[monkeys.length - 1]
      monkey.testRules[testRuleIf] = parseInt(testRuleMonkey)
      return
    }
  })

  const module = [
    ...new Set(monkeys.map((monkey) => monkey.testDivisible)),
  ].reduce((acc, cur) => acc * cur, 1)

  let round = 0
  while (round++ < rounds) {
    monkeys.forEach((monkey) => {
      while (monkey.items.length > 0) {
        monkey.inspections++

        const inspect = monkey.items.shift() as number
        const operator =
          monkey.operatorTo === 'old' ? inspect : parseInt(monkey.operatorTo)
        const worry =
          monkey.operatorFrom === '+' ? inspect + operator : inspect * operator
        const worryLevel = worryReducer(worry, module)
        const ruleToMonkey =
          worryLevel % monkey.testDivisible === 0
            ? monkey.testRules.true
            : monkey.testRules.false

        monkeys[ruleToMonkey].items.push(worryLevel)
      }
    })
  }

  return monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, cur) => acc * cur, 1)
}

export default (data: string[]): { part1: number; part2: number } => ({
  part1: algorithm(data, 20, (worry) => Math.floor(worry / 3)),
  part2: algorithm(data, 10000, (worry, module) => worry % module),
})
