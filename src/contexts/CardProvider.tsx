import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import { CardActionType, CardReducer, CardState, initialCardState } from "./cardReducer";
import { Action } from "../types/Action";

export const CardContext = createContext<[CardState, Dispatch<Action<CardActionType>>]>([
  initialCardState,
  () => null,
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