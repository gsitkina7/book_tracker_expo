import { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { ReadBooksContext } from '../store/read-books-context';

function sumPages(bookList){
	let total_pages = 0;
	for (let i = 0; i < bookList.length; i++){
		total_pages += bookList[i].pages;
	}
	return total_pages;
}

function averageLength(bookList){
	return sumPages(bookList)/bookList.length;
}

function readLength(book){
	let date1 = book.date_started
	let date2 = book.date_finished
	let diffTime = Math.abs(date2 - date1);
	let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
	return diffDays
}

function averageReadLength(bookList){
	let lengths = []
	for (let i=0; i < bookList.length; i++){
		lengths.push(readLength(bookList[i]));
	}
	let sum_days = 0
	for (let i=0; i < lengths.length; i++){
		sum_days += lengths[i];
	}
	return sum_days/lengths.length;
}

function Statistics() {
	const readBooksCtx = useContext(ReadBooksContext);

	const pages_total = sumPages(readBooksCtx.books)
	const average_length = parseInt(averageLength(readBooksCtx.books));
	const average_days = averageReadLength(readBooksCtx.books).toFixed(1);

	return <ScrollView>
		<View style={styles.grid}>
			<View style={styles.row}>
				<View style={styles.box}>
					<Text style={styles.statistic}>{readBooksCtx.books.length}</Text>
					<Text style={styles.desc}>Books Finished</Text>
				</View>
				<View style={styles.box}>
					<Text style={styles.statistic}>{pages_total}</Text>
					<Text style={styles.desc}>Pages Finished</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.box}>
					<Text style={styles.statistic}>{average_length}</Text>
					<Text style={styles.desc}>Average Length</Text>
				</View>
				<View style={styles.box}>
					<Text style={styles.statistic}>{average_days}</Text>
					<Text style={styles.desc}>Days To Finish</Text>
				</View>
			</View>
		</View>
	</ScrollView>;
}

export default Statistics;

const styles = StyleSheet.create({
	grid: {
		flex: 1,
		margin: '2%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: '5%'
	},
	box: {
		backgroundColor: GlobalStyles.colors.light,
		marginHorizontal: '2%',
		padding: '5%',
		paddingVertical: '10%',
		width: '40%',
		borderRadius: 15,
		shadowColor: GlobalStyles.colors.accent1,
		shadowRadius: 2,
		shadowOffset: {width: 2, height: 2},
		shadowOpacity: 0.4
		
	},
	statistic: {
		fontSize: 36,
		textAlign: 'center',
	},
	desc: {
		fontSize: 16,
		textAlign: 'center'
	}
});