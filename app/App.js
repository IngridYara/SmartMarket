import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Routes from './Routes/index';
import DataProvider from './DataContext/index';
import Login from './Screens/Login';
import RedefinicaoSenha from './Screens/RedefinicaoSenha';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {auth} from './Database/Firebase'

export default function App() {

  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  if (loading) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#788eec" />
      </View>
    )
  }
  return (

    <NavigationContainer>
      <Stack.Navigator>

        {user ?
          <Stack.Screen name='MainTabs' component={Routes} options={{ headerShown: false }}/> :
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="RedefinicaoSenha" component={RedefinicaoSenha} />
          </>}

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
