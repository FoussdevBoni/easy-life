import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Home from '../../../../screens/Client/PHARMACIE/mains/Home';
import Medicament from '../../../../screens/Client/PHARMACIE/details/Medicament';
import Medicaments from '../../../../screens/Client/PHARMACIE/list/Medicaments';
import SearchResults from '../../../../screens/Client/PHARMACIE/list/SearchResult';
import Search from '../../../../screens/Client/PHARMACIE/list/Search';
import Pharmacies from '../../../../screens/Client/PHARMACIE/list/Pharmacies';
import Pharmacie from '../../../../screens/Client/PHARMACIE/details/Pharmacie';
import MedicoCommandeForm from '../../../../screens/Client/PHARMACIE/form/CommandeForm';
import Cart from '../../../../screens/Client/PHARMACIE/mains/Cart';
import CoursesFavorites from '../../../../screens/Client/PHARMACIE/list/Favorites';


const getGestureDirection = (route) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};
 const Stack = createStackNavigator()
function PharmacieNavigation() {
     
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
           <Stack.Screen name="pharmacie-home" options={{ headerShown: false }}>
           {(props) => <Home {...props} user={user} />}
         </Stack.Screen>

           <Stack.Screen name="medicaments-list" options={{ headerShown: false }}>
           {(props) => <Medicaments {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="medicament-details" options={{ headerShown: false }}>
           {(props) => <Medicament {...props} user={user} />}
         </Stack.Screen>
             <Stack.Screen name="search" options={{ headerShown: false }}>
           {(props) => <Search {...props} user={user} />}
         </Stack.Screen>

         <Stack.Screen name="search-results" options={{ headerShown: false }}>
           {(props) => <SearchResults {...props} user={user} />}
         </Stack.Screen>
         
         <Stack.Screen name="pharmacies-list" options={{ headerShown: false }}>
           {(props) => <Pharmacies {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="pharmacie" options={{ headerShown: false }}>
           {(props) => <Pharmacie {...props} user={user} />}
         </Stack.Screen>
         
         <Stack.Screen name="medico-commande-form" options={{ headerShown: false }}>
           {(props) => <MedicoCommandeForm {...props} user={user} />}
         </Stack.Screen>

         <Stack.Screen name="cart" options={{ headerShown: false }}>
           {(props) => <Cart {...props} user={user} />}
         </Stack.Screen>
        <Stack.Screen name="favorites" options={{ headerShown: false }}>
           {(props) => <CoursesFavorites {...props} user={user} />}
         </Stack.Screen>


         


      </Stack.Navigator>
    );
}

export default PharmacieNavigation;