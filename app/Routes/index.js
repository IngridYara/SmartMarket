import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useEffect} from 'react';
import Carrinho from '../Screens/Carrinho';
import Lista from '../Screens/Lista';
import Atualizar from '../Screens/Atualizar';
import Logout from '../Screens/Logout';
import Login from '../Screens/Login';
import RedefinicaoSenha from '../Screens/RedefinicaoSenha';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes(props) {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#788eec',
                tabBarInactiveTintColor: '#gray',
                headerShown: true,
            }}
        >

            <Tab.Screen
                name="Carrinho"
                component={Carrinho}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        
                        if(focused) {
                            return <Ionicons name="cart" size={size} color={color} />
                        } 
                        
                        return <Ionicons name="cart-outline" size={size} color={color} />
                    }
                }}
            />

            <Tab.Screen
                name="Lista"
                component={Lista}
                options={{
                    tabBarIcon: ({color, size, focused}) => {

                        const iconName = focused ? 'list' : 'list-outline';
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                }}
            />

            <Tab.Screen
                name="Atualizar"
                component={Atualizar}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        return <Ionicons name={focused ? "pencil" : "pencil-outline"} size={size} color={color} />;
                    }
                }}
            />

            <Tab.Screen
                name="Logout"
                component={Logout}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        
                        if(focused) {
                            return <Ionicons name="log-out" size={size} color={color} />
                        } 
                        
                        return <Ionicons name="log-out-outline" size={size} color={color} />
                    }
                }}
            />


        </Tab.Navigator>
    );
}