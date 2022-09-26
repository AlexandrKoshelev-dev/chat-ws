import { Client } from "entities/client"
import WebSocket from "ws"

export class ServerServices {
  private server: WebSocket.Server<WebSocket.WebSocket>
  clients: Client[] = []

  constructor(server: WebSocket.Server<WebSocket.WebSocket>) {
    this.server = server
  }

  getOnline(): number {
    return this.clients.length
  }

  sendAll(msg: string) {
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(msg)
    })
  }

  getOneByWs(ws: WebSocket): Client {
    return this.clients.filter((c) => c.ws === ws)[0]
  }
  //   personalSend(sender:, rec)
}
