import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useState, useContext } from 'react';
import Input from './Input';
import { GlobalStyles } from '../constants/styles';
import { WantBooksContext } from '../store/want-books-context';
import { useNavigation } from '@react-navigation/native';
import { storeWantBook } from '../utils/http';

function AddBookForm() {

	const [inputValues, setInputValues] = useState({
		title: '',
		author: '',
		genre: '',
		pages: '',
		description: '',
	});

	function inputChangedHandler(inputIdentifier, enteredValue) {
		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				[inputIdentifier]: enteredValue,
			};
		});
	};

	const navigation = useNavigation();

	function cancelHandler() {
		navigation.navigate('Overview');
	}

	const wantBookCtx = useContext(WantBooksContext);

	function confirmHandler() {
		const bookData = {
			title: inputValues.title,
			author: inputValues.author,
			genre: inputValues.genre,
			pages: +inputValues.pages,
			description: inputValues.description,
			date_added: new Date(),
		}
		wantBookCtx.addWantBook(bookData)
		navigation.navigate('Overview');
	}

	return (<View>
		<Input label="Title" textInputConfig={{
			keyboardType: 'default',
			autoCapitalize: 'words',
			onChangeText: inputChangedHandler.bind(this, 'title'),
			value: inputValues.title
		}}/>
		<Input label="Author" textInputConfig={{
			keyboardType: 'default',
			onChangeText: inputChangedHandler.bind(this, 'author'),
			value: inputValues.author
		}}/>
		<Input label="Genre" textInputConfig={{
			keyboardType: 'default',
			onChangeText: inputChangedHandler.bind(this, 'genre'),
			value: inputValues.genre
		}}/>
		<Input label="Pages" textInputConfig={{
			keyboardType: 'number-pad',
			onChangeText: inputChangedHandler.bind(this, 'pages'),
			value: inputValues.pages
		}}/>
		<Input label="Description" textInputConfig={{
			multiline: true,
			keyboardType: 'default',
			onChangeText: inputChangedHandler.bind(this, 'description'),
			value: inputValues.description
		}}/>
		<View style={styles.row}>
			<TouchableOpacity style={styles.cancel}> 
				<Text style={styles.cancelText} onPress={cancelHandler}>Cancel</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.confirm} onPress={confirmHandler}>
				<Text style={styles.confirmText}>Confirm</Text>
			</TouchableOpacity>
		</View>
	</View>
	);
}

export default AddBookForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.back,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: '5%'
	},
	cancel: {
		backgroundColor: GlobalStyles.colors.light,
		padding: 10,
		borderRadius: 10,
		width: '40%',
		shadowColor: GlobalStyles.colors.accent1,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
	cancelText: {
		fontSize: 24,
		textAlign: 'center',
	},
	confirm: {
		backgroundColor: GlobalStyles.colors.accent2,
		padding: 10,
		borderRadius: 10,
		width: '40%',
		shadowColor: GlobalStyles.colors.dark,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
	confirmText: {
		fontSize: 24,
		color: 'white',
		textAlign: 'center'
	}
})