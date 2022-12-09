type Position = {
  x: number
  y: number
}

const createSnake = (knots: number) => {
  const snake: Position[] = []
  for (let k = 1; k <= knots; k++) snake.push({ x: 0, y: 0 })

  const trail: string[] = []

  const addPosition = (pos: Position) => {
    const key = `${pos.x}:${pos.y}`
    if (!trail.includes(key)) trail.push(key)
  }

  const move = (
    dir: string,
    steps: number,
    onMovement: ((snake: Position[]) => void) | undefined = undefined
  ) => {
    for (let i = 1; i <= steps; i++) {
      // move head
      switch (dir) {
        case 'R':
          snake[0].x++
          break
        case 'L':
          snake[0].x--
          break
        case 'U':
          snake[0].y++
          break
        case 'D':
          snake[0].y--
          break
      }

      // move tail
      for (let k = 1; k < knots; k++) {
        if (
          Math.abs(snake[k].x - snake[k - 1].x) > 1 ||
          Math.abs(snake[k].y - snake[k - 1].y) > 1
        ) {
          if (snake[k].x === snake[k - 1].x) {
            if (snake[k].y > snake[k - 1].y) {
              snake[k].y--
            } else if (snake[k].y < snake[k - 1].y) {
              snake[k].y++
            }
          } else if (snake[k].y === snake[k - 1].y) {
            if (snake[k].x > snake[k - 1].x) {
              snake[k].x--
            } else if (snake[k].x < snake[k - 1].x) {
              snake[k].x++
            }
          } else {
            if (snake[k].y > snake[k - 1].y) {
              snake[k].y--
            } else if (snake[k].y < snake[k - 1].y) {
              snake[k].y++
            }
            if (snake[k].x > snake[k - 1].x) {
              snake[k].x--
            } else if (snake[k].x < snake[k - 1].x) {
              snake[k].x++
            }
          }
        }
      }

      addPosition(snake[knots - 1])
      onMovement && onMovement(snake.map((positions) => ({ ...positions }))) // send clone
    }
  }

  return {
    trail,
    move,
  }
}

export default (data: string[]): { part1: number; part2: number } => {
  const snake2 = createSnake(2)
  const snake10 = createSnake(10)

  data.forEach(([dir, stepsStr]) => {
    const steps = parseInt(stepsStr)

    snake2.move(dir, steps)
    snake10.move(dir, steps)
  })

  return { part1: snake2.trail.length, part2: snake10.trail.length }
}

interface IAlgorithmServer {
  tick: () => {
    snake: Position[]
    trail: Position[]
    finished: boolean
  }
}
export const algorithmServer = (data: string[]): IAlgorithmServer => {
  let finished: boolean = false
  const snake = createSnake(10)

  let dataPointer = 0
  const ticksBuffer: Position[][] = []

  const tick = () => {
    if (ticksBuffer.length === 0) {
      const [dir, stepsStr] = data[dataPointer++].split(' ')
      snake.move(dir, parseInt(stepsStr), (knots) => ticksBuffer.push(knots))
      if (dataPointer === data.length - 1) finished = true
    }

    return {
      snake: ticksBuffer.shift() as Position[],
      trail: snake.trail.map((key: string) => {
        const [x, y] = key.split(':')
        return { x: parseInt(x), y: parseInt(y) }
      }),
      finished,
    }
  }

  return { tick }
}
