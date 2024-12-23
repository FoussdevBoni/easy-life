import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Home from '../../../../screens/Client/SUPERMARKET/mains/Home';
import Articles from '../../../../screens/Client/SUPERMARKET/list/Articles';
import Article from '../../../../screens/Client/SUPERMARKET/details/Article';
import Categories from '../../../../screens/Client/SUPERMARKET/list/CategoriesList';
import Categorie from '../../../../screens/Client/SUPERMARKET/details/Categorie';
import Search from '../../../../screens/Client/SUPERMARKET/list/Search';
import SearchResults from '../../../../screens/Client/SUPERMARKET/list/SearchResult';
import Supermarkets from '../../../../screens/Client/SUPERMARKET/list/Supermarkets';
import Supermarket from '../../../../screens/Client/SUPERMARKET/details/Supermarket';
import Cart from '../../../../screens/Client/SUPERMARKET/mains/Cart';
import CoursesFavorites from '../../../../screens/Client/SUPERMARKET/list/Favorites';
import ArticleCommandeForm from '../../../../screens/Client/SUPERMARKET/form/CommandeForm';
import ArticlesByCategory from '../../../../screens/Client/SUPERMARKET/list/ArticlesByCategory';


const getGestureDirection = (route) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};
 const Stack = createStackNavigator()
function SuperMarketNavigation() {
     
    const user = useSelector((state) => state.user.userData);

    useEffect(()=>{
   
    } , [user])


    return (
     <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, 
        })} 
      >
        
           <Stack.Screen name="supermarket-home" options={{ headerShown: false }}>
           {(props) => <Home {...props} user={user} />}
         </Stack.Screen>

           <Stack.Screen name="articles-list" options={{ headerShown: false }}>
           {(props) => <Articles {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="article-details" options={{ headerShown: false }}>
           {(props) => <Article {...props} user={user} />}
         </Stack.Screen>
         <Stack.Screen name="categories" options={{ headerShown: false }}>
           {(props) => <Categories {...props} user={user} />}
         </Stack.Screen>
         <Stack.Screen name="categorie-details" options={{ headerShown: false }}>
           {(props) => <Categorie {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="search" options={{ headerShown: false }}>
           {(props) => <Search {...props} user={user} />}
         </Stack.Screen>

         <Stack.Screen name="search-results" options={{ headerShown: false }}>
           {(props) => <SearchResults {...props} user={user} />}
         </Stack.Screen>

           <Stack.Screen name="supermarkets-list" options={{ headerShown: false }}>
           {(props) => <Supermarkets {...props} user={user} />}
         </Stack.Screen>

           <Stack.Screen name="supermarket-details" options={{ headerShown: false }}>
           {(props) => <Supermarket {...props} user={user} />}
         </Stack.Screen>

         <Stack.Screen name="cart" options={{ headerShown: false }}>
           {(props) => <Cart {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="favorites" options={{ headerShown: false }}>
           {(props) => <CoursesFavorites {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="article-commande-form" options={{ headerShown: false }}>
           {(props) => <ArticleCommandeForm {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="articles-by-category" options={{ headerShown: false }}>
           {(props) => <ArticlesByCategory {...props} user={user} />}
         </Stack.Screen>


      </Stack.Navigator>
    );
}

export default SuperMarketNavigation;