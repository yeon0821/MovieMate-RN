import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type PropsWithChildren } from 'react';
import { RootStackParmList } from './src/types';
import MoviesScreen from './src/screens/MoviesScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const Stack = createNativeStackNavigator<RootStackParmList>();

const queryClient = new QueryClient()



const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Movies" component={MoviesScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}

export default App;
