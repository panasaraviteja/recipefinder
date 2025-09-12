// App.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./src/stores/store";
import { login } from "./src/features/authSlice";
import AppNavigator, { RootStackParamList } from "./src/navigation/AppNavigator";

function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>("Signup");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        dispatch(login(token));
        setInitialRoute("Home");
      } else {
        setInitialRoute("Signup");
      }
      setLoading(false);
    };
    checkToken();
  }, [dispatch]);

  if (loading) return null; 

  return <AppNavigator initialRoute={initialRoute} />;
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}