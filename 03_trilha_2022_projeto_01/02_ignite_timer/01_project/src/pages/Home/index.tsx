// React
import { useContext } from "react";
// Hook
import { useForm, FormProvider } from "react-hook-form";
// Context
import { CyclesContext } from "../../contexts/CyclesContext";
// Icons
import { HandPalm, Play } from "phosphor-react";
// Zod
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
// Components
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
// Styles
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

// Interface criada automaticamente atraves do dados retirados do zod.
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
// Interface criada automaticamente atraves do dados retirados do zod.

// Validação do formulário
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});
// Validação do formulário

export function Home() {
  const { createNewCycle, activeCycle, interruptedCurrentCycle } =
    useContext(CyclesContext);

  // Definições do React Hook Form
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  // Desestruturação do useForm
  const { handleSubmit, watch, reset } = newCycleForm;
  // Desestruturação do useForm

  const task = watch("task" && "minutesAmount");
  // Definições do React Hook Form

  // Desabilitar o botão de submit
  const isButtonSubmitDisabled = !task;
  // Desabilitar o botão de submit

  // Função para chamar o CreateNewCycle e resetar pelo React Hook Form
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }
  // Função para chamar o CreateNewCycle e resetar pelo React Hook Form

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptedCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isButtonSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
