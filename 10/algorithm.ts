type TTick = (cycle: number, registerx: number) => void

const algorithm = (commands: string[], tick: TTick, tack: TTick) => {
  let registerx = 1
  let cycle = 0

  const instructions = commands
    .map((val) => val.split(' '))
    .reduce((acc, cur) => [...acc, ...cur])

  while (cycle <= instructions.length) {
    tick(cycle, registerx)
    registerx += parseInt(instructions[cycle - 1]) || 0
    tack(cycle, registerx)
    cycle++
  }
}

export default (data: string[]): { part1: number; part2: string[] } => {
  const hits = [20, 60, 100, 140, 180, 220]
  let signalStrength = 0
  let crt: string = ''

  algorithm(
    data,
    (cycle, registerx) => {
      hits.includes(cycle) && (signalStrength += cycle * registerx)
    },
    (cycle, registerx) => {
      const currentCRTRow = cycle % 40
      const spritePosition = registerx % 40

      crt +=
        currentCRTRow <= spritePosition + 1 &&
        currentCRTRow >= spritePosition - 1
          ? '#'
          : '.'
    }
  )

  return { part1: signalStrength, part2: crt.match(/.{40}/g) ?? [] }
}
