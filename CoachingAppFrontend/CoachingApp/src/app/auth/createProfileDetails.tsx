import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import BasketballCourtSVG from '../../../assets/basketballcourtsvg.svg';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { createProfileDetails } from '@/services/authService';


export default function CreateProfileDetails() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCreateProfile = async () => {
        if (!name || !phone) {
            Alert.alert("Profile Creation", "Name and phone number are required.");
            return;
        };
        try {
            setLoading(true);
            await createProfileDetails({ name, phone });
            router.replace('/protected'); // redirect to protected area
        } catch (err: any) {
            console.error("Profile creation error:", err);
            Alert.alert("Profile creation failed", err.message || "An error occurred during profile creation");
        } finally {
            setLoading(false);
        };
    }

    return (
        <View style={styles.wrapper}>
            <MotiView
                from={{ opacity: 0.7, scale: 0.90 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'timing', duration: 1000, loop: true, easing: Easing.inOut(Easing.ease) }}
            >
                <BasketballCourtSVG width={220} height={220} style={{ marginBottom: 20, opacity: 0.9, transform: [{ rotate: '90deg' }]}} />
            </MotiView>
            <View style={styles.container}>
                <Text style={styles.title}>Get Started</Text>

                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.button} onPress={handleCreateProfile}>
                    <Text style={styles.buttonText}>Create Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fcfaff',
        alignItems: 'center',
        paddingTop: 60,
    },
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fcfaff',
        padding: 24,
    },
    title: {
        fontSize: 34,
        fontFamily: "Poppins_600SemiBold",
        margin: 20,
        color: "#ea5c2a",
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 30,    },
    input: {
        width: "100%",
        backgroundColor: "#f3f2f8ff",
        borderRadius: 12,
        padding: 16,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        marginBottom: 24,
    },
    button: {
        width: "80%",
        backgroundColor: "#ea5c2a",
        padding: 14,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 16,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
    },
     buttonText: {
        color: "#fcfaff",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        letterSpacing: 1,
    },
});