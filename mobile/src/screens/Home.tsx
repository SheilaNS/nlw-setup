import { View } from 'react-native';
import { Header } from '../components/Header';

export function Home() {
  return (
    <View className="flex-1 bg-background pt-16 px-8">
      <Header />
    </View>
  );
}
