import { useState, useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Input from "./Input";
import {GlobalStyles} from '../constants/styles';
import { CurrentBooksContext } from '../store/current-books-context';
import { useNavigation } from '@react-navigation/native';
import { ReadBooksContext } from "../store/read-books-context";
import { deleteCurrentBook, storeReadBook, updateCurrentBook } from "../utils/http";

function UpdateForm({bookId}) {

	const [progressValue, setProgressValue] = useState('');

	function progressChangedHandler(enteredValue) {
		setProgressValue(enteredValue);
	};

	const currentCtx = useContext(CurrentBooksContext);
	const readCtx = useContext(ReadBooksContext);
	const navigation = useNavigation();

	function cancelHandler() {
		navigation.navigate('Overview');
	}

	function confirmHandler() {
		currentCtx.updateCurrentBook(bookId, {progress: progressValue});
		navigation.navigate('Overview');
	}

	function finishedHandler() {
		const book = currentCtx.books.filter((book) => book.id == bookId)[0];
		const bookData = {
			title: book.title,
			author: book.author,
			date_started: book.date_started,
			genre: book.genre,
			pages: book.pages,
			date_finished: new Date(),
			progress: 0
		}
		readCtx.addReadBook(bookData);
		currentCtx.deleteCurrentBook(bookId);
		navigation.navigate('Overview');
	}

	return (
		<View>
			<View>
			<Input label="I am on page..." textInputConfig={{
			keyboardType: 'number-pad',
			onChangeText: progressChangedHandler,
			value: progressValue,
			}}/>
			</View>
			<View style={styles.row}>
			<TouchableOpacity style={styles.cancel} onPress={cancelHandler}> 
				<Text style={styles.cancelText}>Cancel</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.confirm} onPress={confirmHandler}>
				<Text style={styles.confirmText}>Confirm</Text>
			</TouchableOpacity>
			</View>
			<View style={styles.row}>
				<TouchableOpacity style={styles.finished} onPress={finishedHandler}> 
					<Text style={styles.confirmText}>I Have Finished This Book</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default UpdateForm;

const styles = StyleSheet.create({
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
	},
	finished: {
		backgroundColor: GlobalStyles.colors.accent1,
		padding: 10,
		borderRadius: 10,
		width: '90%',
		shadowColor: GlobalStyles.colors.dark,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
})