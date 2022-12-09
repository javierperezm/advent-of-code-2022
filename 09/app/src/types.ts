export type Position = {
  x: number
  y: number
}

export type TickerData = {
  snake: Position[]
  trail: Position[]
  finished: boolean
}
