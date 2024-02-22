import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Collection from './src/screen/collection/index';

import PaintingDetails from './src/screen/pantingdetail/index';
import Painting from './src/screen/panting/index';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Collection" component={Collection} />
        <Tab.Screen name="Painting" component={PaintingStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const PaintingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Painting" component={Painting} />
      <Stack.Screen name="PaintingDetails" component={PaintingDetails} />
    </Stack.Navigator>
  );
};

export default App;
