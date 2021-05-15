import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    if (replace) {
      let newHistory = history.slice(0, -1);
      newHistory.push(newMode);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    } else {
      history.push(newMode);
      setMode(newMode);
    }
  }

  const back = function() {
    if (history.length >= 2) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
}

// export default function useVisualMode(startingMode) {

//   const transition = newMode => setState({ mode: newMode });

//   const [state, setState] = useState({
//     mode: startingMode,
//     transition
//   });

//   return state;

// }