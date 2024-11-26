import type { NativeStackScreenProps } from '@react-navigation/native-stack';
export type RootStackParamList = {
  Home: {} | undefined;
  ReactNativeClusterer: {} | undefined;
  ReactNativeMapClustering: {} | undefined;
  ReactNativeClusterMap: {} | undefined;
  ReactNativeSuperCluster: {} | undefined;
  ReactNativeMapsMarkerCluster: {} | undefined;
  Pikachu: {} | undefined;
  Empoleon: {} | undefined;
  Pokemon: {} | undefined;
  NewScreen: {} | undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ReactNativeClustererProps = NativeStackScreenProps<RootStackParamList, 'ReactNativeClusterer'>;
export type ReactNativeMapClusteringProps = NativeStackScreenProps<RootStackParamList, 'ReactNativeMapClustering'>;
export type ReactNativeClusterMapProps = NativeStackScreenProps<RootStackParamList, 'ReactNativeClusterMap'>;
export type ReactNativeSuperClusterProps = NativeStackScreenProps<RootStackParamList, 'ReactNativeSuperCluster'>;
export type ReactNativeMapsMarkerClusterProps = NativeStackScreenProps<
  RootStackParamList,
  'ReactNativeMapsMarkerCluster'
>;
export type PikachuProps = NativeStackScreenProps<RootStackParamList, 'Pikachu'>;
export type EmpoleonProps = NativeStackScreenProps<RootStackParamList, 'Empoleon'>;
export type PokemonProps = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;
export type NewPageProps = NativeStackScreenProps<RootStackParamList, 'NewScreen'>;
