import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";

interface HabitParams {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as HabitParams;

  const parsedDate = dayjs(date);
  const weekDay = parsedDate.format('dddd');
  const monthDay = parsedDate.format('DD/MM');

  return (
    <View className="flex-1 bg-background pt-16 px-8">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {weekDay}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {monthDay}
        </Text>

        <ProgressBar progress={30} />

        <View className="mt-6">
          <Checkbox title="Beber 2L de água" checked={false} />
          <Checkbox title="Dormir bem" checked={true} />
        </View>
      </ScrollView>
    </View>
  );
}
