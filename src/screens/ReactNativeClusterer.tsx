import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { View, Text, ImageBackground, Image, Dimensions } from 'react-native';
import { Clusterer } from 'react-native-clusterer';
import Supercluster from 'react-native-clusterer/lib/typescript/types';
import MapView, { Marker, Callout, MapMarker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const initialRegion = {
  latitude: 20.967584,
  longitude: -89.624062,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

export default function ReactNativeClusterer() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState(initialRegion);
  const markers = useMemo(() => generateRandomMarkers(9999), []);
  const handleRegionChangeComplete = (newRegion: typeof initialRegion) => {
    if (
      Math.abs(newRegion.latitude - region.latitude) > 0.001 ||
      Math.abs(newRegion.longitude - region.longitude) > 0.001
    ) {
      setRegion(newRegion);
    }
  };

  // function generateRandomMarkers(quantity: number) {
  //   const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
  //   return new Array(quantity).fill(null).map((_, i) => ({
  //     type: 'Feature',
  //     geometry: {
  //       type: 'Point',
  //       coordinates: [
  //         longitude + (Math.random() - 0.5) * longitudeDelta,
  //         latitude + (Math.random() - 0.5) * latitudeDelta,
  //       ],
  //     },
  //     properties: {},
  //   }));
  // }
  // function generateRandomMarkers(quantity: number) {
  //   return new Array(quantity).fill(null).map((_, i) => {
  //     // Genera una latitud entre -90 y 90
  //     const markerLatitude = -90 + Math.random() * 180;

  //     // Genera una longitud entre -180 y 180
  //     const markerLongitude = -180 + Math.random() * 360;

  //     // Redondea a 5 decimales
  //     const roundedLatitude = parseFloat(markerLatitude.toFixed(6));
  //     const roundedLongitude = parseFloat(markerLongitude.toFixed(6));

  //     return {
  //       type: 'Feature',
  //       geometry: {
  //         type: 'Point',
  //         coordinates: [roundedLongitude, roundedLatitude],
  //       },
  //       properties: {},
  //     };
  //   });
  // }
  function generateRandomMarkers(quantity: number) {
    return new Array(quantity).fill(null).map((_, i) => {
      // Genera una latitud entre 24.396308 y 49.384358
      const markerLatitude = 24.396308 + Math.random();

      // Genera una longitud entre -125.0 y -66.93457
      const markerLongitude = -100.0 + Math.random();

      // Redondea a 5 decimales
      const roundedLatitude = parseFloat(markerLatitude.toFixed(6));
      const roundedLongitude = parseFloat(markerLongitude.toFixed(6));

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [roundedLongitude, roundedLatitude],
        },
        properties: {},
      };
    });
  }

  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      initialRegion={initialRegion}
      onRegionChangeComplete={handleRegionChangeComplete}>
      <Clusterer
        data={markers as Supercluster.PointFeature<Supercluster.AnyProps>[]}
        region={region}
        options={{ radius: 50, extent: 1024, minPoints: 10, maxZoom: 15, minZoom: 4 }}
        mapDimensions={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        renderItem={
          //if(region.)

          (item, id) => <MarkerComponent item={item} key={id} />

          // (item, id) => {
          //   // Verifica si el marcador es un clúster o un marcador individual
          //   const isCluster = item.properties.cluster;
          //   const uniqueKey = `marker-individual-${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`;

          //   return isCluster ? (
          //     // Renderiza el clúster
          //     <Marker
          //       key={item.properties.cluster_id}
          //       style={{ width: 40, height: 40 }}
          //       coordinate={{
          //         latitude: item.geometry.coordinates[1],
          //         longitude: item.geometry.coordinates[0],
          //       }}>
          //       <View
          //         style={{
          //           backgroundColor: 'red',
          //           width: 32,
          //           height: 32,
          //           borderRadius: 4,
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //         }}>
          //         <Text style={{ color: 'white', fontSize: 12 }}>{item.properties.point_count}</Text>
          //       </View>
          //     </Marker>
          //   ) : (
          //     // Renderiza el marcador individual
          //     <Marker
          //       key={`marker-individual-${item.geometry.coordinates[0]}-${item.geometry.coordinates[1]}`}
          //       coordinate={{
          //         latitude: item.geometry.coordinates[1],
          //         longitude: item.geometry.coordinates[0],
          //       }}></Marker>
          //   );
          // }
        }
      />
    </MapView>
  );
}

const MarkerComponent = memo(
  ({ item }: { item: Supercluster.PointOrClusterFeature<Supercluster.AnyProps, Supercluster.AnyProps> }) => {
    const isCluster = item.properties.cluster;
    const coordinates = {
      latitude: item.geometry.coordinates[1],
      longitude: item.geometry.coordinates[0],
    };

    return isCluster ? (
      <Marker key={`cluster-${item.properties.cluster_id}`} coordinate={coordinates}>
        <View
          style={{
            backgroundColor: 'red',
            width: 32,
            height: 32,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white', fontSize: 12 }}>{item.properties.point_count}</Text>
        </View>
      </Marker>
    ) : (
      <Marker key={`marker-${coordinates.latitude}-${coordinates.longitude}`} coordinate={coordinates} />
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.geometry.coordinates[0] === nextProps.item.geometry.coordinates[0] &&
    prevProps.item.geometry.coordinates[1] === nextProps.item.geometry.coordinates[1] &&
    prevProps.item.properties.cluster_id === nextProps.item.properties.cluster_id
);
