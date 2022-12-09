// React
import { useContext, useEffect, useState } from "react";
// Context
import { CyclesContext } from "../../../../contexts/CyclesContext";
// Date Fns
import { differenceInSeconds } from "date-fns";
// Styles
import { CountdownContainer, CounterSeparator } from "./styles";

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  // Hook criado para decrementar a contagem de tempo em 1 segundo
  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, markCurrentCycleAsFinished]);
  // Hook criado para decrementar a contagem de tempo em 1 segundo

  // Transformando o ciclo para mostrar em tela
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");
  // Transformando o ciclo para mostrar em tela

  // Hook criado para mostrar o tempo no título da aba do browser
  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);
  // Hook criado para mostrar o tempo no título da aba do browser

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <CounterSeparator>:</CounterSeparator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
