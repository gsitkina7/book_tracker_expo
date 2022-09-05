import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { CurrentBooksContext } from '../store/current-books-context';
import { useContext, useEffect, useState } from 'react';
import { getCurrentBook } from '../utils/http';

function CurrentlyReading() {

	const navigation = useNavigation();

	const currentBooksCtx = useContext(CurrentBooksContext);
	
	function CurrentBook(book) {

		function updateBook() {
			navigation.navigate('UpdateBook', {
				currentBookId: book.item.id,
			});
		}
	
		return (
		<View style={styles.currentContainer}>
			<Image 
				style={styles.preview}
				source={require('../assets/cover.jpg')} 
			/>
			<View>
				<Text style={styles.title}>{book.item.title}</Text>
				<Text style={styles.author}>by {book.item.author}</Text>
				
				<View style={{flexDirection: 'row'}}>
					<Text style={{fontWeight: 'bold', marginTop: '3%'}}>PROGRESS: </Text>
					<Text style={styles.progressText}>{book.item.progress}/{book.item.pages} Pages</Text>
				</View>
				<TouchableOpacity style={styles.updateButton} onPress={updateBook}>
					<Text style={styles.buttonText}>UPDATE</Text>
				</TouchableOpacity>
			</View>
		</View>);
	}
	
	return <FlatList 
		data={currentBooksCtx.books}
		renderItem={CurrentBook}
		keyExtractor={(book) => book.id}
	/>;
}

export default CurrentlyReading;

const styles = StyleSheet.create({
	preview: {
		resizeMode: 'contain',
		width: 100,
		height: 150,
		margin: '3%',
	},
	currentContainer: {
		backgroundColor: GlobalStyles.colors.highlight,
		flex: 1,
		flexDirection: 'row',
		marginLeft: '3%',
		marginRight: '3%',
		borderRadius: 10, 
		marginBottom: '3%',
		shadowColor: GlobalStyles.colors.accent1,
		shadowRadius: 4,
		shadowOffset: {width: 5, height: 5},
		shadowOpacity: 0.4

	},
	title: {
		fontSize: 24,
		marginTop: '10%',
	},
	author: {
		color: GlobalStyles.colors.accent1,
	},
	updateButton: {
		backgroundColor: GlobalStyles.colors.accent2,
		padding: '7%',
		marginTop: '5%',
		borderRadius: 15,
		shadowColor: GlobalStyles.colors.dark,
		shadowRadius: 4,
		shadowOffset: {width: 3, height: 3},
		shadowOpacity: 0.4
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	progressText: {
		marginTop: '3%'
	}
});