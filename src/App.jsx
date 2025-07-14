// import { useState } from 'react'

import { useState } from "react";
import InputSection from "./components/InputSection";
import PlayingMatrix from "./components/PlayingMatrix";

// import "./App.css";

function App() {
  // const [startGameFlag, setStartGameFlag] = useState(false);
  const [startGameClicked, setStartGameClicked] = useState(false);
  const [winner, setWinner] = useState(null);
  const [names, setNames] = useState([]);

  return (
    <>
      <InputSection
        setStartGameClicked={setStartGameClicked}
        startGameClicked={startGameClicked}
        setNames={setNames}
      />
      {startGameClicked && (
        <PlayingMatrix names={names} setWinner={setWinner} />
      )}
    </>
  );
}

export default App;
