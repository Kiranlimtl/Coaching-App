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
                source ={require('../../../assets/coachflowlogov1.png')} 
                style={{ width: 200, height: 200, marginBottom: 10 }} 
                resizeMode="contain"
            />
            
            <Text style={styles.title}>New User{'\n'}Create an Account 🚀</Text>

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
    emailInput: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        width: "100%",
        backgroundColor: "#F88158",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#fff",
        width: "100%",
    },
    passwwordInput: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 8,
    },
    iconButton: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
        