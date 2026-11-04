import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Routes from './Routes/index';
import DataProvider from './DataContext/index';
import Login from './Screens/Login';

const auth = getAuth();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    
    const checkLoginStatus = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user);
    });

  }, []);

  return (
    <NavigationContainer>
      <DataProvider>

        <Routes />
        
        {/* {isLoggedIn ? <Routes /> : <Login />} */}
      
      </DataProvider>
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
