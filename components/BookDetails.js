import { View, StyleSheet, Image, Text, ScrollView} from "react-native";
import { GlobalStyles } from "../constants/styles";

function BookDetails({book}) {

	if (book.start_date){ 
		var dates = true;
	}
	if (dates){
		let start_date = book.date_started.getDate() + '/' + parseInt(book.date_started.getMonth() + 1)
			+ '/' + book.date_started.getFullYear();
		let end_date = book.date_finished.getDate() + '/' + parseInt(book.date_finished.getMonth() + 1)
		+ '/' + book.date_finished.getFullYear()
	}

	function DateBox() {
		return (
			<View>
				<Text style={styles.infoText}>Date started: {start_date}</Text>
				<Text style={styles.infoText}>Date finished: {end_date}</Text>
			</View>);
	}

	return (
		<ScrollView>
			<View style={styles.row}>
				<Image 
					style={styles.preview}
					source={require('../assets/cover.jpg')} 
				/>
				<View style={styles.info}>
					<Text style={styles.title}>{book.title}</Text>
					<Text style={styles.author}>by {book.author}</Text>
					<Text style={styles.genre}>{book.genre}</Text>
				</View>	
			</View>
			<View style={styles.row}>
				<Text style={styles.description}>{book.description}</Text>
			</View>
			<View style={styles.infoBox}>
				<Text style={{fontSize: 20, fontWeight: 'bold', marginHorizontal: '2%'}}>Reading Log</Text>
				{dates==true && <DateBox />}
				<Text style={styles.infoText}>Pages read: {book.pages}</Text>
			</View>
		</ScrollView>
	);
}

export default BookDetails;

const styles = StyleSheet.create({
	preview: {
		resizeMode: 'contain',
		width: 100,
		height: 150,
		margin: '3%',
	},
	row: { 
		flexDirection: 'row',
		borderBottomColor: GlobalStyles.colors.accent1,
		borderBottomWidth: 1,
		marginHorizontal: '3%'
	},
	info: {
		marginTop: '5%',
	},
	title: {
		fontSize: 26,
		marginTop: '5%'
	},
	author: {
		color: GlobalStyles.colors.accent1,
		fontSize: 18,
	},
	description: {
		marginVertical: '5%',
		marginHorizontal: '2%',
		fontSize: 16
	},
	genre: {
		backgroundColor: GlobalStyles.colors.accent1,
		paddingTop: 2,
		paddingBottom: 3,
		paddingLeft: 5,
		paddingRight: 5,
		alignSelf: 'flex-start',
		borderRadius: 3,
		color: 'white',
		marginTop: '5%'
	},
	infoBox: {
		marginHorizontal: '3%',
	},
	infoText: {
		fontSize: 16,
		marginHorizontal: '2%',
		marginVertical: '2%'
	}

})