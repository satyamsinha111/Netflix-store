import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homescreen from './screens/Homescreen';
import Editscreen from './screens/Editscreen';
import Addscreen from './screens/Addscreen';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            title: 'List of seasons',
            headerStyle: {
              backgroundColor: '#2112ed',
              height: 70,
            },
            headerTintColor: '#eee',
            headerTitleAlign: 'center',
          }}
          component={Homescreen}
        />
        <Stack.Screen
          name="Edit"
          options={{
            title: 'Edit collection',
            headerStyle: {
              backgroundColor: '#2112ed',
              height: 70,
            },
            headerTintColor: '#eee',
            headerTitleAlign: 'center',
          }}
          component={Editscreen}
        />
        <Stack.Screen
          name="Add"
          options={{
            title: 'Add collection',
            headerStyle: {
              backgroundColor: '#2112ed',
              height: 70,
            },
            headerTintColor: '#eee',
            headerTitleAlign: 'center',
          }}
          component={Addscreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
