import React from 'react';
import { ScrollView, View, Text, Image, useWindowDimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ParkingSpot } from '../types';
import ParkingDetailsInfo from '../ParkingDetailsInfo';

type RootStackParamList = {
  'Lista de Vagas': undefined;
  Detalhes: { item: ParkingSpot };
};

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Detalhes'>;

const maps = [
  require('../assets/maps/kanto.png'),
  require('../assets/maps/johto.png'),
  require('../assets/maps/hoenn.png'),
  require('../assets/maps/sinnoh.png'),
  require('../assets/maps/unova.png'),
  require('../assets/maps/kalos.png'),
  require('../assets/maps/galar.png')
];

const generateRandomPins = (count: number, mapWidth: number, mapHeight: number, pinSize: number) => {
  const pins = [];
  const padding = 40;
  for (let i = 0; i < count; i++) {
    const x = padding + Math.random() * (mapWidth - pinSize - 2 * padding);
    const y = padding + Math.random() * (mapHeight - pinSize - 2 * padding);
    pins.push({ x, y });
  }
  return pins;
};

const DetailsScreen = ({ route }: DetailsScreenProps) => {
  const { width: screenWidth } = useWindowDimensions();
  const mapHeight = 250;
  const pinSize = 40;
  const pinBaseHeight = 20;

  const { item } = route.params;
  const randomMap = maps[Math.floor(Math.random() * maps.length)];

  // Gerar 5 pins aleatórios
  const pins = generateRandomPins(5, screenWidth, mapHeight, pinSize);

  return (
    <View style={{ flex: 1 }}>
      <Image source={randomMap} style={{ width: '100%', height: mapHeight }} />
      {pins.map((pin, index) => (
        <View key={index} style={{
          position: 'absolute',
          top: pin.y,
          left: pin.x,
          alignItems: 'center',
          zIndex: 1,
        }}>
          <View style={{
            width: pinSize,
            height: pinSize,
            backgroundColor: '#d32f2f',
            borderRadius: pinSize / 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5,
          }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
              E
            </Text>
          </View>
          <View style={{
            width: 12,
            height: pinBaseHeight,
            backgroundColor: '#d32f2f',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginTop: -2,
          }} />
        </View>
      ))}
      <ScrollView>
        <ParkingDetailsInfo
          fullDesc={item.fullDesc}
          dataInicioDisponivel={item.dataInicioDisponivel}
          dataFimDisponivel={item.dataFimDisponivel}
          tipo={item.tipo}
          status={item.status}
          preco={item.preco}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;
