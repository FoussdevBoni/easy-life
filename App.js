import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NativeBaseProvider } from 'native-base';
import { store } from './reducer/store';
import { colors } from './assets/colors/colors';
import { View } from 'react-native'; // 
import Navigation from './navigation/Navigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    surface: 'white',
  },
};

export default function App() {
  const [open, setOpen] = useState(false);
  
  // Simuler un délai de chargement pour afficher l'animation
  useEffect(() => {
   

    setTimeout(() => {
      setOpen(true); // Afficher l'application principale après 3 secondes
    }, 3000); // 3000ms = 3 secondes
  }, []);



  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {open ? (
          <PaperProvider theme={theme}>
            <StatusBar style="dark" backgroundColor={''} />
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        ) : (
          // Affichage de l'ActivityIndicator avec un style centré
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary }}>
             <StatusBar style="light" backgroundColor={colors.primary} />
             <ActivityIndicator size={52} color="white" />
          </View>
        )}
      </NativeBaseProvider>
    </Provider>
  );
}
