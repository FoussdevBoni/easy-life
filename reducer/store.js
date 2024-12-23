import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importez vos slices
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import favoritesSlice from './favoritesSlice';
import searchSlice from './searchSlice';
import  loadingSlice  from './loadingSlice';
import ratedsSlice  from './ratedSlice';
// Configuration de persistance
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
 blacklist: ['loading'], // Exclure le navSlice de la persistance

};

// Appliquer persistReducer pour chaque slice
const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedCartReducer = persistReducer(persistConfig, cartSlice);
const persistedFavoritesReducer = persistReducer(persistConfig, favoritesSlice);
const persistedSearchReducer = persistReducer(persistConfig, searchSlice);
const persistedLoadingReducer = persistReducer(persistConfig, loadingSlice);
const persistedRatedsReducer = persistReducer(persistConfig, ratedsSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: persistedCartReducer,
    favorites: persistedFavoritesReducer,
    search: persistedSearchReducer,
    loading: persistedLoadingReducer,
    rated: persistedRatedsReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Vous pouvez désactiver cette vérification uniquement pour redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
