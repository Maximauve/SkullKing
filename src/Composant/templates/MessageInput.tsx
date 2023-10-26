import React, {useState} from "react"

export const MessageInput = ({send} : { send : (value: string) => void}) => {
  const [value, setValue] = useState<string>("");
  return (
    <>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type yout message..."
        value={value}
      />
      <button onClick={() => send(value)}>Send</button>
    </>
  )
}