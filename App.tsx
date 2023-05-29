import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BlogScreen from './src/screens/BlogScreen';
import BlogItemDetailScreen from './src/screens/BlogItemDetailScreen';
import {store} from './src/redux/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackParamList, TabParamList} from './src/models';
import CreateScreen from './src/screens/CreateScreen';

const Tab = createBottomTabNavigator<TabParamList>();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#252525',
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Blogs"
        component={BlogScreen}
        options={{
          headerShown: false,
          headerRight: () => (
            <Ionicons
              name="create"
              size={24}
              color={'red'}
              onPress={() => setModalVisible(true)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="BlogDetails"
        component={BlogItemDetailScreen}
        options={{title: 'Blog Details'}}
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
