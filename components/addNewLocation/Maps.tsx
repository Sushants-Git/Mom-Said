import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import axios from "axios";
import SearchBarWithAutocomplete from "./SearchBarWithAutocomplete";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { PROVIDER_GOOGLE } from "react-native-maps";

export type PredictionType = {
    description: string;
    place_id: string;
    reference: string;
    matched_substrings: any[];
    tructured_formatting: object;
    terms: object[];
    types: string[];
};

type MapsType = {
    region: {
        latitude: number;
        longitude: number;
        longitudeDelta: number;
        latitudeDelta: number;
    };
    changeRegion: (region: MapsType["region"]) => void;
    toggleMapOpen: (to?: boolean) => void;
    search: { term: string; fetchPredictions: boolean };
    changeSearch: (prop: MapsType["search"]) => void;
};

const GOOGLE_PACES_API_BASE_URL = "https://maps.googleapis.com/maps/api/place";

export default function Maps({
    region,
    changeRegion,
    toggleMapOpen,
    search,
    changeSearch,
}: MapsType) {
    const [showPredictions, setShowPredictions] = useState(false);
    const [predictions, setPredictions] = useState<PredictionType[]>([]);

    const env = {
        EXPO_PUBLIC_GOOGLE_API_KEY: "YOUR_API_KEY",
    };

    const onChangeText = async () => {
        if (search.term.trim() === "") return;
        if (!search.fetchPredictions) return;

        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${env.EXPO_PUBLIC_GOOGLE_API_KEY}&input=${search.term}`;
        try {
            const result = await axios.request({
                method: "post",
                url: apiUrl,
            });
            if (result) {
                const {
                    data: { predictions },
                } = result;
                setPredictions(predictions);
                setShowPredictions(true);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useDebounce(onChangeText, 1000, [search.term]);

    const onPredictionTapped = async (placeId: string, description: string) => {
        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${env.EXPO_PUBLIC_GOOGLE_API_KEY}&place_id=${placeId}`;
        try {
            const result = await axios.request({
                method: "post",
                url: apiUrl,
            });
            if (result) {
                const {
                    data: {
                        result: {
                            geometry: { location },
                        },
                    },
                } = result;
                const { lat, lng } = location;

                changeRegion({
                    latitude: lat,
                    longitude: lng,
                    longitudeDelta: 0.005,
                    latitudeDelta: 0.005,
                });
                setShowPredictions(false);
                changeSearch({ term: description, fetchPredictions: false });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getLocationName = async (latitude: number, longitude: number) => {
        console.log("called2");
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

        try {
            const response = await axios.get(apiUrl);

            if (response.data.results && response.data.results.length > 0) {
                const { formatted_address } = response.data.results[0];
                console.log(formatted_address);
                return formatted_address;
            } else {
                throw new Error("No results found for the given coordinates.");
            }
        } catch (error) {
            console.log("Error while fetching location name:", error);
            return null;
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let coors = location.coords;
            changeRegion({
                latitude: coors.latitude,
                longitude: coors.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        })();
    }, [changeRegion]);

    return (
        <View style={maps.container}>
            <MapView
                style={maps.map}
                showsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                region={{
                    ...region,
                    longitudeDelta: 0.005,
                    latitudeDelta: 0.005,
                }}
            >
                <Marker
                    coordinate={region}
                    draggable={true}
                    onDragEnd={async (e) => {
                        let { latitude, longitude } = e.nativeEvent.coordinate;
                        changeSearch({
                            term: await getLocationName(latitude, longitude),
                            fetchPredictions: false,
                        });
                        changeRegion({
                            latitude,
                            longitude,
                            longitudeDelta: 0.005,
                            latitudeDelta: 0.005,
                        });
                    }}
                />
            </MapView>
            <SearchBarWithAutocomplete
                value={search.term}
                onChangeText={(text) => {
                    changeSearch({ term: text, fetchPredictions: true });
                }}
                showPredictions={showPredictions}
                predictions={predictions}
                onPredictionTapped={onPredictionTapped}
            />
            <Pressable
                style={maps.mapsButton}
                onPress={() => {
                    toggleMapOpen(false);
                }}
            >
                <Text style={maps.mapsText}>Done</Text>
            </Pressable>
        </View>
    );
}

// const maps = StyleSheet.create({
//     container: {
//         flex: 1, // Ensures the container takes up the full screen
//         justifyContent: "flex-end", // Ensures the button is at the bottom
//         alignItems: "center", // Centers the button horizontally
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject, // Makes sure the map takes up the entire container
//     },
//     mapsButton: {
//         justifyContent: "center",
//         alignItems: "center", // Centers the text inside the button
//         position: "absolute",
//         bottom: 40, // Positioned above the bottom edge with sufficient space
//         right: 20,  // Positioned to the right
//         paddingHorizontal: 20, // Increased padding for better touch target
//         paddingVertical: 12,
//         backgroundColor: theme.colorMediumGreen, // Button background color
//         borderColor: theme.colorDarkGreen, // Button border color
//         borderWidth: 1, // Border width
//         borderRadius: 15, // Slightly rounded corners
//         elevation: 5, // Adds shadow for depth on Android
//         shadowColor: "#000", // Shadow for iOS
//         shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
//         shadowOpacity: 0.25, // Shadow opacity for iOS
//         shadowRadius: 3.84, // Shadow radius for iOS
//     },
//     mapsText: {
//         fontWeight: "bold",
//         color: theme.colorDarkGreen,
//         fontSize: 18,
//     },
// });

const maps = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    mapsButton: {
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 20,
        right: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: theme.colorMediumGreen,
        borderColor: theme.colorDarkGreen,
        borderWidth: 1,
        borderRadius: 10,
    },
    mapsText: {
        fontWeight: "bold",
        color: theme.colorDarkGreen,
        fontSize: 18,
    },
});
