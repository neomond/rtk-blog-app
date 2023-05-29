import React, {useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlogScreen from './src/screens/BlogScreen';
import BlogItemDetailScreen from './src/screens/BlogItemDetailScreen';
import {AppDispatch, store} from './src/redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlogItems, StackParamList, TabParamList} from './src/models';
import CreateScreen from './src/screens/CreateScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function BottomTabs() {
  const dispatch = useDispatch<AppDispatch>();
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
            <Ionicons name="home" color={color} size={size} />
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
            <Ionicons name="create" color={color} size={size} />
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
          headerRight: () => <Ionicons name="create" size={24} color={'red'} />,
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
