import { Text, Dimensions, TouchableOpacity } from 'react-native';
import { colors, globalStyles } from '../styles/globalStyles';

interface CardProps {
  title: string;
  onPress?: () => void;
}

export const Card = ({ title, onPress }: CardProps) => {
  const height = Dimensions.get('window').height * 0.2;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ height: height, justifyContent: 'center', backgroundColor: colors.primary }}>
      <Text style={{ color: colors.text, textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );
};
