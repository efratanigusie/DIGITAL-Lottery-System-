import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(90000);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Glow Animation
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1e3a8a", "#2563eb"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>

          {/* LEFT SIDE */}
          <View style={styles.leftHeader}>

            {/* Back Arrow */}
            <TouchableOpacity
              onPress={() => router.replace("/login")}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Logo + Title */}
            <View>
              <View style={styles.logoRow}>
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                />
                <Text style={styles.headerTitle}>DLS</Text>
              </View>
              <Text style={styles.subtitle}>
                DIGITAL LOTTERY SYSTEM
              </Text>
            </View>

          </View>

          {/* Wallet */}
          <View style={styles.walletPill}>
            <Text style={styles.walletLabel}>Wallet</Text>
            <Text style={styles.walletAmount}>700 ETB</Text>
          </View>

        </View>
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
  <View style={styles.sectionHeader}>
  <View style={styles.titleContainer}>
    <Text style={styles.sectionTitle}>
      የሎተሪ ጨዋታዎች
    </Text>
    <Text style={styles.subtitle}>
      መልካም ዕድል!
    </Text>
  </View>

  <TouchableOpacity>
    <Text style={styles.viewAll}>View All</Text>
  </TouchableOpacity>
</View>



        {/* CARD 1 */}
        <LinearGradient
          colors={["#6d28d9", "#7c3aed"]}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            ዕለታዊ ሎተሪ
          </Text>

          <Text style={styles.amount}>
            1,000,000 ETB
          </Text>

          <Text style={styles.time}>
            በአንድ ቀን የሚወጣ ሎተሪ ይግዙና ይሸለሙ
            {/* {formatTime()} */}
          </Text>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
             ሙሉ ትኬት 5 ብር
            </Text>
          </TouchableOpacity>

          {/* Glow */}
          <Animated.View
            style={[
              styles.glowCircle,
              { opacity: glowOpacity },
            ]}
          />

          {/* Coin */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/138/138292.png",
            }}
            style={styles.coin}
          />
        </LinearGradient>

        {/* CARD 2 */}
        <LinearGradient
          colors={["#f59e0b", "#f97316"]}
          style={styles.card}
        >
          <Text style={styles.cardTitle}>
            60 ሚሊዮን ሎተሪ
          </Text>

          <Text style={styles.amount}>
            60,000,000 ETB
          </Text>

          <Text style={styles.time}>
          ለገና የሚወጣ ሎተሪ ይግዙና ይሸለሙ
        
          </Text>
           {/* <Text>{formatTime()}</Text> */}

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
              ሙሉ ትኬት 100 ብር
            </Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.glowCircle,
              { opacity: glowOpacity },
            ]}
          />

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/138/138292.png",
            }}
            style={styles.coin}
          />
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    marginRight: 12,
    padding: 6,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
     fontSize: 14,
     color: "#9CA3AF", // soft gray
     marginTop: 4,
  },

  walletPill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
  },

  walletLabel: {
    color: "#fde047",
    fontSize: 12,
  },

  walletAmount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  content: {
    padding: 20,
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    alignItems: "center",
  },

  titleContainer: {
     flexDirection: "column",
  },

  sectionTitle: {
     fontSize: 20,
    fontWeight: "700",
   color: "#111827", 
  },

  viewAll: {
    
     fontSize: 14,
    fontWeight: "600",
    color: "#22C55E",
  },
sectionHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
  paddingHorizontal: 16,
  marginTop: 24,
  marginBottom: 12,
},
  welcomeMessage: {
    color: "#6b7280", 
    fontSize: 14,
    fontWeight: "400",
    marginTop: 4,
    
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
    elevation: 10,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },

  amount: {
    color: "#fde047",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 8,
  },

  time: {
    fontSize: 10,
    color: "#fff",
    marginBottom: 15,
  },

  buyBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  buyText: {
    color: "#1e40af",
    fontWeight: "600",
  },

  coin: {
    width: 90,
    height: 90,
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  glowCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#fde047",
    right: -40,
    bottom: -40,
  },
});
