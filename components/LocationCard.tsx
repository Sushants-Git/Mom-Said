import { utcToIST } from "../utils";
import Feather from "@expo/vector-icons/Feather";
import {
    StyleSheet,
    View,
    Text,
    Alert,
    TouchableWithoutFeedback,
    Pressable,
} from "react-native";
import { theme } from "../theme";
import useLocationStore from "../stores/useLocationStore";

type Location = {
    name: string;
    message: string;
    latitude: number;
    longitude: number;
    mapsActualName: string;
    timeRange: [number, number];
};

export default function LocationCard({ location }: { location: Location }) {
    const { id, name, message, timeRange, mapsActualName } = location;
    const deleteLocation = useLocationStore((state) => state.deleteLocation);

    const handleLongPress = () => {
        Alert.alert(
            "Delete Location",
            "Are you sure you want to delete this location?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => deleteLocation(id), // Call deleteLocation if OK is pressed
                },
            ],
        );
    };

    return (
        <Pressable
            onLongPress={handleLongPress}
            android_ripple={{ color: "#10b981" }} // Add ripple effect for Android
            style={({ pressed }) => [
                cardStyles.card,
                pressed ? cardStyles.cardPressed : null, // Apply pressed style if pressed
            ]}
        >
            <View style={cardStyles.contentContainer}>
                <Feather
                    name="map-pin"
                    size={24}
                    color={theme.colorDarkGreen}
                />
                <View style={cardStyles.textContainer}>
                    <Text style={cardStyles.name}>{name}</Text>
                    <Text style={cardStyles.time}>
                        {utcToIST(new Date(timeRange[0]))} -{" "}
                        {utcToIST(new Date(timeRange[1]))}
                    </Text>
                    <Text style={cardStyles.address}>{mapsActualName}</Text>
                    <Text style={cardStyles.message}>{message}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const cardStyles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#10b981",
        padding: 16,
        margin: 16,
    },
    cardPressed: {
        backgroundColor: "#f0fdf4", // Change background color when pressed
    },
    contentContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 15,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#047857",
    },
    time: {
        fontSize: 14,
        color: "#10b981",
        marginTop: 2,
    },
    address: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 4,
    },
    message: {
        fontSize: 14,
        color: "#4b5563",
        marginTop: 4,
    },
});
