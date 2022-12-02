import loadData from '../shared/loadData'
import { BlockT } from '../shared/types'

enum game {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

enum gameEnd {
  lose = 'lose',
  draw = 'draw',
  win = 'win',
}

const gameCodeMap: Record<string, game> = {
  A: game.rock,
  B: game.paper,
  C: game.scissors,
  X: game.rock,
  Y: game.paper,
  Z: game.scissors,
}

const gameNeedsEnd: Record<string, gameEnd> = {
  X: gameEnd.lose,
  Y: gameEnd.draw,
  Z: gameEnd.win,
}

const gameRulesWinMap: Record<keyof typeof game, game> = {
  rock: game.paper,
  paper: game.scissors,
  scissors: game.rock,
}

const gamePointsMap: Record<keyof typeof game, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
}

const getPoints = ([p1, p2]: game[]) => {
  let points = gamePointsMap[p2]

  if (gameRulesWinMap[p1] === p2) return points + 6

  if (p1 === p2) return points + 3

  return points
}

const day2a = (block: BlockT) =>
  loadData(__dirname, block)
    .split('\n')
    .map((line: string) =>
      getPoints(line.split(' ').map((p) => gameCodeMap[p]))
    )
    .reduce((acc: number, current: number) => acc + current)

const day2b = (block: BlockT) =>
  loadData(__dirname, block)
    .split('\n')
    .map((line: string) => {
      const [left, right] = line.split(' ')
      const p1 = gameCodeMap[left]
      let p2: game
      const end2 = gameNeedsEnd[right]

      if (end2 === gameEnd.draw) {
        p2 = p1
      } else if (end2 === gameEnd.win) {
        p2 = gameRulesWinMap[p1]
      } else {
        p2 = Object.entries(gameRulesWinMap)
          .map(([gameShould, gameWin]) => (gameWin === p1 ? gameShould : null))
          .join('') as game
      }

      return getPoints([p1, p2])
    })
    .reduce((a: number, b: number) => a + b)

console.log({
  testA: day2a('test'),
  realA: day2a('real'),
  testB: day2b('test'),
  realB: day2b('real'),
})
