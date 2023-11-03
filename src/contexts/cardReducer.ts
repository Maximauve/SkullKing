import { type Action } from 'types/Action';
import { type Card } from 'types/Card';

export enum CardActionType {
  INIT_CARDS = 'INIT_CARDS',
  SET_LOADING = 'SET_LOADING',
  SHUFFLE = 'SHUFFLE',
}

export interface CardState {
  cards: Card[]
  loading: boolean
}

export const initialCardState: CardState = {
  cards: [],
  loading: true
};

export const CardReducer = (state: CardState, action: Action<CardActionType>): CardState => {
  switch (action.type) {
    case CardActionType.INIT_CARDS:
      return {
        ...state,
        cards: action.payload as Card[],
        loading: false
      };
    case CardActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean
      };
    case CardActionType.SHUFFLE:
      return {
        ...state,
        cards: action.payload as Card[],
        loading: true
      };
  }
};
