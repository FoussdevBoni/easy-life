import React, { useRef, useEffect, useState, useContext } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from '../../../screens/Visitor/forms/Login';
import HomeScreen from '../../../screens/Visitor/mains/Home';
import Register from '../../../screens/Visitor/forms/Register1';
import ForgotPasswordScreen from '../../../screens/Visitor/forms/ForgotPasswordScreen';
const Stack = createStackNavigator();

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};

const Visitor = () => {
 

  useEffect(() => {}, []);

  return (
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, 
        })} 
      >
        
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        
         <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />

         

         
      </Stack.Navigator>
  );
};

export default Visitor;
