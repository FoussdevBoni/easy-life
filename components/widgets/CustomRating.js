import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Utilisation des icônes Ionicons via Expo

const CustomRating = ({ maxRating = 5, onRatingChange, editable , initialRating = 3 }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (selectedRating) => {
    if (!editable) return; // Si le composant est en lecture seule, on empêche toute interaction
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating); // Envoie la note sélectionnée au parent si nécessaire
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxRating }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleRating(index + 1)}
          style={styles.iconContainer}
          activeOpacity={editable ? 0.7 : 1} // Désactive l'effet d'opacity si non éditable
        >
          <Ionicons
            name={index < rating ? 'star' : 'star-outline'} // Affiche une étoile pleine ou vide
            size={20}
            color={index < rating ? '#FFD700' : '#C0C0C0'} // Or pour étoile pleine, gris pour étoile vide
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    marginHorizontal: 1, 
  },
});

export default CustomRating;
