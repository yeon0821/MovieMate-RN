import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {type PropsWithChildren} from 'react';
import { RootStackParmList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen';


const Stack = createNativeStackNavigator<RootStackParmList>()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Movies" component={MoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
