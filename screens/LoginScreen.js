import { useNavigation } from "@react-navigation/native";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	StyleSheet,
	View,
	TextInput,
	TouchableOpacity,
	Text,
} from "react-native";
import { auth } from "../firebase";

function LoginScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				navigation.replace("Home");
			}
		});

		return unsubscribe;
	}, []);

	const handleSignup = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log("Registered", user.email);
			})
			.catch((error) => alert(error.message));
	};

	const handleSignin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;
				console.log("Logged in with", user.email);
			})
			.catch((error) => alert(error.message));
	};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour={"padding"}>
			<View style={styles.inputContainer}>
				<TextInput
					value={email}
					onChangeText={(text) => setEmail(text)}
					placeholder="Email"
					style={styles.input}
				/>
				<TextInput
					value={password}
					onChangeText={(text) => setPassword(text)}
					placeholder="Password"
					secureTextEntry
					style={styles.input}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleSignin} style={styles.button}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleSignup}
					style={[styles.button, styles.buttonOutline]}>
					<Text style={styles.buttonOutlineText}>Register</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#0782F9",
		width: "100%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonContainer: {
		width: "60%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	buttonOutline: {
		backgroundColor: "white",
		borderColor: "#0782F9",
		marginTop: -35,
		borderWidth: 2,
	},
	buttonOutlineText: {
		color: "#0782F9",
		fontWeight: "700",
		fontSize: 16,
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
	input: {
		backgroundColor: "white",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
	inputContainer: {
		width: "80%",
	},
});

export default LoginScreen;
