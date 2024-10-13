import { Text, Alert, Pressable, View, StyleSheet } from "react-native";

import { utcToIST } from "../../utils";
import { useState } from "react";

import {
    DateTimePickerEvent,
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TimeRangeSelector({
    startTime,
    endTime,
    changeStartTime,
    changeEndTime,
}: {
    startTime: Date;
    endTime: Date;
    changeStartTime: (time: Date) => void;
    changeEndTime: (time: Date) => void;
}) {
    const [isStartTimeSet, setIsStartTimeSet] = useState<boolean>(false);
    const [isEndTimeSet, setIsEndTimeSet] = useState<boolean>(false);

    const onStartTimeChange = (
        event: DateTimePickerEvent,
        selectedTime?: Date,
    ) => {
        if (!(event.type !== "set") && selectedTime) {
            if (selectedTime.getTime() > startTime.getTime() && isEndTimeSet) {
                Alert.alert(
                    "Invalid Start Time",
                    "The selected start time cannot be after the end time. Please select a time before the end time.",
                );
                return;
            }
            changeStartTime(selectedTime);
            setIsStartTimeSet(true);
        }
    };

    const onEndTimeChange = (
        event: DateTimePickerEvent,
        selectedTime?: Date,
    ) => {
        if (!(event.type !== "set") && selectedTime) {
            if (
                selectedTime.getTime() < startTime.getTime() &&
                isStartTimeSet
            ) {
                Alert.alert(
                    "Invalid End Time",
                    "The selected end time cannot be before the start time. Please select a time after the start time.",
                );
                return;
            }
            changeEndTime(selectedTime);
            setIsEndTimeSet(true);
        }
    };

    const showStartMode = () => {
        DateTimePickerAndroid.open({
            testID: "startTimePicker",
            value: startTime,
            mode: "time",
            is24Hour: true,
            display: "spinner",
            onChange: onStartTimeChange,
        });
    };

    const showEndMode = () => {
        DateTimePickerAndroid.open({
            testID: "endTimePicker",
            value: endTime,
            mode: "time",
            is24Hour: true,
            display: "spinner",
            onChange: onEndTimeChange,
        });
    };

    return (
        <View style={timePickerStyles.container}>
            <Pressable
                style={timePickerStyles.timePicker}
                onPress={showStartMode}
            >
                <AntDesign name="clockcircleo" size={21} color="black" />
                <Text style={timePickerStyles.timePickerText}>
                    {isStartTimeSet ? utcToIST(startTime) : "Start Time"}
                </Text>
            </Pressable>
            <Pressable
                style={timePickerStyles.timePicker}
                onPress={showEndMode}
            >
                <AntDesign name="clockcircleo" size={21} color="black" />
                <Text style={timePickerStyles.timePickerText}>
                    {isEndTimeSet ? utcToIST(endTime) : "End Time"}
                </Text>
            </Pressable>
        </View>
    );
}

const timePickerStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
    },
    timePicker: {
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        gap: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "black",
    },
    timePickerText: {
        color: "black",
    },
});
