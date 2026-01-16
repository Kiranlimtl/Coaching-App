import { Text, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function DrawerItem({
    label,
    to,
    useLink = true,
    icon,
    color = "#333333",
    onPress
}: {
    label: string;
    to: string;
    useLink?: boolean;
    icon?: keyof typeof Ionicons.glyphMap;
    color?: string
    onPress?: () => void;
}) {
    const content = (
        <Pressable style={styles.item} onPress={onPress}>
            {icon && (
                <Ionicons name={icon} size={24} color={color} />
            )}
            <Text style={[styles.text, {color: color}]}>{label}</Text>
        </Pressable>
    )
    return useLink ? <Link href={to} asChild>{content}</Link> : content
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 15,
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
    }
});