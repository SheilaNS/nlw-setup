import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitListProps {
  date: Date,
  completedToggle: (total: number) => void
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
  completedHabits: string[];
}

export function HabitList({ date, completedToggle }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();
  const pastDay = dayjs(date).endOf('day').isBefore(new Date());

  useEffect(() => {
    api
      .get("/day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  async function handleToggle(habitId: string) {
    await api.patch(`/habits/${habitId}/toggle`);

    const isCompleted = habitsInfo!.completedHabits.includes(habitId);
    let completedList: string[] = [];

    if (isCompleted) {
      completedList = habitsInfo!.completedHabits.filter((id) => id !== habitId);
    } else {
      completedList = [...habitsInfo!.completedHabits, habitId];
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits: completedList
    });
    completedToggle(completedList.length);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            className="flex items-center gap-3 group"
            key={habit.id}
            disabled={pastDay}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            onCheckedChange={() => handleToggle(habit.id)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
