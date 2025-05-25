import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ParkingListScreen from './screens/ParkingListScreen';
import DetailsScreen from './screens/DetailsScreen';
import type { ParkingSpot } from './types';
import { Image } from 'react-native';

export type RootStackParamList = {
  'Lista de Vagas': undefined;
  Detalhes: { item: ParkingSpot };
};

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de Vagas" component={ParkingListScreen}
         options={{
          title: 'Lista de Vagas',
          headerRight: () => (
            <Image
              source={require('./assets/icons/smartpark_logo.png')}
              style={{ width: 64, height: 64, marginRight: 24, marginBottom:4 }}
              resizeMode="contain"
            />
          ),
        }}
        />
        <Stack.Screen name="Detalhes" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}