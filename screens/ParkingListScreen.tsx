import React, { useEffect, useState, useCallback, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import type { ParkingSpot, VagasResponse, VagaSocketResponse } from '../types';
import { InfoExtraPicker } from '../InfoExtraPicker'
import { connectSocket, disconnectSocket, socket } from '../services/socket';

type RootStackParamList = {
  'Lista de Vagas': undefined;
  Detalhes: { item: ParkingSpot };
};

const VAGAS_API_URL = 'https://vagasapi-production.up.railway.app/v1/vagas';
const statusDescricaoMap: Record<string, string> = {
  DISPONIVEL: 'Disponível',
  BLOQUEADA: 'Bloqueada',
  RESERVADA: 'Reservada',
};
const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
const statusVagaMap: Record<number, string> = {
  0: 'DISPONIVEL',
  1: 'RESERVADA',
  2: 'BLOQUEADA'
};
const tipoVagaMap: Record<number, string> = {
  0: 'Coberta',
  1: 'Descoberta',
};

const picker = new InfoExtraPicker();

const newOrUpdateVagaToParkingSpot = (vaga: VagaSocketResponse): ParkingSpot => {
  const statusDescricao = statusVagaMap[vaga.status] ?? 'Indefinido';
  const info = picker.pick();

  return {
    id: vaga.id,
    descricao: info.title,
    tipo: capitalize(tipoVagaMap[vaga.tipoVaga] ?? 'Desconhecida'),
    status: statusDescricaoMap[statusDescricao] || capitalize(statusDescricao),
    preco: vaga.valorHora,
    dataInicioDisponivel: new Date().toISOString(),
    dataFimDisponivel: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    fullDesc: info.description,
  };
};


type ParkingListScreenProps = NativeStackScreenProps<RootStackParamList, 'Lista de Vagas'>;

const mapVagaToParkingSpot = (vaga: VagasResponse): ParkingSpot => {
  const info = picker.pick();

  return {
    id: vaga.id,
    descricao: info.title,
    tipo: capitalize(vaga.tipoVagaDescricao),
    status: statusDescricaoMap[vaga.statusDescricao] || capitalize(vaga.statusDescricao),
    preco: vaga.valorHora,
    dataInicioDisponivel: new Date().toISOString(),
    dataFimDisponivel: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    fullDesc: info.description,
  };
};

const ParkingListScreen = ({ navigation }: ParkingListScreenProps) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await fetch(VAGAS_API_URL);
      const json = await response.json();
      const spotsFromApi = (json.vagas as VagasResponse[]).map(mapVagaToParkingSpot);

      setParkingSpots((prevSpots) => {
        const mapCurrent = new Map(prevSpots.map(spot => [spot.id, spot]));

        spotsFromApi.forEach(spot => {
          mapCurrent.set(spot.id, spot);
        });

        return Array.from(mapCurrent.values());
      });
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    connectSocket();

    socket.on('notificacaoNovaVaga', (vaga) => {
      setParkingSpots((prev) => {
        const exists = prev.some((item) => item.id === vaga.id);
        const updatedList = exists
          ? prev.map((item) =>
            item.id === vaga.id ? newOrUpdateVagaToParkingSpot(vaga) : item
          )
          : [...prev, newOrUpdateVagaToParkingSpot(vaga)];

        if (!exists) {
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 150);
        }

        return updatedList;
      });
    });

    socket.on('notificacaoAlteracaoDeVaga', (vaga) => {
      scrollToVaga(vaga.id);
      setParkingSpots((prev) =>
        prev.map((item) => (item.id === vaga.id ? newOrUpdateVagaToParkingSpot(vaga) : item))
      );
    });

    socket.on('notificacaoExcluirVaga', (id) => {
      setParkingSpots((prev) => prev.filter((item) => item.id !== id));
    });

    return () => {
      socket.off('notificacaoNovaVaga');
      socket.off('notificacaoAlteracaoDeVaga');
      socket.off('notificacaoExcluirVaga');
      disconnectSocket();
    };

  }, []);

  const flatListRef = useRef<FlatList>(null);

  const scrollToVaga = (id: string) => {
    const index = parkingSpots.findIndex((item) => item.id === id);
    if (index >= 0) {
      flatListRef.current?.scrollToIndex({
        index,
        viewPosition: 0.5,
        animated: true,
      });
    }
  };

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
            color: item.status.toLowerCase() === 'reservada' ? 'red' :
              item.status.toLowerCase() === 'bloqueada' ? 'red' :
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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Erro ao carregar as vagas.</Text>
        <Button title="Tentar novamente" onPress={fetchInitialData} />
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={parkingSpots}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 60 }}
    />
  );
};

export default ParkingListScreen;
