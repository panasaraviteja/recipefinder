import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any; // to handle ingredients dynamically
};

const MealDetailsScreen = () => {
  const route = useRoute<RouteProp<{ params: { mealId: string } }, "params">>();
  const { mealId } = route.params;
  const [meal, setMeal] = useState<Meal | null>(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((res) => res.json())
      .then((data) => setMeal(data.meals[0]));
  }, [mealId]);

  if (!meal) return <Text>Loading...</Text>;

  // Collect ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.section}>Ingredients:</Text>
      {ingredients.map((ing, index) => (
        <Text key={index} style={styles.text}>
          {ing}
        </Text>
      ))}

      <Text style={styles.section}>Instructions:</Text>
      <Text style={styles.text}>{meal.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  section: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  text: { fontSize: 14, marginVertical: 4 },
});

export default MealDetailsScreen;
