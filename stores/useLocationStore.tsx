import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Location = {
    id: string;
    name: string;
    message: string;
    latitude: number;
    longitude: number;
    mapsActualName: string;
    timeRange: [number, number];
};

type LocationStore = {
    locations: Location[];
    addLocation: (location: Location) => void;
    deleteLocation: (id: string) => void;
};

const useLocationStore = create<LocationStore>()(
    persist(
        (set) => ({
            locations: [],
            addLocation: (location) => {
                console.log(location);
                set((state) => ({
                    locations: [location, ...state.locations],
                }));
            },
            deleteLocation: (id) => {
                set((state) => ({
                    locations: state.locations.filter(
                        (location) => location.id !== id,
                    ),
                }));
            },
        }),
        {
            name: "location-storage",
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);
export default useLocationStore;
