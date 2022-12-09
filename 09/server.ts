import express, { Express, Request, Response } from 'express'
import path from 'path'
import loadData from '../shared/loadData'
import { InputBlockE } from '../shared/types'
import { algorithmServer } from './algorithm'
import WebSocket from 'ws'

const app: Express = express()
const port = process.env.PORT || 3333
const ROOT_DIRECTORY = './app/build'

const data = loadData(__dirname, InputBlockE.real).split('\n')

const { tick } = algorithmServer(data)

app.use(express.static(path.resolve(__dirname, ROOT_DIRECTORY)))

const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

process.on('message', (message) => {
  console.log(`⚡️[message]: ${message}`)
})

const websocketServer = new WebSocket.Server({
  noServer: true,
  path: '/websockets',
})

server.on('upgrade', (request, socket, head) => {
  websocketServer.handleUpgrade(request, socket, head, (websocket) => {
    websocketServer.emit('connection', websocket, request)
  })
})

websocketServer.on('connection', (websocketConnection, connectionRequest) => {
  const [_path, params] = connectionRequest?.url?.split('?') as string[]
  websocketConnection.on('message', (message) => {
    const [channel, interval] = message.toString().split(':')

    switch (channel) {
      case 'ticks':
        const INTERVAL = setInterval(
          () => {
            const data = tick()
            websocketConnection.send(JSON.stringify({ data }))
            if (data.finished) clearInterval(INTERVAL)
          },
          interval ? parseInt(interval) : 500
        )
        break
    }
  })
})
