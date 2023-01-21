import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios";
import { generateRangeDates } from "../utils/generate-range-dates";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { DAY_SIZE, HabitDay } from "../components/HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateRangeDates();
const minSummaryDates = 18 * 5;
const daysToFill = minSummaryDates - summaryDates.length;

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);
  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');
      setSummaryData(response.data);
    } catch (error) {
      Alert.alert("Ops", "Não foi possível carregar os hábitos.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

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
            <HabitDay
              key={date.toISOString()}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}

          {daysToFill > 0 &&
            Array.from({ length: daysToFill }).map((_, i) => (
              <View
                key={i}
                className="bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
