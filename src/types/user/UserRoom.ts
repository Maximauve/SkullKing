export interface UserRoom {
  userId: string
  username: string
  socketId: string | null
  points: number
  isHost: boolean
}
