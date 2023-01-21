import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateRangeDates } from "../utils/generate-range-dates";
import { HabitDay } from "./HabitDay";

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]; // Dias da semana
const summaryDates = generateRangeDates(); // Gera um array de datas desde o início do ano
const minSummaryDates = 18 * 7; // Quantidade mínima de quadrados
const daysToFill = minSummaryDates - summaryDates.length; // Quadrados necessários para completar a tela

export function SummaryTable() {
  const [summaryData, setSummaryData] = useState<Summary>([]);

  useEffect(() => {
    api.get('summary').then((response) => {
      setSummaryData(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const summaryDay = summaryData.find((day) => dayjs(date).isSame(day.date, 'day'));

          return (
          <HabitDay
            key={date.toString()}
            date={date}
            amount={summaryDay?.amount}
            completed={summaryDay?.completed}
          />
        )})}
        {daysToFill > 0 &&
          Array.from({ length: daysToFill }).map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            ></div>
          ))}
      </div>
    </div>
  );
}
