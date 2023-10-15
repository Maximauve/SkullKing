import { CardType } from "../CardType";

export function Beats(card1: CardType, card2: CardType): boolean {
  return card1.superior_to.includes(card2)
}