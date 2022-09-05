import { useContext, useLayoutEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BookDetails from '../components/BookDetails';
import { GlobalStyles } from '../constants/styles'
import { ReadBooksContext } from '../store/read-books-context';
import { WantBooksContext } from '../store/want-books-context';
import { CurrentBooksContext } from '../store/current-books-context';
import { deleteCurrentBook, storeCurrentBook } from '../utils/http';
import ErrorOverlay from '../UI/ErrorOverlay';

function BookInfo({route, navigation}) {

	const bookInfoTitle = route.params?.bookInfoTitle;
	const fromRead = route.params?.fromRead;
	const bookInfoId = route.params.bookInfoId;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: bookInfoTitle,
		})
	}, [navigation, bookInfoTitle]);

	// is the book from want to read or read
	if (fromRead == 1){
		var ctx = useContext(ReadBooksContext);
	} else {
		var ctx = useContext(WantBooksContext);
	}

	function deleteHandler(){
		if (fromRead == 1){
			ctx.deleteReadBook(bookInfoId);
		} else {
			ctx.deleteWantBook(bookInfoId);
		}
		navigation.goBack();
	}

	const currentCtx = useContext(CurrentBooksContext);

	async function readHandler(){
		const book = ctx.books.filter((book) => book.id == bookInfoId)[0];
		const bookData = {
			title: book.title,
			author: book.author,
			genre: book.genre,
			pages: book.pages,
			date_started: new Date(),
			description: book.description,
			progress: 0,
		}
		currentCtx.addCurrentBook({...bookData, id:id});
		ctx.deleteWantBook(bookInfoId);
		navigation.goBack();
	}
	
	const book = ctx.books.filter((book) => book.id == bookInfoId)[0];

	return (
		<View style={styles.container}>
			<BookDetails book={book}/>
			<View style={styles.row}>
				<TouchableOpacity style={styles.delete} onPress={deleteHandler}> 
					<Text style={styles.deleteText}>Delete Book</Text>
				</TouchableOpacity>
				{ fromRead != 1 &&
				<TouchableOpacity style={styles.read} onPress={readHandler}> 
					<Text style={styles.deleteText}>Start Reading</Text>
				</TouchableOpacity>
				}
			</View>
		</View>
	);
}

export default BookInfo;

const styles = StyleSheet.create({
	container: {
		backgroundColor: GlobalStyles.colors.back
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: '5%',
	},
	delete: {
		backgroundColor: GlobalStyles.colors.accent1,
		padding: 10,
		borderRadius: 10,
		width: '45%',
		shadowColor: GlobalStyles.colors.accent1,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
	deleteText: {
		fontSize: 24,
		textAlign: 'center',
		color: 'white'
	},
	read: {
		backgroundColor: GlobalStyles.colors.accent2,
		padding: 10,
		borderRadius: 10,
		width: '45%',
		shadowColor: GlobalStyles.colors.dark,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
	},
})