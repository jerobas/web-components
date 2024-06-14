import { io, Socket } from 'socket.io-client'

class SocketService {
  private socket: Socket | null = null

  public connect(): void {
    this.socket = io(process.env.SOCKET_URL || 'http://localhost:3000')
    
    this.socket.on('connect', () => {
      console.log('Connected to server')
    })

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server')
    })
  }

  public sendMessage(message: string): void {
    if (this.socket) {
      this.socket.emit('message', message)
    }
  }

  public onMessage(callback: (message: string) => void): void {
    if (this.socket) {
      this.socket.on('message', callback)
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketService()
