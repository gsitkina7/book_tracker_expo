import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function IconButton({ icon, size, color }) {

	const navigation = useNavigation();

	function iconPressHandler() {
		navigation.navigate('AddBook');
	}

	return (
	<TouchableOpacity onPress={iconPressHandler}>
		<View style={styles.buttonContainer}>
			<Ionicons name={icon} size={size} color={color} />
		</View>
	</TouchableOpacity>);
}

export default IconButton;

const styles = StyleSheet.create({
	buttonContainer: {
		padding: '2%',
		margin: '3%',
		borderRadius: 20
	},
})