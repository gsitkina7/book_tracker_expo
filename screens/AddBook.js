import { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AddBookForm from '../components/AddBookForm';
import { GlobalStyles } from '../constants/styles';
import { WantBooksContext } from '../store/want-books-context';

function AddBook() {

	return (
		<View style={styles.container}>
			<AddBookForm />
		</View>
	);
}

export default AddBook;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.back,
	},
})