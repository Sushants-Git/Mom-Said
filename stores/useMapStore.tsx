import { create } from "zustand";

type MapStore = {
    isMapOpen: boolean;
    setIsMapOpen: (isOpen: boolean) => void;
    toggleMap: () => void;
};

const useMapStore = create<MapStore>((set) => ({
    isMapOpen: false,
    setIsMapOpen: (isOpen) => set({ isMapOpen: isOpen }),
    toggleMap: () => set((state) => ({ isMapOpen: !state.isMapOpen })),
}));

export default useMapStore;
