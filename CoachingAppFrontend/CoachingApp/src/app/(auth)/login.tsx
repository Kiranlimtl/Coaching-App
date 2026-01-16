import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { login } from "@/services/authService";
import GoogleButton from "@/components/googleLoginButton";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Failed", "Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      await login({ email, password });
      router.replace("/(app)/home"); // redirect to protected area
    } catch (err: any) {
      console.error("Login error:", err);
      Alert.alert("Login failed", err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source ={require('../../../assets/coachflowlogov2.png')} 
        style={{ width: 250, height: 250, marginBottom: 10,}} 
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>

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
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.line} />
      </View>

      <GoogleButton onPress={() => Alert.alert("Google Login", "Google login pressed")}/>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
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
    marginBottom: 24,
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
    fontFamily: "Poppins_500Medium",

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
  passwordInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#8d8d8dff', // light grey line
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#8d8d8dff',
    fontSize: 14,
    fontFamily: "Poppins_400Regular",

  },
});
