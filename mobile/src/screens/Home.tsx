import { Text, View } from "react-native";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

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
      <HabitDay />
    </View>
  );
}
