import { PropsWithChildren, useContext, useEffect } from "react"
import { CardContext } from "../../contexts/CardProvider";
import useCards from "../../hooks/useCard";

interface DeckProps {

}

export const Deck: React.FC<PropsWithChildren<DeckProps>> = ({ children }) => {

  const [state] = useContext(CardContext);

  console.log(state);
  return (
    <div>
      <p>coucou</p>
      {children}
    </div>
  )

}