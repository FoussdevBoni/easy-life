import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Landing from '../../../screens/Client/COURSES/Landing';
import Home from '../../../screens/Client/COURSES/Home';
import SuperMarketNavigation from './SUPERMARKET/Navigation';
import Cart from '../../../screens/Client/COURSES/Cart';
import ArticleCommandeForm from '../../../screens/Client/SUPERMARKET/form/CommandeForm';
import PharmacieNavigation from './PHARMACIE/Navigation';
import Profile from '../../../screens/Client/COURSES/Profile';
import ChatBox from '../../../screens/Client/COURSES/ChatBox';
import CoursesFavorites from '../../../screens/Client/COURSES/Favorites';
import MedicoCommandeForm from '../../../screens/Client/PHARMACIE/form/CommandeForm';
import Notifications from '../../../screens/Common/list/Notifications';
import { colors } from '../../../assets/colors/colors';
import RechargeAccount from '../../../screens/Client/COMMON/forms/RechargeAccount';


const getGestureDirection = (route) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};
 const Stack = createStackNavigator()
function Client() {
     
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
                 
        <Stack.Screen name="course-landing" options={{ headerShown: false }}>
           {(props) => <Landing {...props} user={user} />}
         </Stack.Screen>
         <Stack.Screen name="course-home" options={{ headerShown: false }}>
           {(props) => <Home {...props} user={user} />}
         </Stack.Screen>
          <Stack.Screen name="supermarket-nav" options={{ headerShown: false }}>
           {(props) => <SuperMarketNavigation {...props} user={user} />}
         </Stack.Screen>
          <Stack.Screen name="pharmacie-nav" options={{ headerShown: false }}>
           {(props) => <PharmacieNavigation {...props} user={user} />}
         </Stack.Screen>
         

          <Stack.Screen name="profile" options={{ headerShown: false }}>
           {(props) => <Profile {...props} user={user} />}
         </Stack.Screen>
         <Stack.Screen name="chat-box" options={{ headerShown: false }}>
           {(props) => <ChatBox {...props} user={user} />}
         </Stack.Screen>

          <Stack.Screen name="notifications" options={{ headerShown: false }}>
           {(props) => <Notifications color={colors.secondary} {...props} user={user} />}
         </Stack.Screen>
            <Stack.Screen name="recharge-account" options={{ headerShown: false }}>
           {(props) => <RechargeAccount color={colors.secondary} {...props} user={user} />}
         </Stack.Screen>
      </Stack.Navigator>
    );
}

export default Client;