import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'black', // Hace el fondo transparente
                    borderTopWidth: 0, // Elimina el borde superior
                    elevation: 0, // Elimina la sombra en dispositivos Android
                    position: 'absolute', // Asegura que la barra de pestañas quede sobre el contenido
                },                
                tabBarBackground: () => (
                    <BlurView intensity={50} style={{ flex: 1 }} /> // Aplica el blur
                ), // Aplica el blur sobre la barra

            }}
        >
            <Tab.Screen
                name="AudioList"
                component={AudioList}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name="music" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Player"
                component={Player}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <Ionicons name="headset-outline" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="PlayList"
                component={PlayList}
                options={{
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name="playlist-play" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigator;

