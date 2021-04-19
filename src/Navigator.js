import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/FontAwesome"

import Feed from "./screens/Feed"
import AddPhoto from "./screens/AddPhoto"
import Profile from "./screens/Profile"
import Login from "./screens/Login"
import Register from "./screens/Register"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Auth" options={{title: "Login"}} component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

const MenuNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName
                        if (route.name == "Feed") {
                            iconName = "home"
                        } else if (route.name == "AddPhoto") {
                            iconName = "camera"
                        } else {
                            iconName = "user"
                        }

                        return <Icon name={iconName} size={30} color={focused ? "#4286f4" : "gray"} />

                    }
                })}
                tabBarOptions={{
                    activeTintColor: "blue",
                    showLabel: false
                }}
            >
                <Tab.Screen name="Feed" component={Feed} />
                <Tab.Screen name="AddPhoto" component={AddPhoto} />
                <Tab.Screen name="Profile" component={StackNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MenuNavigator