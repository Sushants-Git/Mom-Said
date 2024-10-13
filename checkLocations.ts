import * as Location from "expo-location";

type LocationType = {
    id: string;
    name: string;
    message: string;
    latitude: number;
    longitude: number;
    mapsActualName: string;
    timeRange: [number, number];
};

type CurrentLocation = {
    latitude: number;
    longitude: number;
};

const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
): number => {
    const R = 6371000;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export default async function checkNearbyLocations(locations: LocationType[]) {
    let location = await Location.getCurrentPositionAsync({});
    let currentLocation = location.coords;

    const currentTime = new Date().getTime();

    console.log(location);
    console.log(locations);
    for (const location of locations) {
        const [startTime, endTime] = location.timeRange;

        if (currentTime >= startTime && currentTime <= endTime) {
            const distance = calculateDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                location.latitude,
                location.longitude,
            );

            if (distance < 300) {
                console.log("yess");
                return location;
            }
        }
    }
}
