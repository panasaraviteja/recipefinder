import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SurpriseScreen from  "../screens/SurpriseScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
  Favorites: undefined;
  RecipeDetail: { mealId: string };
  MealDetails: { mealId: string };
  Surprise: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setInitialRoute(token ? "Home" : "Signup");
    };
    checkUser();
  }, []);

  if (!initialRoute) return null;

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="MealDetails" component={MealDetailsScreen} />
      <Stack.Screen name="Surprise" component={SurpriseScreen} />
    </Stack.Navigator>
  );
}
