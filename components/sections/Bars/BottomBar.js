import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { View } from 'react-native';
import { colors } from "../../../assets/colors/colors";
import TabAppBar from "./TabAppbar";

const Tab = createBottomTabNavigator();

const TabNavigator = ({ user, components, items }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, // Cacher les labels
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 60, // Hauteur de la barre de navigation
        },
        header: () => (
          <TabAppBar user={user} />
        ),
      })}
    >
      {items.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          initialParams={{ user: user }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  backgroundColor: focused ? 'white' : 'transparent',
                  borderRadius: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 50,
                  height: 50,
                  padding: 5, // Ajouter du padding pour bien centrer l'icône
                  borderWidth: focused ? 2 : 0, // Ajouter une bordure si actif
                  borderColor: colors.primary, // Couleur de la bordure
                }}
              >
                {index !== 1 ? (
                  <MaterialIcons name={item.icon} size={26} color={focused ? colors.primary : 'white'} />
                ) : (
                  <Ionicons name={item.icon} size={26} color={focused ? colors.primary : 'white'} />
                )}
              </View>
            ),
            headerTitleStyle: {
              color: 'white',
              textAlign: 'center',
              flex: 0,
            },
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          {props => components[index]}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

export default TabNavigator;
