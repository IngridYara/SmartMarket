import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Routes from './Routes/index';
import DataProvider from './DataContext/index';
import Login from './Screens/Login';
import RedefinicaoSenha from './Screens/RedefinicaoSenha';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Stack = createNativeStackNavigator();
  const auth = getAuth();

  useEffect(() => {

    const checkLoginStatus = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
    });

  }, []);

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Routes" component={Routes} options={{ headerShown: false }} />
        <Stack.Screen name="RedefinicaoSenha" component={RedefinicaoSenha} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
