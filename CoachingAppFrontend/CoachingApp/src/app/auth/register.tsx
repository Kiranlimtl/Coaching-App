import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleRegister = () => {
        // Replace with your registration logic
        if (password != confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }
        else if (email && password) {
            Alert.alert('Registration successful!');
            router.replace('/protected'); // redirect to protected area
        } else {
            Alert.alert('Please enter valid email and password');
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source ={require('../../../assets/coachflowlogov1.png')} 
                style={{ width: 150, height: 150, marginBottom: 10 }} 
                resizeMode="contain"
            />
            
            <Text style={styles.title}>New User{'\n'}Create an Account 🚀</Text>

            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.link}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 24,
        color: "#053460",
        paddingBottom: 20,
        justifyContent: 'center',
        textAlign: 'center',
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    button: {
        width: "100%",
        backgroundColor: "#F88158",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 12,
    },
     buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    link: {
        color: "#F88158",
        marginTop: 10,
    },
});
        