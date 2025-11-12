import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { register } from '@/services/authService';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Registration", "Email and password are required.");
            return;
            }
        
        try {
          setLoading(true);
          await register({ email, password });
          router.replace("/protected"); // redirect to protected area
        } catch (err: any) {
          console.error("Registration error:", err);
          Alert.alert("Register failed", err.message || "An error occurred during login");
        } finally {
          setLoading(false);
        }
      };

    return (
        <View style={styles.container}>
            <Image 
                source ={require('../../../assets/coachflowlogov2.png')} 
                style={{ width: 200, height: 200, marginBottom: 10 }} 
                resizeMode="contain"
            />
            
            <Text style={styles.title}>Create{"\n"}Account</Text>

            <TextInput
                placeholder="Email"
                style={styles.emailInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Password"
                    style={styles.passwwordInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconButton}>
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#b4b4b4ff"
                    />
                </TouchableOpacity>

            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.passwwordInput}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.iconButton}>
                    <Ionicons
                        name={showConfirmPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#b4b4b4ff"
                    />
                </TouchableOpacity>
            </View>

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
        marginBottom: 30,
    },
    emailInput: {
        width: "100%",
        backgroundColor: "#f3f2f8ff",
        borderRadius: 12,
        padding: 16,
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        marginBottom: 16,
        borderWidth: 0,
        borderColor: "#E0E0E0"
    },
    button: {
        width: "80%",
        backgroundColor: "#ea5c2a",
        padding: 14,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 16,
        marginTop: 10,
        elevation: 1,
    },
     buttonText: {
        color: "#fcfaff",
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        letterSpacing: 1,
    },
    link: {
        color: "#ea5c2a",
        marginTop: 8,
        fontFamily: "Poppins_400Regular",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        padding: 8,
        marginBottom: 16,
        backgroundColor: "#f3f2f8ff",
        width: "100%",
    },
    passwwordInput: {
        flex: 1,
        fontFamily: "Poppins_400Regular",
    },
    iconButton: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
        