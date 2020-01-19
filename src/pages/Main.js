import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main() {

    const [currentRegion, setCurrentRegion] = useState({});
    
    useEffect(() => {
        async function loadInitialPosition() {
            const {granted} = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }

        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return 
        <MapView initialRegion={currentRegion} style={styles.map} >
            <Marker coordinate={{latitude: -27.2111164, longitude: -49.6374491 }} >
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/39344416?s=460&v=4' }} />
                <Callout>
                    <View style={styles.Callout}>
                        <Text style={styles.devName}>Fabio Henrique</Text>
                        <Text style={styles.devBio}>Desenvolvedor javascript fullstack</Text>
                        <Text style={styles.devTech}>React, Node, Javscript</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 5,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTech: {
        marginTop: 5
    }

});

export default Main;