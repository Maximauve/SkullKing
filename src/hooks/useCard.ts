import { useContext } from "react"
import { CardContext } from "../contexts/CardProvider"
import { CardActionType } from "../contexts/cardReducer";
import { Card } from "../types/Card";
import api from "../config/api";

const useCards = () => {
  const [, dispatch] = useContext(CardContext);

  const getDeck = async () => {
    dispatch({ type: CardActionType.SET_LOADING, payload: true })

    const cards: Card[] = await api.getCards();
    dispatch({ type: CardActionType.INIT_CARDS, payload: cards })
  }

  return {
    getDeck,
  }
}

export default useCards;