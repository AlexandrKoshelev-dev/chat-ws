import WebSocket from "ws"
import "dotenv/config"
import { Client } from "./entities/client"
import { ServerServices } from "services/server.services"

const server = new WebSocket.Server({ port: Number(process.env.PORT) }, () => {
  console.log(`### Server started on port ${process.env.PORT}`)
})
const services = new ServerServices(server)

// const clients: Client[] = []

server.on("connection", (ws) => {
  services.clients.push(new Client(ws))

  services.sendAll(` ONLINE_${services.clients.length}`)
  ws.on("message", (msg) => {
    const text = msg.toString("utf-8")
    switch (text.split(" ")[0]) {
      case "/info": {
        const client = services.getOneByWs(ws)
        client.sendSelf(client.uuid)
        break
      }
      case "/exit":
        ws.close()
        break
      case "/name": {
        const client = services.getOneByWs(ws)
        client.setName(text.split(" ")[1])
        break
      }
      default: {
        const sender = services.getOneByWs(ws)
        services.sendAll(`${sender.name}: ` + msg)
        break
      }
    }
  })

  ws.on("close", () => {
    const client = services.getOneByWs(ws)

    services.clients = services.clients.filter((c) => c.ws !== ws)
    services.sendAll(` ONLINE_${services.clients.length}`)
  })

  ws.send("Welcome on this server!")
})
