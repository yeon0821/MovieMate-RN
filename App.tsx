import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParmList } from './src/types';
import MoviesScreen from './src/screens/movie/MoviesScreen';
import { QueryClient, QueryClientProvider } from 'react-query'
import DetailScreen from './src/screens/detail/DetailScreen';


const Stack = createNativeStackNavigator<RootStackParmList>();

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Movies"  component={MoviesScreen} />
                    <Stack.Screen name="Detail" component={DetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </QueryClientProvider>
    )
}

export default App;
