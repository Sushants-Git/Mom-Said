import Feather from "@expo/vector-icons/Feather";
import {
    TextInput,
    Text,
    Modal,
    Pressable,
    View,
    StyleSheet,
    Alert,
} from "react-native";

import * as Crypto from "expo-crypto";
import { getRandomBytes } from "expo-random";

import { theme } from "../../theme";

import { useCallback, useState } from "react";

import useLocationStore from "../../stores/useLocationStore";
import useMapStore from "../../stores/useMapStore";

import TimeRangeSelector from "./TimeRangeSelector";
import TopBar from "./TopBar";
import Maps from "./Maps";

export type PredictionType = {
    description: string;
    place_id: string;
    reference: string;
    matched_substrings: any[];
    tructured_formatting: object;
    terms: object[];
    types: string[];
};

type AddLocationModalProps = {
    modalVisible: boolean;
    toggleModelVisibility: (to: boolean | null) => void;
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

const generateRandomHash = async () => {
    // Generate random bytes
    const randomData = getRandomBytes(32); // Generate 32 random bytes
    const randomString = randomData.reduce(
        (str, byte) => str + String.fromCharCode(byte),
        "",
    );

    // Create SHA-256 hash of the random string
    const hashed = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        randomString,
    );

    return hashed;
};

export default function LocationModal({
    modalVisible,
    toggleModelVisibility,
}: AddLocationModalProps) {
    const { isMapOpen, setIsMapOpen, toggleMap } = useMapStore();

    const [locationName, setLocationName] = useState("");
    const [message, setMessage] = useState("");
    const [region, setRegion] = useState<MapsType["region"]>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const { addLocation } = useLocationStore();

    const [search, setSearch] = useState({ term: "", fetchPredictions: false });

    const changeStartTime = (time: Date) => {
        setStartTime(time);
    };

    const changeEndTime = (time: Date) => {
        setEndTime(time);
    };

    const changeRegion = useCallback(
        (region: MapsType["region"]) => {
            setRegion(() => region);
        },
        [setRegion],
    );

    const toggleMapOpen = (to?: boolean) => {
        if (to !== undefined) {
            setIsMapOpen(to);
        } else {
            toggleMap();
        }
    };

    const changeSearch = ({ term, fetchPredictions }: MapsType["search"]) => {
        setSearch({ term, fetchPredictions });
    };

    function cleanAllInputs() {
        setLocationName("");
        setMessage("");
        setStartTime(new Date());
        setEndTime(new Date());
        setSearch({
            term: "",
            fetchPredictions: false,
        });
        toggleModelVisibility(false);
    }

    // const handleAddLocation = () => {
    //     if (search.term) {
    //         addLocation({
    //             name: locationName,
    //             message,
    //             latitude: region.latitude,
    //             longitude: region.longitude,
    //             mapsActualName: search.term,
    //             timeRange: [startTime.getTime(), endTime.getTime()],
    //         });

    //         cleanAllInputs();
    //     } else {
    //         Alert.alert(
    //             "Location Required",
    //             "Please select a location by tapping on the map before proceeding.",
    //         );
    //     }
    // };

    const handleAddLocation = () => {
        if (!locationName.trim()) {
            Alert.alert(
                "Location Name Required",
                "Please enter a location name.",
            );
            return;
        }

        if (!message.trim()) {
            Alert.alert("Message Required", "Please enter a message.");
            return;
        }

        if (!search.term) {
            Alert.alert(
                "Location Required",
                "Please select a location by tapping on the map before proceeding.",
            );
            return;
        }

        if (region.latitude === 0 && region.longitude === 0) {
            Alert.alert(
                "Coordinates Required",
                "Please select a valid location on the map to retrieve coordinates.",
            );
            return;
        }

        if (endTime <= startTime) {
            Alert.alert(
                "Invalid Time Range",
                "End time must be after the start time.",
            );
            return;
        }

        addLocation({
            id: String(Crypto.getRandomBytes(23)),
            name: locationName,
            message,
            latitude: region.latitude,
            longitude: region.longitude,
            mapsActualName: search.term,
            timeRange: [startTime.getTime(), endTime.getTime()],
        });

        cleanAllInputs();
    };

    return (
        <>
            {isMapOpen ? (
                <Maps
                    region={region}
                    changeRegion={changeRegion}
                    toggleMapOpen={toggleMapOpen}
                    search={search}
                    changeSearch={changeSearch}
                />
            ) : (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        toggleModelVisibility(!modalVisible);
                    }}
                >
                    <View style={[styles.centeredView]}>
                        <View style={styles.modalView}>
                            <TopBar
                                modalVisible={modalVisible}
                                toggleModelVisibility={toggleModelVisibility}
                            />
                            <View
                                style={{
                                    paddingTop: 20,
                                    alignSelf: "stretch",
                                    gap: 15,
                                }}
                            >
                                <LocationInputs
                                    locationName={locationName}
                                    message={message}
                                    setLocationName={setLocationName}
                                    setMessage={setMessage}
                                />
                                <MapButton
                                    onPress={toggleMap}
                                    searchTerm={search.term}
                                />
                                <TimeRangeSelector
                                    startTime={startTime}
                                    endTime={endTime}
                                    changeStartTime={changeStartTime}
                                    changeEndTime={changeEndTime}
                                />
                                <Pressable
                                    style={styles.addLocation}
                                    onPress={handleAddLocation}
                                >
                                    <Text style={styles.addLocationText}>
                                        Add Location
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

type LocationInputsProps = {
    locationName: string;
    setLocationName: (name: string) => void;
    message: string;
    setMessage: (message: string) => void;
};

const LocationInputs: React.FC<LocationInputsProps> = ({
    locationName,
    setLocationName,
    message,
    setMessage,
}) => {
    return (
        <View style={{ gap: 15 }}>
            <TextInput
                style={styles.textInput}
                onChangeText={setLocationName}
                value={locationName}
                placeholder="Location name"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={setMessage}
                value={message}
                placeholder="Message"
            />
        </View>
    );
};

type MapButtonProps = {
    onPress: () => void;
    searchTerm: string;
};

const MapButton: React.FC<MapButtonProps> = ({ onPress, searchTerm }) => {
    return (
        <Pressable style={styles.mapButton} onPress={onPress}>
            <Feather name="map" size={24} color="black" />
            <Text numberOfLines={1} style={styles.mapButtonText}>
                {searchTerm ? searchTerm : "Select location on map"}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background overlay
    },
    modalView: {
        width: "90%", // Make the modal responsive
        backgroundColor: theme.colorLightGreen,
        borderRadius: 18,
        padding: 20, // Increase padding for breathing space
        shadowColor: "#000", // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        borderWidth: 1,
        borderColor: theme.colorDarkGreen,
    },
    textInput: {
        borderWidth: 1,
        borderColor: theme.colorDarkGreen,
        borderRadius: 10,
        paddingHorizontal: 15, // Slightly increase padding
        paddingVertical: 12,
        fontSize: 16, // Use consistent font size for input fields
        backgroundColor: theme.colorWhite, // Add background to inputs
    },
    mapButton: {
        gap: 10,
        borderWidth: 1,
        padding: 12, // Increase padding for better touch area
        borderRadius: 10,
        borderColor: theme.colorDarkGreen, // Consistent color
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colorLightGreen, // Subtle background color
    },
    mapButtonText: {
        flexShrink: 1, // Allows the text to shrink to fit
        flexGrow: 1, // Allows the text to take up remaining space
        color: "black", // Make sure the text is visible
    },
    addLocation: {
        backgroundColor: theme.colorDarkGreen,
        alignItems: "center",
        paddingVertical: 12, // Slightly larger button padding
        borderRadius: 12,
    },
    addLocationText: {
        color: theme.colorWhite,
        fontSize: 16,
        fontWeight: "bold", // Make the button text stand out
    },
});

// const styles = StyleSheet.create({
//     centeredView: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: 22,
//     },
//     modalView: {
//         margin: 20,
//         backgroundColor: theme.colorLightGreen,
//         borderRadius: 18,
//         borderWidth: 1,
//         borderColor: theme.colorDarkGreen,
//         paddingVertical: 15,
//         paddingHorizontal: 15,
//         alignItems: "center",
//     },
//     textInput: {
//         borderWidth: 1,
//         borderColor: theme.colorDarkGreen,
//         borderRadius: 10,
//         paddingHorizontal: 10,
//         paddingVertical: 10,
//         fontSize: 18,
//     },
//     mapButton: {
//         gap: 10,
//         borderWidth: 1,
//         padding: 10,
//         borderRadius: 10,
//         borderColor: "black",
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     addLocation: {
//         backgroundColor: theme.colorDarkGreen,
//         alignItems: "center",
//         paddingVertical: 10,
//         borderRadius: 10,
//     },
//     addLocationText: {
//         color: theme.colorWhite,
//     },
// });
