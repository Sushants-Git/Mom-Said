import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import { StatusBar as RNStatusBar } from "react-native";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { useState } from "react";

import { theme } from "../theme";

import useLocationStore from "../stores/useLocationStore";
import usePermissions from "../hooks/usePermissions";
import useMapStore from "../stores/useMapStore";

import Navbar from "../components/Navbar";
import SplashScreen from "../components/SplashScreen";
import LocationCard from "../components/LocationCard";
import AddButton from "../components/AddButton";
import Modal from "../components/addNewLocation/Modal";

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    });

    usePermissions();

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModelVisibility = (to: boolean | null = null) => {
        if (to === null) {
            setModalVisible((prevVisibility) => !prevVisibility);
        } else {
            setModalVisible(to);
        }
    };

    if (!fontsLoaded) {
        return <SplashScreen />;
    } else {
        return (
            <View style={styles.container}>
                <Navbar />
                <View style={styles.mainScreen}>
                    <ListOfPlacesOrMap />
                </View>
                <AddButton toggleModelVisibility={toggleModelVisibility} />
                <Modal
                    toggleModelVisibility={toggleModelVisibility}
                    modalVisible={modalVisible}
                />
                <StatusBar style="auto" />
            </View>
        );
    }
}

function ListOfPlacesOrMap() {
    const { locations } = useLocationStore();
    const { isMapOpen } = useMapStore();

    return (
        <>
            {!isMapOpen && (
                <FlatList
                    data={locations}
                    renderItem={({ item, index }) => {
                        return <LocationCard location={item} />;
                    }}
                    keyExtractor={(item) => item.id}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorMediumGreen,
        paddingTop: RNStatusBar.currentHeight || 0, // Adds padding to avoid filling the status bar
    },
    mainScreen: {
        backgroundColor: theme.colorMediumGreen,
    },
});
