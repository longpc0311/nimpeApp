import { Picker } from "@react-native-picker/picker";
import { DrawerActions } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { BackHandler, Text, Switch, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import About from "../screens/About";
import ArticleDetail from "../screens/ArticleDetail";
import Articles from "../screens/Articles";
import Category from "../screens/Category";
import Feedback from "../screens/Feedback";
import HealthOrganize from "../screens/HealthOrganize";
import Home from "../screens/Home";
import AboutCopy from "../screens/AboutCopy";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const { t, i18n } = props;

	// const [isEnabled, setIsEnabled] = useState(true);

	// const toggleSwitch = () => {
	// 	setIsEnabled(prevState => !prevState);
	// };

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			
			{Platform.OS === "android" && (
				<DrawerItem
					icon={({ focused, color, size }) => (
						<Icon color={"#000"} size={24} name={focused ? "exit" : "exit-outline"} />
					)}
					onPress={() => BackHandler.exitApp()}
					label={t("exitApp")}
				/>
			)}
		</DrawerContentScrollView>
	);
}

const CategoryStack = props => (
	<Stack.Navigator initialRouteName="Category">
		<Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />
		<Stack.Screen name="Article" component={Articles} options={{ headerShown: false }} />
		<Stack.Screen
			name="ArticleDetail"
			component={ArticleDetail}
			options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }}
		/>
	</Stack.Navigator>
);

const MenuStack = props => {
	const { t } = props;

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={{
				drawerStatusBarAnimation: "none"
			}}
			drawerContent={contentProps => <CustomDrawerContent {...props} {...contentProps} />}
		>
			<Drawer.Screen
				name="Home"
				component={Home}
				options={{
					drawerLabel: t("home"),
					drawerIcon: ({ focused, color, size }) => (
						<Icon color={"black"} size={24} name={focused ? "home" : "home-outline"} />
					)
				}}
			/>
			<Drawer.Screen
				name="Categories"
				component={CategoryStack}
				options={{
					title: t("newsCategory"),
					drawerIcon: ({ focused, color, size }) => (
						<Icon color={"black"} size={24} name={focused ? "shapes" : "shapes-outline"} />
					)
				}}
			/>
			<Drawer.Screen
				name="Health"
				component={HealthOrganize}
				options={{
					title: t("nearestMedical"),
					drawerIcon: ({ focused, color, size }) => (
						<Icon color={"black"} size={24} name={focused ? "medkit" : "medkit-outline"} />
					)
				}}
			/>
			<Drawer.Screen
				name="Feedback"
				component={Feedback}
				options={{
					title: t("feedback"),
					drawerIcon: ({ focused, color, size }) => (
						<Icon color={"black"} size={24} name={focused ? "chatbubbles" : "chatbubbles-outline"} />
					)
				}}
			/>
		</Drawer.Navigator>
	);
};

const RootNavigation = props => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="About"
				component={About}
				options={{
					headerShown: false,
					gestureEnabled: false
				}}
			/>
			<Stack.Screen
				name="Menu"
				
				children={() => <MenuStack {...props} />}
				options={({ navigation }) => ({
					headerStyle: {
						height: 80,
						elevation: 0
					},
					gestureEnabled: false,
					headerLeft: props => (
						<Icon
							{...props}
							{...navigation}
							onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
							name="grid-outline"
							size={25}
							style={{ paddingLeft: 20 }}
						/>
					),
					headerTitle: props => (
						<Text
							{...props}
							{...navigation}
							style={{ textAlign: "center", fontSize: 20, fontWeight: "700" }}
							onPress={() => navigation.navigate("Home")}
						>
							Cảnh báo tình hình dịch
						</Text>
					),
					headerRight: props => (
						<Icon
							{...props}
							{...navigation}
							name="medkit-outline"
							size={25}
							style={{ paddingRight: 20 }}
							onPress={() => navigation.navigate("Health")}
						/>
					)
				})}
			/>
		</Stack.Navigator>
	);
};

export default withTranslation()(RootNavigation);
