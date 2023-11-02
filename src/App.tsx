import { useState } from "react";
import "./App.css";

import React from "react";
import KimonoList from "./components/KimonoList";
import KimonoDetails from "./components/KimonoDetails";

function App() {
  const [currentKimono, setCurrentKimono] = useState(null);

  const onKimonoClick = (kimono) => {
    setCurrentKimono(kimono);
  };

  return (
    <div>
      <KimonoList onKimonoClick={onKimonoClick} />
      {currentKimono && <KimonoDetails kimono={currentKimono} />}
    </div>
  );
}

export default App;
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div className="App">
//       <div>
//         <a href="https://reactjs.org" target="_blank" rel="noreferrer">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//         <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//       </div>
//       <h1>React + Vite</h1>
//       <h2>On CodeSandbox!</h2>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR.
//         </p>

//         <p>
//           Tip: you can use the inspector button next to address bar to click on
//           components in the preview and open the code in the editor!
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   );
// }

// export default App;
