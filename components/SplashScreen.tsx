import React from "react";
import { View } from "react-native";
import Svg, {
    Rect,
    Defs,
    LinearGradient,
    Stop,
    Path,
    Circle,
} from "react-native-svg";

export default function SplashScreen() {
    const theme = {
        colorDarkGreen: "#059669",
        colorMediumGreen: "#D1FAE5",
        colorLightGreen: "#EAFBF3",
        colorWhite: "#FFFFFF",
        colorAccent: "#10B981",
        colorShadow: "#047857",
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colorLightGreen,
                padding: 32,
            }}
        >
            <Svg
                width="150"
                height="150"
                viewBox="0 0 200 200"
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                }}
            >
                <Defs>
                    <LinearGradient
                        id="bgGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <Stop offset="0%" stopColor={theme.colorDarkGreen} />
                        <Stop offset="100%" stopColor={theme.colorAccent} />
                    </LinearGradient>
                </Defs>
                <Rect
                    width="200"
                    height="200"
                    rx="40"
                    fill="url(#bgGradient)"
                />

                <Path
                    d="M100 40C77.9086 40 60 57.9086 60 80C60 111.167 100 160 100 160C100 160 140 111.167 140 80C140 57.9086 122.091 40 100 40Z"
                    fill={theme.colorWhite}
                />

                <Path
                    d="M100 45C80.67 45 65 60.67 65 80C65 106.667 100 150 100 150C100 150 135 106.667 135 80C135 60.67 119.33 45 100 45Z"
                    fill={theme.colorShadow}
                    opacity="0.1"
                />

                <Circle cx="100" cy="80" r="20" fill={theme.colorDarkGreen} />

                <Circle
                    cx="95"
                    cy="75"
                    r="8"
                    fill={theme.colorAccent}
                    opacity="0.6"
                />
            </Svg>
        </View>
    );
}
