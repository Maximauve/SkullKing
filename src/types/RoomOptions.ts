export interface RoomOptions {
  maxPlayers: number
  password?: string
  host: {
    userId: string
    username: string
    socketId: string | null
  }
}
