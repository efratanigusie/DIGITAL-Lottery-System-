import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [timeLeft, setTimeLeft] = useState(90000);

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

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#1e3a8a", "#2563eb"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>
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

          {/* Wallet Pill */}
          <View style={styles.walletPill}>
            <Text style={styles.walletLabel}>Wallet</Text>
            <Text style={styles.walletAmount}>
              700 ETB
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* CONTENT */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>
            Available Lotteries
          </Text>
          <Text style={styles.viewAll}>
            View All ›
          </Text>
        </View>

        {/* CARD 1 */}
        <LinearGradient
          colors={["#6d28d9", "#7c3aed"]}
          style={styles.card}
        >
          {/* Sparkle Overlay */}
          <View style={styles.sparkle1} />
          <View style={styles.sparkle2} />

          <Text style={styles.cardTitle}>
            Saturday Bonanza
          </Text>

          <Text style={styles.amount}>
            1,000,000 ETB
          </Text>

          <Text style={styles.time}>
            Next Draw in {formatTime()}
          </Text>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
              Buy Tickets
            </Text>
          </TouchableOpacity>

          {/* Lottery Balls */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/861/861512.png",
            }}
            style={styles.ball1}
          />
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/861/861524.png",
            }}
            style={styles.ball2}
          />
        </LinearGradient>

        {/* CARD 2 */}
        <LinearGradient
          colors={["#f59e0b", "#f97316"]}
          style={styles.card}
        >
          <View style={styles.sparkle1} />
          <View style={styles.sparkle2} />

          <Text style={styles.cardTitle}>
            Mega Jackpot
          </Text>

          <Text style={styles.amount}>
            2,500,000 ETB
          </Text>

          <Text style={styles.time}>
            Next Draw in {formatTime()}
          </Text>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>
              Buy Tickets
            </Text>
          </TouchableOpacity>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/861/861512.png",
            }}
            style={styles.ball1}
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
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    color: "#e0e7ff",
    fontSize: 12,
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
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  viewAll: {
    color: "#2563eb",
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 8,
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

  ball1: {
    width: 80,
    height: 80,
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  ball2: {
    width: 60,
    height: 60,
    position: "absolute",
    right: 80,
    bottom: 20,
  },

  sparkle1: {
    position: "absolute",
    width: 80,
    height: 80,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 50,
    top: -20,
    right: -20,
  },

  sparkle2: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 50,
    bottom: -20,
    left: -20,
  },
});
