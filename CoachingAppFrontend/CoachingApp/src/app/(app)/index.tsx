import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableNativeFeedback, Pressable, FlatList } from 'react-native';
import Popover from 'react-native-popover-view'
import { Link } from "expo-router";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from "react-native-drawer-layout";

export default function HomeScreen() {
    return (
            <SafeAreaView style={styles.safeArea}>
                <FlatList
                    data={[]}
                    renderItem={() => null}
                    /*keyExtractor={}*/
                    ListHeaderComponent={
                        <View style={styles.headerComponent}>
                            <View>
                                <Text style={styles.title}>Upcoming Classes</Text>
                                <View>
                                    <Pressable onPress={() => Alert.alert("Filter") /* temp just to show structure */}>
                                        <Ionicons name="filter" size={24} color="#8d8d8dff" />
                                    </Pressable>
                                </View>
                            </View>
                            <Pressable onPress={() => Alert.alert("Drawer") /* temp just to show structure */}>
                                <Ionicons name="menu" size={24} color="#8d8d8dff" />
                            </Pressable>
                        </View>
                    }
                    ListHeaderComponentStyle={{ width: '100%', marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                />
                <Link href="/(app)/createClass" asChild>
                    <Pressable style={styles.pressable}>
                        <Ionicons name="add-circle" style={styles.icon} size={40} />
                        <Text style={styles.linkText}>Add Class</Text>
                    </Pressable>
                </Link>
            </SafeAreaView>
    );  
}

const styles = StyleSheet.create({
    headerComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    safeArea: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 20
    },
    pressable: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontSize: 30,
        fontFamily: "Poppins_600SemiBold",
        color: "#ea5c2a",
        justifyContent: 'center',
        textAlign: 'center',
    },
    linkText: {
        color: "#ea5c2a",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        letterSpacing: 1,
    },
    icon: {
        color: "#ea5c2a",
    },
        
});