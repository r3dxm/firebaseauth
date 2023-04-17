import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { auth } from "../firebase";

function HomeScreen(props) {
	const navigation = useNavigation();

	const handleSignout = () => {
		signOut(auth)
			.then(() => {
				navigation.navigate("Login");
			})
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.container}>
			<Text>Email : {auth.currentUser.email}</Text>
			<TouchableOpacity onPress={handleSignout} style={styles.button}>
				<Text style={styles.buttonText}>Sign out</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#0782F9",
		width: "60%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 40,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default HomeScreen;
