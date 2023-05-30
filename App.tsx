import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Provider, useSelector} from 'react-redux';
import {BlogItems, StackParamList, TabParamList} from './src/models';
import {store} from './src/redux/store';
import BlogItemDetailScreen from './src/screens/BlogItemDetailScreen';
import BlogScreen from './src/screens/BlogScreen';
import CreateScreen from './src/screens/CreateScreen';
import LikedScreen from './src/screens/LikedScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function BottomTabs() {
  const {theme} = useSelector((state: BlogItems) => state.blogSlice);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme === 'dark' ? '#A059F1' : '#FE4962',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#151517' : '#ffffff',
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="planet" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={CreateScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Liked"
        component={LikedScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-circle-outline" color={color} size={size} />
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
      <Stack.Screen
        name="Blogs"
        component={BlogScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogItemDetailScreen}
        options={{headerShown: false, title: 'Blog Details'}}
      />
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
