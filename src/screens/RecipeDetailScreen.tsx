import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";  // ✅ import
import type { RootStackParamList } from "../navigation/AppNavigator";

type RecipeDetailScreenProps = {
  route: RouteProp<RootStackParamList, "RecipeDetail">;
};

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ route }) => {
  const { mealId } = route.params;
  const [meal, setMall] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setMall(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [mealId]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (!meal) return <Text>No recipe found.</Text>;

  // Collect ingredients
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure ? measure : ""} ${ingredient}`.trim());
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>   {/* ✅ SafeAreaView wrapper */}
      <ScrollView style={styles.container}>
        <View>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          {/* Back button over image */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{meal.strMeal}</Text>

        <Text style={styles.section}>Ingredients:</Text>
        {ingredients.map((item, index) => (
          <Text key={index} style={styles.text}>
            • {item}
          </Text>
        ))}

        <Text style={styles.section}>Instructions:</Text>
        <Text style={styles.text}>{meal.strInstructions}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, borderRadius: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  text: { fontSize: 14, marginVertical: 4 },
  backButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 6,
  },
  backText: { color: "#fff", fontWeight: "bold" },
  image: { width: "100%", height: 250, borderRadius: 10 }, // ✅ added height & rounded image
});
export default RecipeDetailScreen;
