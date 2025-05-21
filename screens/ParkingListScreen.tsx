import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import type { ParkingSpot } from '../types';

type RootStackParamList = {
  'Lista de Vagas': undefined;
  Detalhes: { item: ParkingSpot };
};

type ParkingListScreenProps = NativeStackScreenProps<RootStackParamList, 'Lista de Vagas'>;

const ParkingListScreen = ({ navigation }: ParkingListScreenProps) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    const data: ParkingSpot[] = require('../data/parkingSpots.json');
    setParkingSpots(data);
  }, []);

  const renderItem = ({ item }: { item: ParkingSpot }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detalhes', { item })}
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 8,
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
      }}>
        <Text style={{ fontWeight: 'bold', color: '#555' }}>{item.descricao.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.descricao}</Text>
        <View style={{ flexDirection: 'row', marginTop: 2 }}>
          <Text style={{ color: '#777' }}>{item.tipo} - </Text>
          <Text style={{
            color: item.status.toLowerCase() === 'ocupado' ? 'red' :
                   item.status.toLowerCase() === 'disponível' ? 'green' : '#777',
            fontWeight: 'bold',
          }}>
            {item.status}
          </Text>
        </View>
      </View>
      <Text style={{ color: '#555', fontWeight: '600' }}>R$ {item.preco.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={parkingSpots}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 60 }}
    />
  );
};

export default ParkingListScreen;
