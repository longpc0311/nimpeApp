import CryptoJS from "crypto-js";
import * as IntentLauncher from "expo-intent-launcher";
import * as Location from "expo-location";
import * as Network from "expo-network";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Block, Button } from "galio-framework";
import React, { useContext, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import * as BackgroundFetch from "expo-background-fetch";
import {
	Alert,
	Dimensions,
	Image,
	Linking,
	PermissionsAndroid,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Images } from "../constants";
import { Context } from "../context";
import { countNotification, getAllDengueLocation } from "../services/DegueLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("screen");
const TASK_SHOW_ALERT = "TASK_SHOW_ALERT";

const rad = x => {
	return (x * Math.PI) / 180;
};

const getDistance = (longitude1, latitude1, longitude2, latitude2) => {
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(latitude2 - latitude1);
	var dLong = rad(longitude2 - longitude1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(latitude1)) * Math.cos(rad(latitude2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d; // returns the distance in meter
};

const checkDistance = (listPatient, listDengue, latNew, longNew) => {
	let checkDengue = false;
	listPatient?.forEach(element => {
		let meter1 = getDistance(longNew, latNew, element.longitude, element.latitude);
		if (meter1 <= 200) {
			listDengue?.forEach(element2 => {
				let meter2 = getDistance(element.longitude, element.latitude, element2.longitude, element2.latitude);
				if (meter2 <= 200) {
					checkDengue = true;
				}
			});
		}
	});
	return checkDengue;
};

const decryptText = value => {
	let key = CryptoJS.enc.Utf8.parse("1234567890123456");
	let decryptedData = CryptoJS.AES.decrypt(value, key, {
		iv: key
	});
	return decryptedData.toString(CryptoJS.enc.Utf8);
};

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true
	})
});

function About(props) {
	// const { setIsActiveApp } = useContext(Context);

	const onHandleClick = () => {
		// setIsActiveApp(true);
		// startTaskServiceBackgroundWarningDengue();
		props.navigation.navigate("Menu");
	};

	 

	  

	useEffect(() => {
		// registerForPushNotificationsAsync();
		//handleNotification();
	}, []);

	return (
		<ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: "#fff" }}>
			<View style={styles.container}>
				<Block middle>
					<Image
						source={Images.aboutImage}
						style={{
							width: width * 0.3,
							height: width * 0.5
						}}
						resizeMode="contain"
						resizeMethod="auto"
					/>
				</Block>
				<Text style={styles.title}>{props.t("appInfo")}</Text>
				<Text style={styles.content}>
					<Text style={{ fontWeight: "700" }}>Dengue alert</Text> {props.t("infoDetail")}
				</Text>
				<Text style={styles.privacy}>
					<Icon color={"green"} size={18} name={"notifications"} /> {props.t("privacy")}
				</Text>
				<Block center>
					<Button color="success" onPress={onHandleClick} round>
						{props.t("agreeToUse")}
					</Button>
				</Block>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		overflow: "hidden",
		paddingHorizontal: 30,
		paddingVertical: 30,
		backgroundColor: "#fff"
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 20,
		marginTop: -20
	},
	content: {
		fontSize: 16,
		lineHeight: 28,
		textAlign: "left"
	},
	privacy: {
		fontSize: 13,
		fontWeight: "400",
		textAlign: "left",
		marginVertical: 15,
		lineHeight: 20
	}
});

export default withTranslation()(About);
