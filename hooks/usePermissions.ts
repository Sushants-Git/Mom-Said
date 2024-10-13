import { useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import checkNearbyLocations from "../checkLocations";
import useLocationStore from "../stores/useLocationStore";

import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export async function getFromStorage(key: string) {
    try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch {
        return null;
    }
}

TaskManager.defineTask("locationTask", async ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        console.log(error);
        return;
    }
    if (data) {
        const { locations } = data;

        console.log("ran");
        // const locationsStored = useLocationStore((state) => state.locations);
        const locationsStored = await getFromStorage("location-storage");

        if (locationsStored) {
            let res = await checkNearbyLocations(
                locationsStored.state.locations,
            );

            if (res !== undefined) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Reminder",
                        body: `Location : ${res.name} \n Message: ${res.message}`,
                    },
                    trigger: null,
                });
            }
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    }

    console.log("ch");
});

Notifications.registerTaskAsync("locationTask");

const usePermissions = (): void => {
    useEffect(() => {
        (async () => {
            const { status: foregroundStatus } =
                await Location.requestForegroundPermissionsAsync();
            const { status: backgroundStatus } =
                await Location.requestBackgroundPermissionsAsync();

            console.log("-----------------------------");
            console.log(
                "Foreground Location Permission:",
                foregroundStatus === "granted" ? "Granted" : "Not Granted",
            );
            console.log(
                "Background Location Permission:",
                backgroundStatus === "granted" ? "Granted" : "Not Granted",
            );

            if (
                foregroundStatus !== "granted" ||
                backgroundStatus !== "granted"
            ) {
                return;
            }

            try {
                await Location.startLocationUpdatesAsync("locationTask", {
                    accuracy: Location.Accuracy.Balanced,
                    distanceInterval: 20,
                    foregroundService: {
                        notificationTitle: "Location Tracking",
                        notificationBody:
                            "Tracking your location in the background",
                    },
                });

                await BackgroundFetch.registerTaskAsync("locationTask", {
                    minimumInterval: 10, // 15 minutes
                    stopOnTerminate: false, // android only,
                    startOnBoot: true, // android only
                });
            } catch (error) {
                console.log(error);
            }

            console.log("reachedddd");

            if (Platform.OS === "android") {
                console.log("doing");
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.DEFAULT,
                    vibrationPattern: [0, 250, 250, 250],
                    showBadge: false,
                });
            }

            // if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();

            console.log(
                "Existing Notification Permission:",
                existingStatus === "granted" ? "Granted" : "Not Granted",
            );
            console.log("-----------------------------");

            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                console.log("_____________________________");
                console.log(
                    "Requested Notification Permission:",
                    status === "granted" ? "Granted" : "Not Granted",
                );
                console.log("-----------------------------");

                if (status !== "granted") {
                    return;
                }
            }
            // }
        })();
    }, []);
};

export default usePermissions;
