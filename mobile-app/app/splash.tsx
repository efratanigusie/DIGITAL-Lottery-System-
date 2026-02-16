import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>DLS</Text>
        <Text style={styles.subtitle}>DIGITAL LOTTERY SYSTEM</Text>

        <View style={styles.loadingContainer}>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
        </View>

        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </View>
  );
}

/* 👇 PUT THE STYLES HERE (BOTTOM OF FILE) */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1677ff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 1,
    color: "#eaf1ff",
    marginTop: 6,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    marginTop: 40,
  },
  dot: {
    fontSize: 28,
    color: "#fff",
    marginHorizontal: 6,
  },
  loadingText: {
    marginTop: 10,
    color: "#eaf1ff",
    textAlign: "center",
  },
});
