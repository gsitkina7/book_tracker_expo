import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ReadBooksContext } from '../store/read-books-context';

function Read() {

	const navigation = useNavigation();

	const readBooksCtx = useContext(ReadBooksContext);

	function ListItem(book) {

		function bookPressHandler() {
			navigation.navigate('BookInfo', {
				bookInfoTitle: book.item.title,
				fromRead: 1,
				bookInfoId: book.item.id
			});
		}
	
		let date_started = book.item.date_started.getDate() + '/' + parseInt(book.item.date_started.getMonth() + 1) 
			+ '/' + book.item.date_started.getFullYear();
		
		let date_finished = book.item.date_finished.getDate() + '/' + parseInt(book.item.date_finished.getMonth() + 1)
			+ '/' + book.item.date_finished.getFullYear()
	
		return <TouchableOpacity onPress={bookPressHandler}>
			<View style={styles.list_item}>
				<Image 
					style={styles.preview}
					source={require('../assets/cover.jpg')} 
				/>
				<View style={styles.info}>
					<Text style={styles.title}>{book.item.title}</Text>
					<Text style={styles.additional}>by {book.item.author}</Text>
					<Text style={styles.additional}>Date started: {date_started}</Text>
					<Text style={styles.additional}>Date finished: {date_finished}</Text>
					<View style={styles.genre}>
						<Text style={styles.genreText}>{book.item.genre}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>;
	}

	return (
		<FlatList 
			data={readBooksCtx.books}
			renderItem={ListItem}
			keyExtractor={(book) => book.id}
		/>
	);
}

export default Read;

const styles = StyleSheet.create({
	list_item: {
		flexDirection: 'row',
		flex: 1,
		borderBottomWidth: 2,
		borderBottomColor: GlobalStyles.colors.highlight,
		marginTop: '2%',
		marginLeft: '3%',
		marginRight: '3%'
	},
	preview: {
		resizeMode: 'contain',
		width: 80,
		height: 120,
		marginBottom: '1%',
	},
	title: {
		fontSize: 24,
		marginTop: '3%',
	},
	additional: {
		marginTop: '2%',
		color: GlobalStyles.colors.accent1,
	},
	info: {
		marginLeft: '3%'
	},
	genreText: {
		color: 'white',
		textAlign: 'center',
	},
	genre: {
		backgroundColor: GlobalStyles.colors.accent1,
		paddingTop: 2,
		paddingBottom: 3,
		paddingLeft: 5,
		paddingRight: 5,
		alignSelf: 'flex-start',
		borderRadius: 3
	}
});