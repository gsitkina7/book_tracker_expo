import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

function Input({label, textInputConfig}) {

	const inputStyles = [styles.input];
	
	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	return (<View style={styles.inputContainer}>
		<Text style={styles.label}>{label}</Text>
		<TextInput style={inputStyles} {...textInputConfig} />
	</View>);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: '3%',
		marginVertical: '5%',
		backgroundColor: GlobalStyles.colors.back,
	},
	label: {
		fontSize: 20,
	},
	input: {
		backgroundColor: GlobalStyles.colors.light,
		padding: 10,
		borderRadius: 5,
		fontSize: 24,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top'
	}
})