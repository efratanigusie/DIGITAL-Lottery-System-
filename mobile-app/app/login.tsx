import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phone, setPhone] = useState("");

  const floatAnim = useRef(new Animated.Value(0)).current;

  // Floating logo animation
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

  return (
    <LinearGradient
      colors={["#0f5bd7", "#1e88ff", "#2563eb"]}
      style={styles.container}
    >
      {/* Glow Effect */}
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <View style={styles.card}>
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          />
        </Animated.View>

        <Text style={styles.title}>DLS</Text>
        <Text style={styles.subtitle}>DIGITAL LOTTERY SYSTEM</Text>

        {/* Phone Input */}
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

        {/* Button */}
        <TouchableOpacity style={styles.button}
        onPress={() => router.replace("/(tabs)")}>
          <LinearGradient
            colors={["#1d4ed8", "#2563eb"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.forgot}>Forgot password?</Text>

        <View style={styles.divider} />

        <Text style={styles.footerText}>
          Don’t have an account?
        </Text>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  /* Glow Background */
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
    marginBottom: 30,
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

  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
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
