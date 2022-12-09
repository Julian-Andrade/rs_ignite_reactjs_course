// React
import { createContext, useEffect, useReducer, useState } from "react";
// Reducers
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
// Reducers - Actions
import {
  createNewCycleAction,
  interruptedCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
// Date-Fns
import { differenceInSeconds } from "date-fns";

// Interface - Context
interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptedCurrentCycle: () => void;
}
// Interface - Context

// Interface - CreateNewCycle
interface CreateCycleData {
  task: string;
  minutesAmount: number;
}
// Interface - CreateNewCycle

// Interface - CyclesContextProvider
interface CyclesContextProviderProps {
  children: React.ReactNode;
}
// Interface - CyclesContextProvider

// Contexto criado para os components NewCycleForm e Countdown terem acesso as informações
export const CyclesContext = createContext({} as CyclesContextType);
// Contexto criado para os components NewCycleForm e Countdown terem acesso as informações

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // States
  // const [cycles, setCycles] = useState<Cycle[]>([]);
  // const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  // Reducer
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    }
  );

  const { cycles, activeCycleId } = cyclesState;
  // Encontra os ciclos que estão ativos
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  // Encontra os ciclos que estão ativos

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  // Salvar os dados no storage do browser
  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);
  // Salvar os dados no storage do browser

  // Função para modificar a quantidade de segundos que se passaram (Utilizado no context)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  // Função para modificar a quantidade de segundos que se passaram (Utilizado no context)

  // Função para criar um novo ciclo de tarefa
  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    // Com o useReducer

    dispatch(createNewCycleAction(newCycle));

    // Sem o useReducer

    // setCycles((state) => [...state, newCycle]);

    // setActiveCycleId(id);

    setAmountSecondsPassed(0);
  }
  // Função para criar um novo ciclo de tarefa

  // Função para interromper o ciclo de tarefa ativo
  function interruptedCurrentCycle() {
    // Com o useReducer

    dispatch(interruptedCurrentCycleAction());

    // Sem o useReducer

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );

    // setActiveCycleId(null);
  }
  // Função para interromper o ciclo de tarefa ativo

  // Função para marcar o cyclo atual como finalizado (Utilizado no context)
  function markCurrentCycleAsFinished() {
    // Com o useReducer

    dispatch(markCurrentCycleAsFinishedAction());

    // Sem o useReducer

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishDate: new Date() };
    //     } else {
    //       return cycle;
    //     }
    //   })
    // );
  }
  // Função para marcar o cyclo atual como finalizado (Utilizado no context)

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptedCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
