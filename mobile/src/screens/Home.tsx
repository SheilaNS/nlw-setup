import { ScrollView, Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateRangeDates } from "../utils/generate-range-dates";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateRangeDates();
const minSummaryDates = 18 * 5;
const daysToFill = minSummaryDates - summaryDates.length;

export function Home() {
  return (
    <View className="flex-1 bg-background pt-16 px-8">
      <Header />
      <View className="flex flex-row mt-6 mb-2">
        {weekDays.map((day, i) => (
          <Text
            key={`${day}-${i}`}
            className="text-zinc-400 font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {day}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex flex-row flex-wrap">
          {summaryDates.map((date) => (
            <HabitDay key={date.toISOString()} />
          ))}
          {daysToFill > 0 &&
            Array.from({ length: daysToFill }).map((_, i) => (
              <View
                className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
