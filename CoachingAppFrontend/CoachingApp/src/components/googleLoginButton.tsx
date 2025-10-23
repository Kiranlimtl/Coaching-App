// src/components/GoogleButton.tsx
import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";

interface Props {
  onPress?: () => void;
}

export default function GoogleButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/googleIcon.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderColor: "#cacacaff",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.025,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});
