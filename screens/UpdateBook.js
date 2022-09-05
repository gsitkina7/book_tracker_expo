import { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { CurrentBooksContext } from '../store/current-books-context';
import UpdateForm from '../components/UpdateForm';

function UpdateBook({route, navigation}) {

	const bookId = route.params.currentBookId;

	return (
		<View style={styles.container}>
			<UpdateForm bookId={bookId} />
		</View>
	);
}

export default UpdateBook;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.back
	},
})