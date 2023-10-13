import { CardType } from "./CardType";

export interface Card {
  id: number,
  type: CardType,
  value?: number,
}