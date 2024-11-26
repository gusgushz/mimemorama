import { SafeAreaView, StatusBar, Text, useColorScheme, View, ScrollView } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';
import { HomeProps, RootStackParamList } from '../navigator/ScreenProps';
import { Card } from '../components/index';

export default function HomeScreen({ navigation }: HomeProps) {
  const isDarkMode = useColorScheme() === 'light';
  const navigationList = [
    'ReactNativeClusterer',
    'ReactNativeMapClustering',
    'ReactNativeClusterMap',
    'ReactNativeSuperCluster',
    'ReactNativeMapsMarkerCluster',
    // 'Empoleon',
    // 'Pikachu',
    // 'Pokemon',
    'NewScreen',
  ];

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
        <ScrollView
          scrollEnabled={true}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ backgroundColor: colors.background, gap: 12 }}>
          <Text style={{ color: colors.text }}>Hola</Text>
          {navigationList.map((item, index) => (
            <Card key={index} onPress={() => navigation.navigate(item as keyof RootStackParamList)} title={item}></Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
