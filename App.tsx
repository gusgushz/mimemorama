import { colors } from './src/styles/globalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigator/ScreenProps';
//prettier-ignore
import { HomeScreen, ReactNativeClusterer, ReactNativeMapClustering, ReactNativeClusterMap, ReactNativeSuperCluster, ReactNativeMapsMarkerCluster,Pikachu, Empoleon, PokemonScreen,NewScreen } from './src/screens/index';
import { Image, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return <MyStack />;
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.text,
          statusBarBackgroundColor: colors.background,
          headerStyle: { backgroundColor: colors.background },
          headerBackImageSource: require('./src/assets/icons/backArrowBlack.png'),
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ReactNativeClusterer" component={ReactNativeClusterer} options={{ headerShown: true }} />
        <Stack.Screen
          name="ReactNativeMapClustering"
          component={ReactNativeMapClustering}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="ReactNativeClusterMap" component={ReactNativeClusterMap} options={{ headerShown: true }} />
        <Stack.Screen
          name="ReactNativeSuperCluster"
          component={ReactNativeSuperCluster}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="ReactNativeMapsMarkerCluster"
          component={ReactNativeMapsMarkerCluster}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Empoleon" component={Empoleon} options={{ headerShown: true }} />
        <Stack.Screen name="Pikachu" component={Pikachu} options={{ headerShown: true }} />
        <Stack.Screen name="Pokemon" component={PokemonScreen} options={{ headerShown: true }} />
        <Stack.Screen name="NewScreen" component={NewScreen} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
