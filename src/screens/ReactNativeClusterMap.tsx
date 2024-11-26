import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ClusterMap } from 'react-native-cluster-map';

const ReactNativeClusterMap: React.FC = () => {
  const initialRegion = {
    latitude: 20.967584,
    longitude: -89.624062,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };
  const markers = useMemo(() => generateRandomMarkers(50), []);
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
    <ClusterMap
      style={{ flex: 1 }}
      region={initialRegion}
      initialRegion={initialRegion}
      // renderClusterMarker={({ pointCount }) => <MyCluster count={pointCount} />}
    >
      {markers.map(marker => (
        <Marker
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0],
          }}
        />
      ))}
    </ClusterMap>
    // <MapView style={{ flex: 1 }} initialRegion={initialRegion} region={initialRegion}>
    //   {markers.map((marker, index) => {
    //     const [longitude, latitude] = marker.geometry.coordinates;

    //     if (!longitude || !latitude) {
    //       console.error(`Invalid marker ${index}:`, marker);
    //       return null;
    //     }

    //     console.log(`Rendering marker ${index} at`, latitude, longitude);

    //     return (
    //       <Marker
    //         key={marker.id}
    //         coordinate={{
    //           latitude: latitude,
    //           longitude: longitude,
    //         }}
    //       />
    //     );
    //   })}
    // </MapView>
  );
};

export default ReactNativeClusterMap;

interface MyClusterProps {
  count: number;
}

const MyCluster: React.FC<MyClusterProps> = ({ count }) => {
  return (
    <View style={styles.cluster}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cluster: {
    width: 20,
    height: 20,
    backgroundColor: 'lightred',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

// <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
//   {markers &&
//     markers.map((marker, index) => {
//       const [longitude, latitude] = marker.geometry.coordinates;

//       // Verifica si las coordenadas son válidas antes de renderizar el marcador
//       if (longitude && latitude) {
//         return (
//           <Marker
//             key={index}
//             coordinate={{
//               latitude: latitude,
//               longitude: longitude,
//             }}
//           />
//         );
//       }
//       return null;
//     })}
// </MapView>
