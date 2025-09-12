import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function SurpriseScreen() {
  const [meal, setMeal] = useState<any>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReveal = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await res.json();
      if (data.meals && data.meals[0]) {
        setMeal(data.meals[0]);
        setRevealed(true);
      }
    } catch (err) {
      console.error("Error fetching recipe:", err);
    } finally {
      setLoading(false);
    }
  };

  // Collect ingredients
  const getIngredients = (meal: any) => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
      }
    }
    return ingredients;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!revealed ? (
        <TouchableOpacity style={styles.card} onPress={handleReveal}>
          <Text style={styles.cardText}>🎁 Tap to Reveal Surprise Recipe 🎁</Text>
          {loading && <ActivityIndicator size="large" color="#fff" style={{ marginTop: 10 }} />}
        </TouchableOpacity>
      ) : (
        meal && (
          <View style={styles.card}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{meal.strMeal}</Text>

            <Text style={styles.section}>Ingredients:</Text>
            {getIngredients(meal).map((item, index) => (
              <Text key={index} style={styles.text}>
                • {item}
              </Text>
            ))}

            <Text style={styles.section}>Instructions:</Text>
            <Text style={styles.text}>{meal.strInstructions}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setMeal(null);
                setRevealed(false);
              }}
            >
              <Text style={styles.buttonText}>🔄 Surprise Me Again</Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 5,
  },
  cardText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  image: { width: "100%", height: 200, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12, textAlign: "center", color: "#000000" },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 12, color: "#000000" },
  text: { fontSize: 14, marginVertical: 2, color: "#000000" },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#ff6347", fontWeight: "bold", fontSize: 16 },
});
