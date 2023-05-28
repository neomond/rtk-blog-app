import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from './src/screens/SettingsScreen';
import BlogScreen from './src/screens/BlogScreen';
import BlogItemDetailScreen from './src/screens/BlogItemDetailScreen';
import {store} from './src/redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackParamList, TabParamList} from './src/models';

const Tab = createBottomTabNavigator<TabParamList>();
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator<StackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Blogs" component={BlogScreen} />
      <Stack.Screen name="BlogDetails" component={BlogItemDetailScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
