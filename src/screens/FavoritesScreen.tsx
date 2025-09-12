import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/AppNavigator";
import { removeFavorite } from "../features/favoritesSlice"; // ✅ import reducer

const FavoritesScreen = () => {
  const favorites = useSelector((state: RootState) => state.favorites.meals);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favourites</Text>
          <View style={{ width: 50 }} />
        </View>

        <View style={styles.center}>
          <Text>No favorites added yet!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favourites</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* ✅ FlatList Grid */}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetail", { mealId: item.idMeal })
              }
            >
              <Image
                source={{ uri: item.strMealThumb }}
                style={styles.mealImage}
              />
              <Text style={styles.mealText}>{item.strMeal}</Text>
            </TouchableOpacity>

            {/* ✅ Remove button */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => dispatch(removeFavorite(item.idMeal))}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#ff6347",
  },
  backText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  headerTitle: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  mealCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  mealImage: { width: "100%", height: 150 },
  mealText: { textAlign: "center", padding: 8, fontWeight: "bold" },
  removeBtn: {
    backgroundColor: "red",
    padding: 6,
    margin: 6,
    borderRadius: 6,
    alignItems: "center",
  },
});

export default FavoritesScreen;
