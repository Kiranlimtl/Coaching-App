import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, TouchableNativeFeedback, Pressable, FlatList } from 'react-native';
import Popover from 'react-native-popover-view'
import { useQuery } from '@tanstack/react-query';
import { Link } from "expo-router";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Drawer } from "react-native-drawer-layout";
import  DrawerItem  from '@/components/DrawerItem';
import ClassListItem from '@/components/ClassListItem';
import EmptyState from '@/components/EmptyState';
import { getClassListItems } from '@/services/classService';
import { ClassListDisplay } from '@/type/classTypes';

export default function HomeScreen() {

    const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("upcoming");
    const [showFilterPopover, setShowFilterPopover] = useState(false);
    const filterButtonRef = useRef<any>(null);
    const [open, setOpen] = useState(false);

    console.log("HomeScreen: Fetching class list items");
    const { data, isLoading, error } = useQuery<ClassListDisplay[]>({
        queryKey: ['classes'],
        queryFn: () => getClassListItems(), // Assume this function is defined elsewhere
    })
    console.log("HomeScreen: Fetched class list items:", data);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <Text>Error loading classes.</Text>
            </SafeAreaView>
        );
    }
    const renderDrawer = () => (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'space-between'}}>
            <View>
                <DrawerItem label="Class" useLink={true} to="/(app)/home" icon="basketball-outline" onPress={() => setOpen(false)} />
                <DrawerItem label="Students" useLink={true} to="/(app)/students" icon="calendar-clear-outline" />
                <DrawerItem label="Profile" useLink={true} to="/(app)/profile" icon="person-outline" />
                <DrawerItem label="Settings" useLink={true} to="/(app)/settings" icon="settings-outline" />
                <DrawerItem label="Help & Support" useLink={true} to="/(app)/help" icon="help-circle-outline" />
                <DrawerItem label='Logout' useLink={true} to="/(auth)/login" icon="log-out-outline" color="#dd5252ff" />
            </View>
        </View>
    )

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            renderDrawerContent={renderDrawer}
            drawerPosition='right'
            drawerStyle={{ width: '60%'}}>
                <SafeAreaView style={styles.safeArea}>
                    <FlatList
                        data={data?.filter((item: ClassListDisplay) => {
                            console.log("isClassOver: ",item.isClassOver)
                            if (filter === "all") return true;
                            if (filter === "upcoming") return !item.isClassOver;
                            if (filter === "completed") return item.isClassOver;
                            return true;    
                        })}
                        renderItem={({ item }) => <ClassListItem classItem={item} />}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        ListEmptyComponent={
                            <EmptyState
                                message={
                                    filter === "all" 
                                    ? "No classes available." 
                                    : filter === "upcoming"
                                        ? "No upcoming classes."
                                        : "No completed classes yet."
                                }
                                icon={filter === "all" ? "calendar-outline" : filter === "upcoming" ? "time-outline" : "checkmark-done-outline"}
                                />
                        }
                        ListHeaderComponent={
                            <View style={styles.headerComponent}>
                                <View>
                                    <Text style={styles.title}>
                                        {filter === "all" ? "All Classes" : filter === "upcoming" ? "Upcoming Classes" : "Completed Classes"}
                                    </Text>
                                    <View ref={filterButtonRef}
                                        collapsable={false}
                                        style={{ alignSelf: 'flex-start', marginTop: 10}}>
                                        <Pressable onPress={() => setShowFilterPopover(true)}>
                                            <Ionicons name="filter" size={24} color="#8d8d8dff" />
                                        </Pressable>
                                    </View>
                                </View>
                                <Pressable onPress={() => setOpen((prevOpen) => !prevOpen)}>
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
                    <Popover
                        isVisible={showFilterPopover}
                        onRequestClose={() => setShowFilterPopover(false)}
                        from={filterButtonRef}
                        backgroundStyle={{ backgroundColor: 'transparent' }}
                        arrowShift={-10}
                        popoverStyle={{backgroundColor: 'transparent',  shadowColor: 'transparent'}}

                    >
                        <View style={styles.filterBox}>
                            {["all", "upcoming", "completed"].map((mode, index, array) => (
                                <Pressable
                                    key = {mode}
                                    onPress={() => {
                                        setFilter(mode as any)
                                        setShowFilterPopover(false);
                                    }}
                                    style={[styles.filterOption,
                                        index !== array.length - 1 ? styles.separator : {}

                                    ]}
                                >
                                    <Text style={[
                                        filter === mode ? styles.filterOptionTextSelected : styles.filterOptionText
                                    ]}
                                    >
                                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </Popover>
                </SafeAreaView>
        </Drawer>
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
    filterBox: {
        backgroundColor: "#ffffff",
        padding: 4,
        borderRadius: 16,
        shadowColor: "#f0f0f0",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
        minWidth: 150,
    },
    filterOption: {
        paddingVertical: 10,
        borderRadius: 16,
        paddingHorizontal: 12,
    },
    filterOptionText: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        color: "#333333",
    },
    filterOptionTextSelected: {
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: "#ea5c2a" 
    },
    separator: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
    }
        
});