import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import {
  addFavorite,
  removeFavorite,
  setFavorites,
} from "../features/favoritesSlice";

type MealPreview = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const HomeScreen = () => {
  const [meals, setMeals] = useState<MealPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const dispatch = useDispatch();
  const favourites = useSelector((state: RootState) => state.favorites.meals);

  const navigation = useNavigation<NavigationProp<any>>();

  // Fetch meals from API
  const fetchMeals = async (query?: string, area?: string) => {
    try {
      setLoading(true);
      let url = "";
      if (query)
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
      else if (area)
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
      else url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`;

      const res = await fetch(url);
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load favourites for current user
  useEffect(() => {
    const loadFavourites = async () => {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : { email: "default" };
      const favData = await AsyncStorage.getItem(`favourites_${user.email}`);
      if (favData) {
        dispatch(setFavorites(JSON.parse(favData)));
      }
    };

    loadFavourites();
    fetchMeals();
  }, []);

  // Navigate to recipe detail
  const handleMealPress = (mealId: string) => {
    navigation.navigate("RecipeDetail", { mealId });
  };

  // Search meals
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    fetchMeals(text.trim());
    setSelectedArea(null);
  };

  // Filter by area
  const handleAreaPress = (area: string) => {
    if (selectedArea === area) {
      setSelectedArea(null);
      fetchMeals();
    } else {
      setSelectedArea(area);
      setSearchQuery("");
      fetchMeals(undefined, area);
    }
  };

  // Toggle favourite and save in AsyncStorage
  const toggleFavourite = async (meal: MealPreview) => {
    const isFav = favourites.some((m) => m.idMeal === meal.idMeal);
    let updatedFavs;
    if (isFav) {
      updatedFavs = favourites.filter((m) => m.idMeal !== meal.idMeal);
      dispatch(removeFavorite(meal.idMeal));
    } else {
      updatedFavs = [...favourites, meal];
      dispatch(addFavorite(meal));
    }

    // Persist per user
    const userData = await AsyncStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : { email: "default" };
    await AsyncStorage.setItem(
      `favourites_${user.email}`,
      JSON.stringify(updatedFavs)
    );
  };

  // Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
  };

  const areas = ["Canadian", "Italian", "Mexican", "Japanese", "American"];

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
   <SafeAreaView style={{ flex: 1 }}>
  {/* Top Row: Favourites + Surprise + Logout */}
  <View style={styles.topRow}>
    <TouchableOpacity
      style={styles.topButton}
      onPress={() => navigation.navigate("Favorites")}
    >
      <Text style={styles.topButtonText}>Favourites</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.topButton}
      onPress={() => navigation.navigate("Surprise")}
    >
      <Text style={styles.topButtonText}>Surprise 🎁</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.topButton} onPress={handleLogout}>
      <Text style={styles.topButtonText}>Logout</Text>
    </TouchableOpacity>
  </View>

  {/* Search Bar */}
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search meals..."
      value={searchQuery}
      onChangeText={handleSearch}
      returnKeyType="search"
    />
  </View>

  {/* Area Filter */}
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={true}
    contentContainerStyle={styles.areaContainer}
  >
    {areas.map((area) => (
      <TouchableOpacity
        key={area}
        style={[
          styles.areaButton,
          selectedArea === area && styles.areaButtonSelected,
        ]}
        onPress={() => handleAreaPress(area)}
      >
        <Text
          style={[
            styles.areaText,
            selectedArea === area && styles.areaTextSelected,
          ]}
        >
          {area}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>

  {/* Meal List */}
  <FlatList 
    data={meals}
    keyExtractor={(item) => item.idMeal}
    numColumns={2}
    contentContainerStyle={{ padding: 8}}
    ListEmptyComponent={<Text style={styles.emptyText}>No meals found</Text>}
    renderItem={({ item }) => (
      <View style={styles.mealCard}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("RecipeDetail", { mealId: item.idMeal })
          }
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
          <Text style={styles.mealText}>{item.strMeal}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favIconContainer}
          onPress={() => toggleFavourite(item)}
        >
          <Text style={{ fontSize: 22 }}>
            {favourites.some((m) => m.idMeal === item.idMeal) ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  />
</SafeAreaView>
  );
  };
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fafafa",
  },
  topButton: {
    backgroundColor: "#ff6347",
    paddingHorizontal: 16,
    paddingVertical: 8,
    height:40,
    borderRadius: 25,
  },
  topButtonText: { color: "#fff", fontWeight: "bold" },
  searchContainer: {
    paddingHorizontal: 5,
    paddingVertical: 8,

  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  areaContainer: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: "#fafafa",
    marginBottom:10,
  },
  areaButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#ddd",
    borderRadius: 25,
    marginRight: 12,
    minWidth: 100,
    alignItems: "center",
    justifyContent:"center",
    height:40,
  },
  areaButtonSelected: { backgroundColor: "#ff8147ff" },
  areaText: { color: "#333", fontWeight: "bold",},
  areaTextSelected: { color: "#fff" },
  mealCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    
  },
  mealImage: { width: "100%", height: 140 },
  mealText: { textAlign: "center", padding: 8, fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "#666" },
  favIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
});

export default HomeScreen;
