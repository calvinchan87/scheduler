import React, { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);

  const transition = newMode => setMode(newMode);

  return { mode, transition };
}

// export default function useVisualMode(startingMode) {

//   const transition = newMode => setState({ mode: newMode });

//   const [state, setState] = useState({
//     mode: startingMode,
//     transition
//   });

//   return state;

// }