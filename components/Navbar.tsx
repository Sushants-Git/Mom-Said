import { View, Text, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function Navbar() {
    return (
        <View style={[styles.logoContainer, styles.box]}>
            <Text
                style={[
                    styles.logoText,
                    {
                        fontFamily: "Inter_600SemiBold",
                    },
                ]}
            >
                Mom Said
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 12,
        // paddingTop: 30,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: theme.colorDarkGreen,
    },
    logoText: {
        fontSize: 25,
        color: theme.colorWhite,
    },
    box: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
});
