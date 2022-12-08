type Scanner = Record<
  string,
  {
    visibility: boolean
    trees: number
  }
>

export default (data: string[][]): { part1: number; part2: number } => {
  const matrixWidth = data[0].length
  const matrixHeight = data.length

  let visibleTrees: number = 0
  let factor: number = 0

  for (let x = 0; x < matrixWidth; x++) {
    for (let y = 0; y < matrixHeight; y++) {
      const height = parseInt(data[y][x])
      const scanner: Scanner = {
        N: { visibility: true, trees: 0 },
        S: { visibility: true, trees: 0 },
        E: { visibility: true, trees: 0 },
        W: { visibility: true, trees: 0 },
      }

      const updateScanner = (cardinal: string, xo: number, yo: number) => {
        if (xo >= 0 && xo < matrixWidth && yo >= 0 && yo < matrixHeight) {
          if (scanner[cardinal].visibility) scanner[cardinal].trees++
          if (parseInt(data[yo][xo]) >= height)
            scanner[cardinal].visibility = false
        }
      }

      for (
        let offset = 1;
        offset < Math.max(matrixWidth, matrixHeight);
        offset++
      ) {
        updateScanner('W', x - offset, y)
        updateScanner('E', x + offset, y)
        updateScanner('N', x, y - offset)
        updateScanner('S', x, y + offset)
      }

      const treeFactor = Object.entries(scanner)
        .map(([_, { trees }]) => trees)
        .reduce((prev, cur) => prev * cur)
      if (treeFactor > factor) factor = treeFactor

      const visible =
        Object.entries(scanner).filter(([_, { visibility }]) => visibility)
          .length > 0
      if (visible) visibleTrees++
    }
  }

  return { part1: visibleTrees, part2: factor }
}
