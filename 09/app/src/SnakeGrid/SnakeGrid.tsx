import { useEffect, useState } from 'react'
import { MATRIX_HEIGHT, MATRIX_WIDTH, WEBSOCKET_URL } from '../config'
import Grid from '../Grid'
import SnakeGridCell from '../SnakeGridCell'
import { TickerData } from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [data, setData] = useState<TickerData>()

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL)
    ws.onopen = () => ws.send('ticks:50')
    ws.onmessage = (event) => setData(JSON.parse(event.data).data)
  }, [])

  return (
    <Grid rows={MATRIX_HEIGHT} columns={MATRIX_WIDTH}>
      {data &&
        Array.apply(null, Array(MATRIX_HEIGHT * MATRIX_WIDTH)).map(
          (_, index) => <SnakeGridCell key={index} index={index} data={data} />
        )}
    </Grid>
  )
}
