import "react-native-gesture-handler";
import registerNNPushToken from "native-notify";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import { colors } from "./src/theme";

import * as Font from "expo-font";
import { registerRootComponent } from "expo";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-native-paper";

import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";

import MainApp from "./src";
import { ImagesProvider, StudentListProvider } from "./src/contexts";
import { AuthProvider } from "./src/contexts";

SplashScreen.preventAutoHideAsync();

export default function App() {
  registerNNPushToken(5805, "eZaL4jeqvmkjzmezdyMZ3i");

  const scheme = useColorScheme();
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useLayoutEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Visby-Heavy": require("./src/assets/fonts/VisbyHeavy.otf"),
          "Visby-Medium": require("./src/assets/fonts/VisbyMedium.otf"),
          "Visby-Regular": require("./src/assets/fonts/VisbyRegular.otf"),
          "Visby-Semibold": require("./src/assets/fonts/VisbySemibold.otf"),
          "Visby-Bold": require("./src/assets/fonts/VisbyBold.otf"),
          "Delicious-Heavy": require("./src/assets/fonts/Delicious-Heavy.otf"),
          "Delicious-Bold": require("./src/assets/fonts/Delicious-Bold.otf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  } else {
    return (
      <RootSiblingParent>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <StatusBar backgroundColor={colors.primary} style="light" />
          <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
            <Provider>
              <ImagesProvider>
                <AuthProvider>
                  <StudentListProvider>
                    <MainApp />
                  </StudentListProvider>
                </AuthProvider>
              </ImagesProvider>
            </Provider>
          </NavigationContainer>
        </View>
      </RootSiblingParent>
    );
  }
}

registerRootComponent(App);

