import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    fullDesc: string;
    dataInicioDisponivel: string;
    dataFimDisponivel: string;
    tipo: string;
    status: string;
    preco: number;
};

const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}  ${hours}:${minutes}`;
};

const ParkingDetailsInfo = ({ fullDesc, dataInicioDisponivel, dataFimDisponivel, tipo, status, preco }: Props) => {
    // Define cor e texto do botão conforme status
    const statusConfig: Record<string, { text: string; backgroundColor: string }> = {
        Disponível: { text: 'Disponível', backgroundColor: '#4caf50' },
        Ocupado: { text: 'Ocupado', backgroundColor: '#f44336' },
    };

    const { text: buttonText, backgroundColor } = statusConfig[status] || { text: status, backgroundColor: '#ccc' };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Descrição</Text>
            <Text style={styles.description}>{fullDesc}</Text>

            <View style={styles.dateContainer}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Data início</Text>
                    <Text style={styles.dateValue}>{formatDateTime(dataInicioDisponivel)}</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>Data fim</Text>
                    <Text style={styles.dateValue}>{formatDateTime(dataFimDisponivel)}</Text>
                </View>
            </View>

            <View style={styles.row}>
                    <Text style={styles.tipoLabel}>Tipo de vaga:</Text>
                    <Text style={styles.tipoValue}>{tipo}</Text>
            </View>

            <View style={styles.bottomRow}>
                <Text style={styles.priceText}>R$ {preco.toFixed(2)}</Text>
                <TouchableOpacity style={[styles.button, { backgroundColor }]}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 30,
        padding: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 6,
    },
    title: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        color: '#666',
        fontSize: 14,
        lineHeight: 18,
    },
    dateContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    dateBox: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingVertical: 8,
        marginHorizontal: 5,
    },
    dateLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tipoLabel: {
        fontSize: 16
    },
    tipoValue: {
        marginLeft: 16,
        fontSize: 16,
        color: '#666',
        fontWeight: '700',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 50,
        minWidth: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    priceText: {
        color: '#555',
        fontWeight: '700',
        fontSize: 16,
    },
    bottomRow: {
        marginTop: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 6,
        backgroundColor: '#fff'
    }
});

export default ParkingDetailsInfo;
