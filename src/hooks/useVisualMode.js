import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory([...history, newMode]);

    if (replace) {
      history[history.length - 1] = newMode;
      setHistory(history);
    }

  }

  function back() {
    const newArray = [...history];
    if (newArray.length > 1) {
      newArray.pop();
    }
    setHistory(newArray) 
    setMode(newArray[newArray.length-1])
  }


  return { mode, transition, back };
}

// From lecture, safer?? (personal reference)
// setHistory(prev -> {
//   return [...prev, newMode];
// });

// Don't need to set mode, use this?
// const mode = history[history.length - 1] 
// or
// return new array with last item 
// const mode = history.slice(-1)[0]
