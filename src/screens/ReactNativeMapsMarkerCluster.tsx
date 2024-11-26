import React, { memo, useMemo, useRef } from 'react';
import { MapView, MapViewRef, MarkerCluster } from 'react-native-maps-markercluster';
import { Marker } from 'react-native-maps';
import { Text, View } from 'react-native';

const initialRegion = {
  latitude: 20.967584,
  longitude: -89.624062,
  latitudeDelta: 0.4,
  longitudeDelta: 0.4,
};

export default function ReactNativeMapsMarkerCluster() {
  const mapRef = useRef<MapViewRef>();
  const markers = useMemo(() => generateRandomMarkers(9999), []);
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
    <MapView mapRef={ref => (mapRef.current = ref)} initialRegion={initialRegion} style={{ flex: 1 }}>
      <MarkerCluster
        nodeSize={12}
        extent={264}
        radius={25}
        renderCluster={cluster => <View style={{ flex: 1, backgroundColor: 'red' }}></View>}
        tracksViewChanges={true}
        clusteringEnabled={true}
        clusterBackgroundColor={'blue'}
        clusterWrapperBackgroundColor={'blue'}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0] }}
            style={{ aspectRatio: 1 }}
          />
        ))}
      </MarkerCluster>
    </MapView>
  );
}
