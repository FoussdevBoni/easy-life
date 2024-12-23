import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const services = [
    {
        nom: 'RESTAURANTS',
        icon: require('../../../assets/images/resto.png'),
        route: 'repas',
    },
    {
        nom: 'TRANSPORTS',
        icon: require('../../../assets/images/taxi.png'),
        route: 'taxi',
    },
    {
        nom: 'COURSES ET COMMERCES',
        icon: require('../../../assets/images/market.png'),
        route: 'select-courses-type',
    },
    {
        nom: 'HÔTELS ET HÉBERGEMENTS',
        icon: require('../../../assets/images/hotel.png'),
        route: 'loger',
    },
];

function Services() {
    const navigation = useNavigation();

    const handlePress = useCallback((route) => {
        navigation.navigate(route);
    }, [navigation]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.route)} style={styles.serviceItem}>
            <View style={styles.avatar}>
                <Image source={item.icon} style={styles.logo} />
            </View>
            <Text style={styles.serviceName}>{item.nom}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.container}
        />
    );
}

export default Services;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    serviceItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    serviceName: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,  // Adjusted to maintain a circular avatar
       // backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
});
