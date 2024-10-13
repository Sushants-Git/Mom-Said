import React, { FunctionComponent, useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    ViewStyle,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";
import { theme } from "../../theme";

export type PredictionType = {
    description: string;
    place_id: string;
    reference: string;
    matched_substrings: any[];
    tructured_formatting: object;
    terms: object[];
    types: string[];
};

type SearchBarProps = {
    value: string;
    style?: ViewStyle | ViewStyle[];
    onChangeText: (text: string) => void;
    predictions: PredictionType[];
    showPredictions: boolean;
    onPredictionTapped: (placeId: string, description: string) => void;
};

const SearchBarWithAutocomplete: FunctionComponent<SearchBarProps> = (
    props,
) => {
    const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

    const {
        value,
        style,
        onChangeText,
        onPredictionTapped,
        predictions,
        showPredictions,
    } = props;

    const _renderPredictions = (predictions: PredictionType[]) => {
        const calculatedStyle = {
            width: inputSize.width,
        };

        console.log(predictions);

        return (
            <FlatList
                data={predictions}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={styles.predictionRow}
                            onPress={() =>
                                onPredictionTapped(
                                    item.place_id,
                                    item.description,
                                )
                            }
                        >
                            <Text numberOfLines={1}>{item.description}</Text>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.place_id}
                keyboardShouldPersistTaps="handled"
                style={[styles.predictionsContainer, calculatedStyle]}
            />
        );
    };

    return (
        <View style={[styles.container]}>
            <TextInput
                style={[styles.inputStyle]}
                placeholder="Search by address"
                placeholderTextColor="gray"
                value={value}
                onChangeText={onChangeText}
                returnKeyType="search"
                onLayout={(event) => {
                    const { height, width } = event.nativeEvent.layout;
                    setInputSize({ height, width });
                }}
            />
            {showPredictions && _renderPredictions(predictions)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        position: "absolute",
        top: 10,
        width: "100%",
        paddingHorizontal: 15, // Added padding for better alignment
    },
    inputStyle: {
        borderRadius: 12, // Slightly larger border radius for a modern look
        marginVertical: 8, // More consistent margin
        marginHorizontal: 10,
        borderColor: theme.colorDarkGreen,
        backgroundColor: "#F8F8F8", // Softer background color for input
        borderWidth: 1.5, // Increased border width for better visibility
        height: 50, // Slightly taller input for ease of typing
        paddingHorizontal: 12, // More padding inside the input
        fontSize: 16,
        shadowColor: "#000", // Added shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    predictionsContainer: {
        backgroundColor: "#FFFFFF", // White background for contrast
        paddingVertical: 8, // Consistent padding for predictions
        paddingHorizontal: 12,
        borderRadius: 8, // Softer corners for the dropdown
        marginHorizontal: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: theme.colorDarkGreen,
        shadowColor: "#000", // Shadow for a floating effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4, // For Android shadow
    },
    predictionRow: {
        paddingVertical: 10, // More padding for each row
        marginBottom: 5,
        borderBottomColor: "#E0E0E0", // Lighter border color for subtleness
        borderBottomWidth: 1,
    },
});

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: "center",
//         position: "absolute",
//         top: 10,
//         width: "100%",
//     },
//     inputStyle: {
//         borderRadius: 10,
//         margin: 10,
//         borderColor: theme.colorDarkGreen,
//         backgroundColor: "#FFF",
//         borderWidth: 1,
//         height: 45,
//         paddingHorizontal: 10,
//         fontSize: 18,
//     },
//     predictionsContainer: {
//         backgroundColor: theme.colorLightGreen,
//         padding: 10,
//         borderRadius: 10,
//         margin: 10,
//         borderWidth: 1,
//         borderColor: theme.colorDarkGreen,
//     },
//     predictionRow: {
//         paddingBottom: 15,
//         marginBottom: 15,
//         borderBottomColor: "black",
//         borderBottomWidth: 1,
//     },
// });

export default SearchBarWithAutocomplete;
