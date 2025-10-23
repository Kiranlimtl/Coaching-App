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
      router.replace("/protected"); // redirect to protected area
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
        source ={require('../../../assets/coachflowlogov1.png')} 
        style={{ width: 250, height: 250, marginBottom: 10 }} 
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back 🏀</Text>

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

      <GoogleButton onPress={() => Alert.alert("Google Login", "Google login pressed")} />

      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 24,
    color: "#053460",
    paddingBottom: 20,
  },
  emailInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#ff774aff",
    padding: 14,
    borderRadius: 20,
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
    marginTop: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
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
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc', // light grey line
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#777',
    fontSize: 14,
  },
});
