import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function HabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {}

    api.post('/habits', {
      title,
      weekDays
    }).then(() => {
      setTitle('');
      setWeekDays([]);
      alert("Hábito criado com sucesso!");
    });
  }

  function handleDayCheck(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const filteredHabitDays = weekDays.filter((day) => day !== weekDay);
      setWeekDays(filteredHabitDays);
    } else {
      const habitDays = [...weekDays, weekDay];
      setWeekDays(habitDays);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        name=""
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      <div className="mt-3 flex flex-col gap-2">
        {availableDays.map((day, i) => (
          <Checkbox.Root
            className="flex items-center gap-3 group"
            key={`${day}-${i}`}
            onCheckedChange={() => handleDayCheck(i)}
            checked={weekDays.includes(i)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="text-white leading-tight">{day}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500 transition-colors"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
