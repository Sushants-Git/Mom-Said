import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";

type TopBarType = {
    modalVisible: boolean;
    toggleModelVisibility: (to: boolean | null) => void;
};

export default function TopBar({
    toggleModelVisibility,
    modalVisible,
}: TopBarType) {
    return (
        <View style={topBarStyles.modelTopBar}>
            <Text style={topBarStyles.topBarText}>Add New Location</Text>
            <Pressable
                onPress={() => toggleModelVisibility(!modalVisible)}
                style={topBarStyles.closeButton}
            >
                <AntDesign name="close" size={24} color={theme.colorWhite} />
            </Pressable>
        </View>
    );
}

const topBarStyles = StyleSheet.create({
    modelTopBar: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        gap: 80,
    },
    topBarText: {
        fontSize: 20,
        color: theme.colorDarkGreen,
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: theme.colorDarkGreen,
        padding: 5,
        borderRadius: 100,
    },
});
