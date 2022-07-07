import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

interface DzikirCounterProps {
  route: RouteProp<any, any>;
}

function DzikirCounter({ route: { params } }: DzikirCounterProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

export const screenOptions = {
  headerTitle: 'Dzikir Counter',
};

export default DzikirCounter;
