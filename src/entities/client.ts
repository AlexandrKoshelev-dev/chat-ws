import { WebSocket } from "ws"
import { v4 as uuid } from "uuid"

export class Client {
  uuid: string
  ws: WebSocket
  name: string

  constructor(ws: WebSocket) {
    this.uuid = uuid()
    this.ws = ws
    this.name = "noname"
  }

  sendSelf(msg: string) {
    this.ws.send(msg)
  }

  setName(name: string) {
    this.name = name
  }
}
