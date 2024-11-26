import React, { useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster';

export default function ReactNativeSuperCluster() {
  const mapRef = useRef(null);

  const initialRegion = {
    latitude: 20.967584,
    longitude: -89.624062,
    latitudeDelta: 0.4,
    longitudeDelta: 0.4,
  };

  const markersData = [
    { id: 1, location: { latitude: 20.968, longitude: -89.623 } },
    { id: 2, location: { latitude: 20.965, longitude: -89.622 } },
    { id: 3, location: { latitude: 20.964, longitude: -89.625 } },
    { id: 4, location: { latitude: 20.967, longitude: -89.626 } },
    { id: 5, location: { latitude: 20.966, longitude: -89.62 } },
    { id: 6, location: { latitude: 20.963, longitude: -89.621 } },
    { id: 7, location: { latitude: 20.969, longitude: -89.627 } },
    { id: 8, location: { latitude: 20.97, longitude: -89.628 } },
    { id: 9, location: { latitude: 20.961, longitude: -89.629 } },
    { id: 10, location: { latitude: 20.96, longitude: -89.63 } },
    { id: 11, location: { latitude: 20.962, longitude: -89.631 } },
    { id: 12, location: { latitude: 20.958, longitude: -89.619 } },
    { id: 13, location: { latitude: 20.957, longitude: -89.618 } },
    { id: 14, location: { latitude: 20.956, longitude: -89.617 } },
    { id: 15, location: { latitude: 20.955, longitude: -89.616 } },
    { id: 16, location: { latitude: 20.954, longitude: -89.615 } },
    { id: 17, location: { latitude: 20.953, longitude: -89.614 } },
    { id: 18, location: { latitude: 20.952, longitude: -89.613 } },
    { id: 19, location: { latitude: 20.951, longitude: -89.612 } },
    { id: 20, location: { latitude: 20.95, longitude: -89.611 } },
    { id: 21, location: { latitude: 20.949, longitude: -89.61 } },
    { id: 22, location: { latitude: 20.948, longitude: -89.609 } },
    { id: 23, location: { latitude: 20.947, longitude: -89.608 } },
    { id: 24, location: { latitude: 20.946, longitude: -89.607 } },
    { id: 25, location: { latitude: 20.945, longitude: -89.606 } },
    { id: 26, location: { latitude: 20.944, longitude: -89.605 } },
    { id: 27, location: { latitude: 20.943, longitude: -89.604 } },
    { id: 28, location: { latitude: 20.942, longitude: -89.603 } },
    { id: 29, location: { latitude: 20.941, longitude: -89.602 } },
    { id: 30, location: { latitude: 20.94, longitude: -89.601 } },
    { id: 31, location: { latitude: 20.939, longitude: -89.6 } },
    { id: 32, location: { latitude: 20.938, longitude: -89.599 } },
    { id: 33, location: { latitude: 20.937, longitude: -89.598 } },
    { id: 34, location: { latitude: 20.936, longitude: -89.597 } },
    { id: 35, location: { latitude: 20.935, longitude: -89.596 } },
    { id: 36, location: { latitude: 20.934, longitude: -89.595 } },
    { id: 37, location: { latitude: 20.933, longitude: -89.594 } },
    { id: 38, location: { latitude: 20.932, longitude: -89.593 } },
    { id: 39, location: { latitude: 20.931, longitude: -89.592 } },
    { id: 40, location: { latitude: 20.93, longitude: -89.591 } },
    { id: 41, location: { latitude: 20.929, longitude: -89.59 } },
    { id: 42, location: { latitude: 20.928, longitude: -89.589 } },
    { id: 43, location: { latitude: 20.927, longitude: -89.588 } },
    { id: 44, location: { latitude: 20.926, longitude: -89.587 } },
    { id: 45, location: { latitude: 20.925, longitude: -89.586 } },
    { id: 46, location: { latitude: 20.924, longitude: -89.585 } },
    { id: 47, location: { latitude: 20.923, longitude: -89.584 } },
    { id: 48, location: { latitude: 20.922, longitude: -89.583 } },
    { id: 49, location: { latitude: 20.921, longitude: -89.582 } },
    { id: 50, location: { latitude: 20.92, longitude: -89.581 } },
  ];

  const renderCluster = (cluster: any, onPress: () => void) => {
    const { pointCount, coordinate } = cluster;

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.clusterContainer}>
          <Text style={styles.clusterText}>{pointCount}</Text>
        </View>
      </Marker>
    );
  };

  const renderMarker = (data: any) => (
    <Marker key={data.id} coordinate={data.location}>
      {/* <View style={{ backgroundColor: 'black', width: 32, height: 32, justifyContent: 'center' }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>id{data.id}</Text>
      </View> */}
    </Marker>
  );

  return (
    <ClusteredMapView
      style={styles.map}
      data={markersData}
      initialRegion={initialRegion}
      ref={mapRef}
      renderMarker={renderMarker}
      renderCluster={renderCluster}
    />
  );
  // return <></>;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  clusterContainer: {
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightpink',
  },
  clusterText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
