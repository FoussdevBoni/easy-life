import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from '../../../assets/colors/colors';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { routes } = state;
  const focusedIndex = state.index;

  return (
    <View style={styles.tabBarContainer}>
      {routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = index === focusedIndex;

        const IconComponent = index !== 1 ? MaterialIcons : Ionicons; // Choisir le composant d'icône
        const iconName = options.tabBarIconName || 'home'; // Nom de l'icône par défaut

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarLabel}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabItem, isFocused ? styles.tabItemFocused : {}]}
          >
            <View style={[styles.iconContainer, isFocused ? styles.iconContainerFocused : {}]}>
              <IconComponent name={iconName} size={26} color={isFocused ? 'white' : 'gray'} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.primary, // Couleur de la barre inférieure
    paddingVertical: 5,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItemFocused: {
   z
  },
  iconContainer: {
    borderRadius: 50,
    padding: 10, // Espacement autour de l'icône
  },
  iconContainerFocused: {
    backgroundColor: 'white', // Cercle blanc autour de l'icône active
  },
});

export default CustomTabBar;
