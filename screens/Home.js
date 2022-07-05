import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Images, nowTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

class Home extends Component {
	render() {
		const { t } = this.props;

		return (
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<Text style={{ fontSize: 20, fontWeight: "700", textAlign: "center", color: "red" }}>Demo ứng dụng cảnh báo tình hình dịch với react native</Text>
					<TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate("Categories")}>
						<Text style={styles.title}>{t("dengueNews")}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between"
	},
	card: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: nowTheme.COLORS.MENU_ITEM,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginTop: 10
	},
	icon: {
		fontSize: 30,
		padding: 15,
		paddingBottom: 40,
		color: "#fff"
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		padding: 10,
		color: "#fff"
	}
});

export default withTranslation()(Home);
