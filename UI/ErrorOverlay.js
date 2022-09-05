import { View, ActivityIndicator, StyleSheet, Button, Text } from 'react-native';
import { GlobalStyles } from '../constants/styles';

function ErrorOverlay({message, onConfirm}) {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occurred!</Text>
			<Text style={styles.text}>{message}</Text>
			<Button title="Okay" onPress={onConfirm}></Button>
		</View>
	)
};

export default ErrorOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: '3%',
		backgroundColor: GlobalStyles.colors.highlight,
	},
	text: {
		textAlign: 'center',
		marginBottom: '2%',
	},
	title: {
		fontSize: 20,
	}
})