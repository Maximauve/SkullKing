import { Card } from "../types/Card";
import FullCards from "../script/cardsScript"

const baseUrl = process.env.REACT_APP_API_BASE_URL;


const api = {

  getCards: async (): Promise<Card[]> => {
    // const response = await fetch(`${baseUrl}/cards`);
    // console.log(`fetching cards from ${baseUrl}/cards`);
    // console.log(response);

    // return response.json();
    return FullCards;
  }

}

export default api;