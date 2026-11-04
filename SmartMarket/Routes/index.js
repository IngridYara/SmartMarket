import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './../Screens/Home';
import Carrinho from './../Screens/Carrinho';
import Detail from './../Screens/Detail';
import Login from './../Screens/Login';
import {Ionicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#788eec',
                tabBarInactiveTintColor: '#gray',
                headerShown: true,
            }}
        >

            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        
                        if(focused) {
                            return <Ionicons name="home" size={size} color={color} />
                        } 
                        
                        return <Ionicons name="home-outline" size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen
                name="Carrinho"
                component={Carrinho}
                options={{
                    tabBarIcon: ({color, size, focused}) => {

                        const iconName = focused ? 'information-circle' : 'information-circle-outline';
                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                }}
            />
            <Tab.Screen
                name="Detail"
                component={Detail}
                options={{
                    tabBarIcon: ({color, size, focused}) => {
                        return <Ionicons name={focused ? "pencil" : "pencil-outline"} size={size} color={color} />;
                    }
                }}
            />
        </Tab.Navigator>
    );
}