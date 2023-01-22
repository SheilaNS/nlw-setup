import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgress } from "../utils/generate-progress-percentage";
import { HabitsEmpty } from "../components/HabitsEmpty";

interface HabitParams {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const route = useRoute();
  const { date } = route.params as HabitParams;

  const parsedDate = dayjs(date);
  const weekDay = parsedDate.format("dddd");
  const monthDay = parsedDate.format("DD/MM");

  const dayProgress = dayInfo?.possibleHabits?.length
    ? generateProgress(dayInfo.possibleHabits.length, completedHabits.length)
    : 0;

  async function fetchHabits() {
    try {
      setLoading(true);
      const response = await api.get("/day", {
        params: { date },
      });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits ?? []);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops", "Não foi possível carregar os hábitos");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle(habitId: string) {
    // await api.patch(`/habits/${habitId}/toggle`);

    if (completedHabits?.includes(habitId)) {
      setCompletedHabits((prevState) =>
        prevState.filter((id) => id !== habitId)
      );
    } else {
      setCompletedHabits((prevState) => [...prevState, habitId]);
    }
  }

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) return <Loading />;

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
        <Text className="text-white font-extrabold text-3xl">{monthDay}</Text>

        <ProgressBar progress={dayProgress} />

        <View className="mt-6">
          {dayInfo?.possibleHabits ? (
            dayInfo.possibleHabits?.map((habit) => (
              <Checkbox
                key={habit.id}
                title={habit.title}
                checked={completedHabits.includes(habit.id)}
                onPress={() => handleToggle(habit.id)}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
