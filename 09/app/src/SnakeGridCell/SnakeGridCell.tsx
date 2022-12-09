import { MATRIX_HEIGHT, MATRIX_WIDTH } from '../config'
import type { TickerData } from '../types'
import { SnakeGridCellContainer } from './SnakeGridCell.styles'

interface IProps {
  index: number
  data: TickerData
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ index, data }: IProps) => {
  if (!data) return <div />

  const y = Math.floor(index / MATRIX_WIDTH) - MATRIX_HEIGHT / 2
  const x = (index % MATRIX_WIDTH) - MATRIX_WIDTH / 2
  const styles: Record<string, string> = {}
  let content = ''

  let isSnake = false
  if (data.snake[0].x === x && data.snake[0].y === y) {
    // HEAD
    styles.backgroundColor = 'red'
    isSnake = true
  } else if (
    data.snake[data.snake.length - 1].x === x &&
    data.snake[data.snake.length - 1].y === y
  ) {
    // TAIL
    styles.backgroundColor = 'green'
    isSnake = true
  } else
    for (let i = 1; i < data.snake.length - 1 && !isSnake; i++) {
      if (data.snake[i].x === x && data.snake[i].y === y) {
        // BODY
        styles.backgroundColor = 'yellow'
        content = i.toString()
        isSnake = true
      }
    }
  if (!isSnake) {
    if (
      data.trail.filter((value) => value.x === x && value.y === y).length > 0
    ) {
      // TRAIL
      styles.backgroundColor = '#ccc'
    } else if (x === 0 && y === 0) {
      // START
      styles.backgroundColor = '#000'
      content = 'S'
    }
  }

  return (
    <SnakeGridCellContainer title={`X=${x} | Y=${y}`} style={styles}>
      {content}
    </SnakeGridCellContainer>
  )
}
