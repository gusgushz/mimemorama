import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-map-clustering';
import { Marker } from 'react-native-maps';
import { Dimensions, View, Text, StyleSheet } from 'react-native';

export default function ReactNativeMapClustering() {
  const mapClusteringRef = useRef(null);
  const markers = useMemo(() => generateRandomMarkers(50), []);

  const initialRegion = {
    latitude: 20.967584,
    longitude: -89.624062,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

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
      spiralEnabled={true}
      radius={32}
      clusterColor="#ff0000"
      initialRegion={initialRegion}
      superClusterRef={mapClusteringRef}
      style={{ flex: 1 }}
      renderCluster={cluster => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
          <Marker
            key={`cluster-${id}`}
            coordinate={{
              longitude: geometry.coordinates[0],
              latitude: geometry.coordinates[1],
            }}
            onPress={onPress}>
            <View
              style={{
                borderRadius: 16,
                width: 32,
                height: 32,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              <Text style={{ textAlign: 'center' }}>{points}</Text>
            </View>
          </Marker>
        );
      }}
      spiderLineColor="red">
      {markers.map((marker, index) => (
        <Marker
          pinColor="green"
          style={{
            flex: 1,
          }}
          key={index}
          coordinate={{
            latitude: marker.geometry.coordinates[1],
            longitude: marker.geometry.coordinates[0],
          }}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  clusterContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clusterText: {
    color: 'white',
    fontSize: 11,
  },
});
