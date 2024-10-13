import AntDesign from "@expo/vector-icons/AntDesign";
import { Pressable, StyleSheet } from "react-native";
import { theme } from "../theme";

type AddButtonProps = {
    toggleModelVisibility: (to: boolean | null) => void;
};

export default function AddButton({ toggleModelVisibility }: AddButtonProps) {
    return (
        <Pressable
            hitSlop={20}
            style={({ pressed }) => [
                styles.addButton,
                {
                    backgroundColor: pressed
                        ? theme.colorDarkGreen
                        : theme.colorHoverDark,
                },
            ]}
            onPress={() => toggleModelVisibility(true)}
        >
            <AntDesign name="plus" size={28} color={theme.colorWhite} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    addButton: {
        padding: 15,
        borderRadius: 100,
        position: "absolute",
        right: 15,
        bottom: 20,
    },
});
