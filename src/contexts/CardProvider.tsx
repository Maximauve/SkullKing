import React, { type Dispatch, type PropsWithChildren, createContext, useReducer } from 'react';
import { type CardActionType, CardReducer, type CardState, initialCardState } from './cardReducer';
import { type Action } from 'types/Action';

export const CardContext = createContext<[CardState, Dispatch<Action<CardActionType>>]>([
  initialCardState,
  () => null
]);

const CardProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(CardReducer, initialCardState);

  return (
    <CardContext.Provider value={[state, dispatch]}>
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;
