import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://YOUR_LOCAL_IP:5000/api"; // ⚠️ change this

export default function Register() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Ethiopian phone formatter
  const formatPhone = (text: string) => {
    let cleaned = text.replace(/\D/g, "");

    if (cleaned.startsWith("251")) {
      cleaned = cleaned.slice(3);
    }

    if (cleaned.length > 9) {
      cleaned = cleaned.slice(0, 9);
    }

    const formatted = cleaned.replace(
      /(\d{2})(\d{3})(\d{0,4})/,
      (match, p1, p2, p3) => {
        return p3 ? `${p1} ${p2} ${p3}` : `${p1} ${p2}`;
      }
    );

    setPhone(formatted);
  };

  // 🔥 REGISTER FUNCTION
  const handleRegister = async () => {
    if (!phone || !password || !confirmPassword) {
      return Alert.alert("Error", "All fields are required");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords do not match");
    }

    try {
      setLoading(true);

      // remove spaces & add +251
      const cleanedPhone = `251${phone.replace(/\s/g, "")}`;

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: cleanedPhone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return Alert.alert("Error", data.message);
      }

      // Save token
      await AsyncStorage.setItem("token", data.token);

      setLoading(false);

      Alert.alert("Success", "Account created successfully!");

      router.replace("/(tabs)");
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <LinearGradient
      colors={["#0f5bd7", "#1e88ff", "#2563eb"]}
      style={styles.container}
    >
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
            />
          </Animated.View>

          <Text style={styles.title}>DLS</Text>
          <Text style={styles.subtitle}>DIGITAL LOTTERY SYSTEM</Text>

          <Text style={styles.createText}>Create Account</Text>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+251</Text>
            <TextInput
              value={phone}
              onChangeText={formatPhone}
              keyboardType="number-pad"
              placeholder="9XX XXX XXX"
              placeholderTextColor="#9ca3af"
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!passwordVisible}
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye-off" : "eye"}
                size={22}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!confirmVisible}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setConfirmVisible(!confirmVisible)}
            >
              <Ionicons
                name={confirmVisible ? "eye-off" : "eye"}
                size={22}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={["#1d4ed8", "#2563eb"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? "Creating..." : "Register"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  /* Glow */
  glow1: {
    position: "absolute",
    width: 300,
    height: 300,
    backgroundColor: "#3b82f6",
    borderRadius: 200,
    top: -100,
    left: -100,
    opacity: 0.4,
  },
  glow2: {
    position: "absolute",
    width: 250,
    height: 250,
    backgroundColor: "#60a5fa",
    borderRadius: 200,
    bottom: -100,
    right: -80,
    opacity: 0.3,
  },

  card: {},

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#e5e7eb",
    textAlign: "center",
  },

  createText: {
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
    marginVertical: 20,
  },

  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  prefix: {
    marginRight: 6,
    fontWeight: "600",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },

  button: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
  },

  buttonGradient: {
    padding: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  forgot: {
    textAlign: "center",
    color: "#e5e7eb",
    marginTop: 15,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 25,
  },

  footerText: {
    textAlign: "center",
    color: "#e5e7eb",
  },

  link: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
});
