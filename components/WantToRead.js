import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { WantBooksContext } from '../store/want-books-context';

function WantToRead() {

	const navigation = useNavigation();

	const wantBooksCtx = useContext(WantBooksContext);

	function ListItem(book) {

		function bookPressHandler() {
			navigation.navigate("BookInfo", {
				bookInfoTitle: book.item.title,
				bookInfoId: book.item.id,
			});
		};
	
		let date = book.item.date_added.getDate() + '/' + parseInt(book.item.date_added.getMonth() + 1)
			+ '/' + book.item.date_added.getFullYear();
	
		return <TouchableOpacity onPress={bookPressHandler}>
			<View style={styles.list_item}>
				<Image 
					style={styles.preview}
					source={require('../assets/cover.jpg')} 
				/>
				<View style={styles.info}>
					<Text style={styles.title}>{book.item.title}</Text>
					<Text style={styles.additional}>by {book.item.author}</Text>
					<Text style={styles.additional}>Date added: {date}</Text>
				</View>
			</View>
		</TouchableOpacity>;
	}
	
	return (
		<FlatList 
			data={wantBooksCtx.books}
			renderItem={ListItem}
			keyExtractor={(book) => book.id}
		/>
	);
}

export default WantToRead;

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
		marginTop: '10%',
	},
	additional: {
		marginTop: '2%',
		color: GlobalStyles.colors.accent1,
	},
	info: {
		marginLeft: '3%'
	}
});