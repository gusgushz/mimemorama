import { Text, View } from 'react-native';
import { colors } from '../styles/globalStyles';

export default function NewScreen() {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={{ height: '20%', backgroundColor: colors.background }}>
        <Text style={{ color: 'white' }}>background</Text>
      </View>
      <View style={{ height: '20%', backgroundColor: colors.primary }}>
        <Text style={{ color: 'white' }}>primary</Text>
      </View>
      <View style={{ height: '20%', backgroundColor: colors.secondary }}>
        <Text style={{ color: 'white' }}>secondary</Text>
      </View>
      <View style={{ height: '20%', backgroundColor: colors.text }}>
        <Text style={{ color: 'white' }}>text</Text>
      </View>
    </View>
  );
}
