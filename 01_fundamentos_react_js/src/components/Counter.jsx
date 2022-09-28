import { useState } from "react";

// Conceito de Imutabilidade

// JavaScript 
// usuários = ["julian", "lucas", "josé"]
// usuários.push("ramon")

// React (performar desta maneira!)
// usuários = ["julian", "lucas", "josé"]
// novoUsuário = [...usuários, "ramon"]

export function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <div>
      <p>{counter}</p>
      <button type="button" onClick={increment}>
        Increment + 1
      </button>
    </div>
  );
}
