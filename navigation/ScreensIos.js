import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "../components/Icon";
import { nowTheme } from "../constants";
import About from "../screens/About";
import ArticleDetail from "../screens/ArticleDetail";
import Articles from "../screens/Articles";
import Category from "../screens/Category";
import Feedback from "../screens/Feedback";
import HealthOrganize from "../screens/HealthOrganize"; 
import Home from "../screens/Home"; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CategoryStack = props => (
	<Stack.Navigator>
		<Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
		<Stack.Screen name="Article" component={Articles} options={{ headerShown: false }} />
		<Stack.Screen name="ArticleDetail" component={ArticleDetail} options={{ headerShown: false }} />
	</Stack.Navigator>
);

function HomeStack(props) {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					let family;
					if (route.name === "TabCategory") {
						iconName = focused ? "news" : "news";
						family = "Entypo";
					} else if (route.name === "Feedback") {
						iconName = focused ? "feedback" : "feedback";
						family = "MaterialIcons";
					}
					else if (route.name === "TabHome") {
						iconName = focused ? "home" : "home";
						family = "MaterialIcons";
					}
					// else if (route.name === "Map") {
					// 	iconName = focused ? "map" : "map";
					// 	family = "Feather";
					// }
					else if (route.name === "Health") {
						iconName = focused ? "healing" : "healing";
						family = "MaterialIcons";
					}
					return <Icon family={family} name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: nowTheme.COLORS.MENU_ITEM,
				tabBarInactiveTintColor: "gray",
				tabBarStyle: { position: "absolute" },
				tabBarHideOnKeyboard: true
			})}
		>
			<Tab.Screen
				name="TabHome"
				component={Home}
				options={{ headerTitle: "Trang chủ", tabBarLabel: "Trang chủ" }}
			/>
			<Tab.Screen
				name="TabCategory"
				component={CategoryStack}
				options={{ headerTitle: "Tin tức", tabBarLabel: "Tin tức" }}
			/>
			{/* <Tab.Screen name="Map" component={Map} options={{ headerTitle: "Bản đồ", tabBarLabel: "Bản đồ" }} /> */}
			<Tab.Screen
				name="Health"
				component={HealthOrganize}
				options={{ headerTitle: "Đơn vị y tế", tabBarLabel: "Đơn vị y tế" }}
			/>
			<Tab.Screen name="Feedback" component={Feedback} options={{ headerTitle: "Góp ý", tabBarLabel: "Góp ý" }} />
		</Tab.Navigator>
	);
}

export default function RootNavigation(props) {
	return (
		<Stack.Navigator>
			<Stack.Screen name="About" component={About} options={{ headerShown: false }} />
			<Stack.Screen name="Categories" component={Category} options={{ headerShown: false }} />
			<Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}
